"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords do not match!");
            return;
        }

        const newUser = {
            id: crypto.randomUUID(),
            username,
            email,
            password,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Here you would normally send the registration data to your backend API
        console.log("Registering  new user:", { username: newUser.username, email: newUser.email, createdAt: newUser.createdAt });
        alert("Registration successful! (This is a mock implementation.)");

        // Clear the form
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

    }
    //return()


}