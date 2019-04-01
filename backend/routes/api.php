<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('brands', 'BrandController@getAllBrands');

Route::get('categories', 'CategoryController@getCategoriesByBrand');

Route::get('products', 'ProductController@getProductsByCategory');

Route::middleware('auth')->group(function() {

    Route::post('order', 'OrderController@saveOrder');

    Route::get('orders', 'OrderController@getAllOrders');

    Route::put('user', 'UserController@updateUser');

    Route::put('order', 'OrderController@updateOrder');
});

Route::middleware(['auth', 'admin'])->group(function () {

    Route::get('healthcheck', 'HealthCheckController@healthCheck');

});

Route::group(

    ['prefix' => 'auth'],

    function ($router) {

        Route::post('register', 'UserController@saveUser');

        Route::post('login', 'AuthController@login');

        Route::middleware('auth')->group(function () {

            Route::post('logout', 'AuthController@logout');

            Route::post('refresh', 'AuthController@refresh');

            Route::post('me', 'AuthController@me');
        });
    }
);
