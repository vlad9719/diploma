<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Class UpdateOrderRequest
 * @package App\Http\Requests
 */
class UpdateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => 'bail|required|exists:orders',
            'payment_status' => ['bail',
                Rule::in(['Оплачен', 'Не оплачен'])],
            'delivery_status' => ['bail',
                Rule::in(['Обрабатывается', 'Собран', 'Отправлен', 'Получен'])],
            'price' => 'bail|numeric',
        ];
    }
}
