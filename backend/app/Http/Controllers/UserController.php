<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserRequest;
use Illuminate\Http\JsonResponse;
use App\Services\UserService;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * @param UserRequest $request
     * @param UserService $userService
     * @return JsonResponse
     */
    public function saveUser(UserRequest $request, UserService $userService) : JsonResponse
    {
        $validated = $request->validated();
        $newUser = $userService->create($validated);
        $this->response->data['User'] = $newUser;
        return new JsonResponse($this->response, JsonResponse::HTTP_CREATED);
    }

    public function updateUser(UpdateUserRequest $request, UserService $userService) : JsonResponse
    {
        $validated = $request->validated();
        $updatedUser = $userService->update($validated);
        $this->response->data['User'] = $updatedUser;
        return new JsonResponse($this->response, JsonResponse::HTTP_CREATED);
    }
}
