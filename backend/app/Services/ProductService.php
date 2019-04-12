<?php

namespace App\Services;


use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Class ProductService
 * @package App\Services
 */
class ProductService
{
    /**
     * @param string $productCategory
     * @return mixed
     */
    public function getProductsByCategory(string $productCategory)
    {
        $category = Category::where('name', '=', $productCategory)->first();
        if (!isset($category)) {
            throw new ModelNotFoundException;
        }

        $products = $category->products;
        foreach ($products as $product) {
            $category = $product->categories()->first();
            $product['category'] = $category->name;
            $product['brand'] = $category->brands()->first()->name;
        }
        return $products;
    }

    /**
     * @param string $name
     * @return mixed
     */
    public function search(string $name)
    {
        $searchResult = Product::where('name', 'like', '%' . $name . '%')->get();

        return $searchResult;
    }

    /**
     * @param string $productCategory
     * @return int
     */
    public function getAllProductsNumberByCategory(string $productCategory) : int
    {
        $categories = Category::where('name', 'like', '%'. $productCategory. '%')->get();
        if (!isset($categories)) {
            throw new ModelNotFoundException;
        }

        $count = 0;
        foreach($categories as $category) {
            $productsCount = $category->products()->count();
            $count += $productsCount;
        }

        return $count;
    }
}
