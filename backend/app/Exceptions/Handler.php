<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use App\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param Exception $exception
     * @return JsonResponse|\Illuminate\Http\Response|\Symfony\Component\HttpFoundation\Response
     */
    public function render($request, Exception $exception)
    {
        $response = new Response();
        if ($exception instanceof ModelNotFoundException) {
            $response->error['error'] = 'Model Not Found';
            return new JsonResponse($response, JsonResponse::HTTP_BAD_REQUEST);
        } elseif ($exception instanceof ValidationException) {
            foreach ($exception->errors() as $error => $messages) {
                $response->error[$error] = $messages[0];
            }
            return new JsonResponse($response, JsonResponse::HTTP_BAD_REQUEST);
        } else  {
            if (config('app.debug')) {
                return parent::render($request, $exception);
            }
            $response->error['error'] = '500 Internal Server Error';
            return new JsonResponse($response, JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
