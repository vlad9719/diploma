<?php

namespace App\Services;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

/**
 * Class CategoryService
 * @package App\Services
 */
class CategoryService
{
    /**
     * @param string $category
     * @return \Illuminate\Support\Collection
     */
    public function getCategoriesByBrand(string $categoryBrand)
    {
        $brand = Brand::where('name', '=', $categoryBrand)->first();
        if (!isset($brand)) {
            throw new ModelNotFoundException;
        }

        $categories = $brand->categories;

        return $categories;
    }
}
