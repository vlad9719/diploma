<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'name' => 'bail|regex:/^[a-zA-Z0-9]+$/|max:64',
            'password' => 'bail|regex:/^[a-zA-Z0-9]+$/|min:8',
            'email' => 'bail|max:124|email|unique:users,email,' . auth()->user()->id . '',
            'organization' => 'bail|max:256',
            'phone' => 'bail|regex:/[0-9]{9}/',
        ];
    }

    /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'required' => 'Поле обязательно для заполнения!',
            'password.min' => 'Пароль должен иметь хотя бы 8 символов',
            'email.max' => 'Поле должно иметь менее 124 символов.',
            'regex' => 'Поле заполнено некорректно.',
            'email.unique' => 'Пользователь с таким :attribute уже зарегистрирован',
            'email' => 'Неверный email-адрес',
        ];
    }
}
