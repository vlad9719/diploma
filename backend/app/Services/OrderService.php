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
}
