<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateOrderRequest;
use App\Services\AdminService;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class AdminController
 * @package App\Http\Controllers
 */
class AdminController extends Controller
{
    /**
     * @param OrderService $orderService
     * @param int $id
     * @return JsonResponse
     */
    public function getOrdersById(OrderService $orderService, int $id): JsonResponse
    {
        $orders = $orderService->getAllOrdersByUserId($id);

        $this->response->data['orders'] = $orders;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }

    /**
     * @param AdminService $adminService
     * @return JsonResponse
     */
    public function getAllOrders(AdminService $adminService): JsonResponse
    {
        $orders = $adminService->getAllOrders();

        $this->response->data['orders'] = $orders;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }

    /**
     * @param AdminService $adminService
     * @return JsonResponse
     */
    public function getAllUsers(AdminService $adminService) : JsonResponse
    {
        $users = $adminService->getAllUsers();

        $this->response->data['users'] = $users;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }

    /**
     * @param AdminService $adminService
     * @param UpdateOrderRequest $updateOrderRequest
     * @return JsonResponse
     */
    public function updateOrder(AdminService $adminService, UpdateOrderRequest $updateOrderRequest)
    {
        $validated = $updateOrderRequest->validated();
        $updatedOrder = $adminService->updateOrder($validated);

        $this->response->data['order'] = $updatedOrder;
        return new JsonResponse($this->response, JsonResponse::HTTP_OK);
    }
}
