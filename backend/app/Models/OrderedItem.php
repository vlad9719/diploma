<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class OrderedItem
 * @package App\Models
 */
class OrderedItem extends Model
{
    /**
     * @var array
     */
    protected $fields = [
        'product_id', 'quantity'
    ];

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function orders()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function products()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
