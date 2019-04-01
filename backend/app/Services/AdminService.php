<?php


namespace App\Services;

use App\Models\Order;

/**
 * Class AdminService
 * @package App\Services
 */
class AdminService
{
    /**
     * @return array
     */
    public function getAllOrders() : array
    {
        $orders = [];

        $ordersDetails = Order::all();
        foreach ($ordersDetails as $orderDetails) {
            $order = [
                'orderDetails' => $orderDetails,
                'orderedItems' => $orderDetails
                    ->ordered_items()
                    ->leftJoin('products', 'ordered_items.product_id', '=', 'products.id')
                    ->select('products.*', 'ordered_items.quantity')->get(),
            ];
            array_push($orders, $order);
        }
        return $orders;
    }

    /**
     * @param array $fields
     * @return mixed
     */
    public function updateOrder(array $fields)
    {
        $order = Order::findOrFail($fields['id']);

        foreach ($fields as $field => $value) {
            if ($field === 'delivery_status' && $value === 'Получен') {
                continue;
            }

            $order[$field] = $value;
        }

        $order->save();
        return $order;
    }
}