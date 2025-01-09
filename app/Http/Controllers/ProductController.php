<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Enums\TransactionStatus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{
    /**
     * Display a listing of products.
     * @return \Inertia\Response
     */
    public function index(): \Inertia\Response
    {
        try {
            // 出品中、予約中の商品一覧を取得
            $product = Product::where('transaction_status', TransactionStatus::PENDING)
            ->orWhere('transaction_status', TransactionStatus::BOOKING)
            ->with('seller')
            ->orderBy('created_at', 'desc')
            ->get();

            return Inertia::render('Product/Index', [
                'products' => $product,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     * @return \Inertia\Response
     */
    public function create(): \Inertia\Response
    {
        try {
            // カテゴリとコンディション情報を取得
            $categories = Product::CATEGORIES;
            $conditions = Product::CONDITIONS;

            return Inertia::render('Product/Create', [
                'categories' => $categories,
                'conditions' => $conditions,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created product in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $product = null;
        $validatedData = $request->validate([
            'title'         => 'required|string|max:255',
            'description'   => 'nullable|string|max:300',
            'category'      => 'required|string',
            'condition'     => 'required|string',
            'image_files'   => 'required|array|max:5',
            'image_files.*' => 'required|image|mimes:jpg,jpeg,png,gif,webp|max:10240',
            'latitude'      => 'nullable|numeric',
            'longitude'     => 'nullable|numeric',
            'location_name' => 'nullable|string',
        ]);

        // カテゴリとコンディションのバリデーション
        if (!in_array($validatedData['category'], Product::CATEGORIES)) {
            return back()->with('flash', ['message' => '無効なカテゴリが選択されました。', 'type' => 'error'])->withInput();
        }
    
        if (!in_array($validatedData['condition'], Product::CONDITIONS)) {
            return back()->with('flash', ['message' => '無効なコンディションが選択されました。', 'type' => 'error'])->withInput();
        }

        $imageUrls = [];
        try {
            if ($request->hasFile('image_files')) {
                foreach ($request->file('image_files') as $file) {
                    if (!in_array($file->getClientMimeType(), ['image/jpeg', 'image/png', 'image/gif', 'image/webp'])) {
                        throw new \Exception('画像アップロードエラーが発生しました。');
                    }
    
                    $filePath = $file->store('products', 's3');
                    if (!$filePath) {
                        throw new \Exception('S3への画像アップロードに失敗しました。');
                    }
    
                    $imageUrls[] = Storage::disk('s3')->url($filePath);
                }
            }
    
            DB::transaction(function () use ($validatedData, &$product, $imageUrls) {
                $product = Product::create([
                    'title'                 => $validatedData['title'],
                    'description'           => $validatedData['description'],
                    'category'              => $validatedData['category'],
                    'image_urls'            => json_encode($imageUrls),
                    'transaction_status'    => TransactionStatus::PENDING,      // 出品中
                    'condition'             => $validatedData['condition'],
                    'seller_id'             => Auth::id(),
                ]);
            });

            return redirect()->route('products.index')->with('flash', ['message' => '商品を出品しました。', 'type' => 'success']);            
        } catch (\Exception $e) {
            // S3画像の削除処理
            foreach ($imageUrls as $uploadedUrl) {
                $filePath = ltrim(parse_url($uploadedUrl, PHP_URL_PATH), '/');
                Storage::disk('s3')->delete($filePath);
            }
            return back()->with('flash', ['message' => '予期しないエラーが発生しました。再度お試しください。', 'type' => 'error'])->withInput();
        }
    }

    /**
     * Display the specified product.
     * @param \App\Models\Product $product
     * @return \Inertia\Response
     */
    public function show( Product $product ): \Inertia\Response
    {
        // 商品詳細情報を取得
        try {
            $product = Product::where('id', $product->id)
                ->with('seller')
                ->firstOrFail();
            
            // 予約中ならbuyer情報を取得
            if($product->transaction_status === TransactionStatus::BOOKING) {
                $product->load('buyer');
            }
            
            return Inertia::render('Product/Show', [
                'product' => $product,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => '商品が見つかりませんでした。'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     * @param \App\Models\Product $product
     * @return \Inertia\Response
     */
    public function edit(Product $product): \Inertia\Response
    {
        //出品情報を更新する画面を表示
        try{
            $categories = Product::CATEGORIES;
            $conditions = Product::CONDITIONS;

            return Inertia::render('Products/Edit', [
                'product'       => $product,
                'categories'    => $categories,
                'conditions'    => $conditions,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Product $product
     * @return  \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Product $product): \Illuminate\Http\RedirectResponse
    {
        //出品情報を更新
        try{
            $validatedData = $request->validate([
                'title'         => 'required|string|max:255',
                'description'   => 'nullable|string|max:300',
                'category'      => 'required|string',
                'condition'     => 'required|string',
                'image_urls'    => 'required|array',
                'latitude'      => 'nullable|numeric',
                'longitude'     => 'nullable|numeric',
                'location_name' => 'nullable|string',
            ]);

            // カテゴリとコンディションのバリデーション
            if (!in_array($validatedData['category'], Product::CATEGORIES)) {
                return back()->with('flash', ['message' => '無効なカテゴリが選択されました。', 'type' => 'error'])->withInput();
            }
        
            if (!in_array($validatedData['condition'], Product::CONDITIONS)) {
                return back()->with('flash', ['message' => '無効なコンディションが選択されました。', 'type' => 'error'])->withInput();
            }

            $imageUrls = [];
            try {
                if ($request->hasFile('image_files')) {
                    foreach ($request->file('image_files') as $file) {
                        if (!in_array($file->getClientMimeType(), ['image/jpeg', 'image/png', 'image/gif', 'image/webp'])) {
                            throw new \Exception('画像アップロードエラーが発生しました。');
                        }
        
                        $filePath = $file->store('products', 's3');
                        if (!$filePath) {
                            throw new \Exception('S3への画像アップロードに失敗しました。');
                        }
        
                        $imageUrls[] = Storage::disk('s3')->url($filePath);
                    }
                }
        
                DB::transaction(function () use ($validatedData, &$product, $imageUrls) {
                    $product->update([
                        'title'                 => $validatedData['title'],
                        'description'           => $validatedData['description'],
                        'category'              => $validatedData['category'],
                        'image_urls'            => json_encode($imageUrls),
                        'condition'             => $validatedData['condition'],
                    ]);
                });

                return redirect()->route('products.index')->with('flash', ['message' => '商品情報を更新しました。', 'type' => 'success']);
            } catch (\Exception $e) {
                // S3画像の削除処理
                foreach ($imageUrls as $uploadedUrl) {
                    $filePath = ltrim(parse_url($uploadedUrl, PHP_URL_PATH), '/');
                    Storage::disk('s3')->delete($filePath);
                }
                return back()->with('flash', ['message' => '予期しないエラーが発生しました。再度お試しください。', 'type' => 'error'])->withInput();
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function destroy( Product $product ): \Illuminate\Http\Response
    {
        try {
            $product = Product::where('id', $product->id)->firstOrFail();
            $product->delete();
            return response()->json(['message' => '商品を削除しました。'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => '商品が見つかりませんでした。'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}