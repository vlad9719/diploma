<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchRequest;
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

        $this->response->data['products'] = $products;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }

    /**
     * @param SearchRequest $request
     * @param ProductService $productService
     * @return JsonResponse
     */
    public function search(SearchRequest $request, ProductService $productService) : JsonResponse
    {
        $searchParameter = $request->validated();
        $name = $searchParameter['name'];
        $products = $productService->search($name);

        $this->response->data['products'] = $products;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }

    /**
     * @param Request $request
     * @param ProductService $productService
     * @return JsonResponse
     */
    public function getAllProductsNumberByCategory(Request $request, ProductService $productService) : JsonResponse
    {
        $productsCategory = $request->input('category');
        $count = $productService->getAllProductsNumberByCategory($productsCategory);

        $this->response->data['count'] = $count;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }
}
