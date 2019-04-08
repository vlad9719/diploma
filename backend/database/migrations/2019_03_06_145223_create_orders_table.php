<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->float('price')->nullable();
            $table->enum('delivery_status', ['Обрабатывается', 'Собран', 'Отправлен', 'Получен'])->default('Обрабатывается');
            $table->enum('payment_status', ['Не оплачен', 'Оплата произведена', 'Оплата подтверждена'])->default('Не оплачен');
            $table->date('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('orders');
    }
}
