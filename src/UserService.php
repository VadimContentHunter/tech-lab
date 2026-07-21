<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;

final class UserService
{
    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    /**
     * Конструктор класса UserService.
     *
     * @param UserRepository $userRepository Репозиторий для работы с пользователями.
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Создаёт нового пользователя.
     *
     * @param string $username Имя пользователя.
     * @param string $email Электронная почта пользователя.
     * @param string $password Пароль пользователя.
     *
     * @return User Возвращает объект пользователя.
     */
    public function createUser(string $username, string $email, string $password): User
    {
        $user = new User();
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setPassword($password);

        return $this->userRepository->save($user);
    }

    /**
     * Получает пользователя по его идентификатору.
     *
     * @param int $id Идентификатор пользователя.
     *
     * @return User|null Возвращает объект пользователя или null, если пользователь не найден.
     */
    public function getUserById(int $id): ?User
    {
        return $this->userRepository->findById($id);
    }

    /**
     * Обновляет информацию о пользователе.
     *
     * @param int $id Идентификатор пользователя.
     * @param string $username Новое имя пользователя.
     * @param string $email Новая электронная почта пользователя.
     *
     * @return User|null Возвращает обновлённый объект пользователя или null, если пользователь не найден.
     */
    public function updateUser(int $id, string $username, string $email): ?User
    {
        $user = $this->userRepository->findById($id);
        if (!$user) {
            return null;
        }

        $user->setUsername($username);
        $user->setEmail($email);

        return $this->userRepository->save($user);
    }

    /**
     * Удаляет пользователя по его идентификатору.
     *
     * @param int $id Идентификатор пользователя.
     *
     * @return bool Возвращает true, если пользователь был успешно удалён, иначе false.
     */
    public function deleteUser(int $id): bool
    {
        $user = $this->userRepository->findById($id);
        if (!$user) {
            return false;
        }

        return $this->userRepository->delete($user);
    }

    /**
     * Получает список всех пользователей.
     *
     * @return array<int, User> Возвращает массив пользователей.
     */
    public function getAllUsers(): array
    {
        return $this->userRepository->findAll();
    }
}