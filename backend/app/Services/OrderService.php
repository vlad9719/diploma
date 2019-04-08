<?php

namespace App\Services;


use App\Models\Order;
use App\Models\OrderedItem;
use App\Models\Product;
use App\Models\User;
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
            "orderedItems" => $order->ordered_items()
                ->leftJoin('products', 'ordered_items.product_id', '=', 'products.id')
                ->select('products.*', 'ordered_items.quantity')
                ->get(),
        ];
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function getOrderById(int $id)
    {
        $orderDetails = Order::findOrFail($id);
        $orderedItems = $orderDetails
            ->ordered_items()
            ->leftJoin('products', 'ordered_items.product_id', '=', 'products.id')
            ->select('products.*', 'ordered_items.quantity')->get();

        $order = [
            'orderDetails' => $orderDetails,
            'orderedItems' => $orderedItems,
        ];
        return $order;
    }

    /**
     * @return array
     */
    public function getAllOrdersByUserId(int $id)
    {
        $orders = [];

        $ordersDetails = User::findOrFail($id)->orders()->get();
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
     * @return Order
     */
    public function updateOrder(array $fields): Order
    {
        $order = Order::findOrFail($fields['id']);

        if (isset($fields['delivery_status']) && $fields['delivery_status'] === 'Получен') {
            $order->delivery_status = $fields['delivery_status'];
        }

        if (isset($fields['payment_status']) && $fields['payment_status'] === 'Оплата произведена') {
            $order->payment_status = $fields['payment_status'];
        }

        $order->save();
        return $order;
    }

    /**
     * @param int $id
     */
    public function deleteOrder(int $id)
    {
        $order = Order::findOrFail($id);

        $order->delete();
    }
}
