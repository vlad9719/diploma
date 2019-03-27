<?php

namespace App\Services;

use App\Models\Brand;

/**
 * Class BrandService
 * @package App\Services
 */
class BrandService
{
    /**
     * @return Brand[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getAllBrands()
    {
        $allBrands = Brand::all();

        return $allBrands;
    }
}
