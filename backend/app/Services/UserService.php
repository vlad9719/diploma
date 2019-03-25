<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Factory\UserFactory;
/**
 * Class UserService
 * @package App\Services\Models
 */
class UserService
{
    /**
     * @var UserFactory
     */
    protected $user;
    /**
     * UserService constructor.
     * @param UserFactory $user
     */
    public function __construct(UserFactory $user)
    {
        $this->user = $user;
    }
    /**
     * @param array $fields
     * @return User
     */
    public function create(array $fields): User
    {
        $user = $this->user->makeUser();
        $user->name = $fields['name'];
        $user->password = Hash::make($fields['password'], ['rounds' => 12]);
        $user->email = $fields['email'];
        $user->organization = $fields['organization'];
        $user->phone = $fields['phone'];
        $user->save();
        return $user;
    }
}
