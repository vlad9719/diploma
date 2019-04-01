<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = auth()->user();
        if ($user->isAdmin) {
            return $next($request);
        }

        return new JsonResponse([
            'Message' => 'You are forbidden to access this resource'
        ], JsonResponse::HTTP_FORBIDDEN);
    }
}
