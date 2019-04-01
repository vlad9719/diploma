<?php

namespace App\Services;


use App\Models\Order;
use App\Models\OrderedItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Exception;

/**
 * Class OrderService
 * @package App\Services
 */
class OrderService
{

    /**
     * @param array $items
     * @return array
     * @throws Exception
     */
    public function saveOrder(array $items)
    {
        DB::beginTransaction();
        try {
            $order = new Order();

            $order['created_at'] = Carbon::now();

            $user = auth()->user();
            $order->users()->associate($user);

            $order->save();

            foreach ($items as $item) {
                $orderedItem = new OrderedItem();

                $product = Product::find($item['id']);
                $orderedItem->products()->associate($product);

                $orderedItem['quantity'] = $item['quantity'];

                $orderedItem->orders()->associate($order);

                $orderedItem->save();
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            throw $e;
        }

        return [
            "orderDetails" => $order->fresh(),
            "orderedItems" => $order->ordered_items()->get(),
        ];
    }

    /**
     * @return array
     */
    public function getAllOrders()
    {
        $user = auth()->user();
        $orders = [];
        $ordersDetails = $user->orders()->get();
        foreach ($ordersDetails as $orderDetails) {
            $order = [
                'orderDetails' => $orderDetails,
                'orderedItems' => $orderDetails->ordered_items()->get(),
            ];
            array_push($orders, $order);
        }

        return $orders;
    }

    /**
     * @param array $fields
     * @return Order
     */
    public function updateOrder(array $fields): Order
    {
        $order = Order::findOrFail($fields['id']);

        if (auth()->user()->isAdmin) {
            foreach ($fields as $field => $value) {
                if ($field === 'delivery_status' && $value === 'Получен') {
                    continue;
                }

                $order[$field] = $value;
            }

            $order->save();
            return $order;
        }

        if (isset($fields['delivery_status']) && $fields['delivery_status'] === 'Получен') {
            $order->delivery_status = $fields['delivery_status'];
            $order->save();
            return $order;
        }

        return $order;

    }
}
