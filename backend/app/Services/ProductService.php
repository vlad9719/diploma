<?php

namespace App\Services;


use App\Models\Category;
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
        return $products;
    }
}
