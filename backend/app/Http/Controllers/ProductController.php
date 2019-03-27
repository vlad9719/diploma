<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class ProductController
 * @package App\Http\Controllers
 */
class ProductController extends Controller
{
    /**
     * @param Request $request
     * @param ProductService $productService
     * @return JsonResponse
     */
    public function getProductsByCategory(Request $request, ProductService $productService) : JsonResponse
    {
        $productsCategory = $request->input('category');
        $products = $productService->getProductsByCategory($productsCategory);

        $this->response->data = $products;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }
}
