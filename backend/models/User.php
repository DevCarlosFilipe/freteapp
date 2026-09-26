<?php

class User
{
    private $id;
    private $name;
    private $username;
    private $email;
    private $phone;
    private $password;
    private $emailVerifiedAt;

    public function __construct(
        $id = null,
        $name = null,
        $username = null,
        $email = null,
        $phone = null,
        $password = null,
        $emailVerifiedAt = null
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->username = $username;
        $this->email = $email;
        $this->phone = $phone;
        $this->password = $password;
        $this->emailVerifiedAt = $emailVerifiedAt;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getPhone()
    {
        return $this->phone;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getEmailVerifiedAt()
    {
        return $this->emailVerifiedAt;
    }

    public function isEmailVerified()
    {
        return $this->emailVerifiedAt !== null;
    }
}