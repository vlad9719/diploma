<?php

namespace App\Http\Controllers;

use App\Services\BrandService;
use Illuminate\Http\JsonResponse;

/**
 * Class BrandController
 * @package App\Http\Controllers
 */
class BrandController extends Controller
{
    /**
     * @param BrandService $categoryService
     * @return JsonResponse
     */
    public function getAllBrands(BrandService $categoryService) : JsonResponse
    {
        $allCategories = $categoryService->getAllBrands();

        $this->response->data = $allCategories;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }
}
