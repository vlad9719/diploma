<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;

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
        $orderRequest->validateResolved();
        $order = $orderService->saveOrder($orderRequest->items);
        $this->response->data = $order;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }

    public function getAllOrders(OrderService $orderService)
    {
        $orders = $orderService->getAllOrders();

        $this->response->data['orders'] = $orders;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }
}
