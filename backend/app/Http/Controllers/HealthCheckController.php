<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;


/**
 * Class HealthCheckController
 * @package App\Http\Controllers
 */
class HealthCheckController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function healthCheck() : JsonResponse
    {
        return new JsonResponse([
            'message' => 'OK',
        ], JsonResponse::HTTP_OK);
    }
}
