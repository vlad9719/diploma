<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use App\Models\User;
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
    public function saveOrder(OrderService $orderService, OrderRequest $orderRequest): JsonResponse
    {
        $orderRequest->validateResolved();
        $order = $orderService->saveOrder($orderRequest->items);
        $this->response->data['order'] = $order;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function getOrderById(OrderService $orderService, int $id)
    {
        $user = auth()->user();
        $order = Order::findOrFail($id);

        if ($user->cant('view', $order)) {
            $this->response->error = 'You cannot read order of another user';
            return new JsonResponse($this->response, JsonResponse::HTTP_FORBIDDEN);
        }

        $this->response->data['order'] = $orderService->getOrderById($id);
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }

    /**
     * @param OrderService $orderService
     * @return JsonResponse
     */
    public function getAllOrdersByUserId(OrderService $orderService, int $id)
    {
        $user = User::findOrFail($id);
        if ($user->cant('view', $user)) {
            $this->response->error = 'You cannot read orders of another user';
            return new JsonResponse($this->response, JsonResponse::HTTP_FORBIDDEN);
        }

        $orders = $orderService->getAllOrdersByUserId($id);

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

    /**
     * @param OrderService $orderService
     * @param int $id
     * @return JsonResponse
     */
    public function deleteOrder(OrderService $orderService, int $id) : JsonResponse
    {
        $user = auth()->user();
        $order = Order::findOrFail($id);
        if ($user->cant('delete', $order)) {
            $this->response->error['order'] = 'You cannot delete an order made by another user';
            return new JsonResponse($this->response, JsonResponse::HTTP_FORBIDDEN);
        }

        $orderService->deleteOrder($id);

        $this->response->data['Message'] = 'Order has been successfully deleted';
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }
}
