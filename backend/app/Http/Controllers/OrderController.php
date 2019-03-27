<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class OrderController
 * @package App\Http\Controllers
 */
class OrderController extends Controller
{
    /**
     * @param OrderService $orderService
     * @param OrderRequest $orderRequest
     * @return JsonResponse
     * @throws \Exception
     */
    public function saveOrder(OrderService $orderService, OrderRequest $orderRequest) : JsonResponse
    {
        $validated = $orderRequest->validated();
        $order = $orderService->saveOrder($orderRequest->items);
        $this->response->data = $order;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }
}
