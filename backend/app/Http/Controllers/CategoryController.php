<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class CategoryController
 * @package App\Http\Controllers
 */
class CategoryController extends Controller
{
    /**
     * @param Request $request
     * @param CategoryService $categoryService
     * @return JsonResponse
     */
    public function getCategoriesByBrand(Request $request, CategoryService $categoryService): JsonResponse
    {
        $brand = $request->input('brand');
        $categories = $categoryService->getCategoriesByBrand($brand);

        $this->response->data = $categories;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }
}
