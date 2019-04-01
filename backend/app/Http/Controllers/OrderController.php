<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Psy\Util\Json;

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
    public function saveOrder(OrderService $orderService, OrderRequest $orderRequest): JsonResponse
    {
        $orderRequest->validateResolved();
        $order = $orderService->saveOrder($orderRequest->items);
        $this->response->data = $order;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }

    /**
     * @param OrderService $orderService
     * @return JsonResponse
     */
    public function getAllOrders(OrderService $orderService)
    {
        $orders = $orderService->getAllOrders();

        $this->response->data['orders'] = $orders;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }

    /**
     * @param OrderService $orderService
     * @param UpdateOrderRequest $updateOrderRequest
     * @return JsonResponse
     */
    public function updateOrder(OrderService $orderService, UpdateOrderRequest $updateOrderRequest): JsonResponse
    {
        $validated = $updateOrderRequest->validated();

        $user = auth()->user();
        $order = Order::findOrFail($validated['id']);

        if ($user->cant('update', $order)) {
            $this->response->error['error'] = 'You cannot update this order';
            return new JsonResponse($this->response, JsonResponse::HTTP_FORBIDDEN);
        }

        $newOrder = $orderService->updateOrder($validated);

        $this->response->data['Order'] = $newOrder;

        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }
}
