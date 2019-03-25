<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            $this->response->error['error'] = "Unauthorized";
            return new JsonResponse($this->response, JsonResponse::HTTP_UNAUTHORIZED);
        }

        $this->response->data = ['Token' => $token, 'Message' => 'Authorized'];

        return new JsonResponse($this->response);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $this->response->data = ['User' => auth()->user()];

        return new JsonResponse($this->response);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        $this->response->data = ['Message' => 'Successfully logged out'];

        return new JsonResponse($this->response);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
