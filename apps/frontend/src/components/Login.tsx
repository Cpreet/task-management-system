import { Suspense, useCallback, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { api } from "@/components/AxisoInstance";

import Logo from "../assets/logo.svg"
import { TUserPostRequest } from "@/types";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (user: TUserPostRequest) => {
      return api.post('/auth/register', user)
    },
    onSuccess: () => { setIsSignUp(false) }
  })

  const loginMutation = useMutation({
    mutationFn: (creds: { username: string, password: string }) => {
      return api.post('/auth/login', creds)
    },
    onSuccess: () => { navigate("/tasks") }
  })

  const handleRegister = useCallback(async (user: TUserPostRequest) => {
    registerMutation.mutate(user)
  }, [registerMutation])

  const handleLogin = useCallback(async (creds: { username: string, password: string }) => {
    loginMutation.mutate(creds);
  }, [loginMutation])


  return (
    <Suspense fallback={<Loader />}>
      {/* loginMutation.isSuccess && <Navigate to="/tasks" />*/}
      <CardHeader>
        {loginMutation.isPending && <Loader />}
        <span className="flex justify-between">
          <span>
            {isSignUp ? (<>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>to start tasking...</CardDescription>
            </>) : (<>
              <CardTitle>Login</CardTitle>
              <CardDescription>to view your tasks...</CardDescription>
            </>)}
          </span>
          <img src={Logo} />
        </span>
      </CardHeader>
      {
        (loginMutation.isPending || registerMutation.isPending)
          ? <Loader />
          : <CardContent>
            {isSignUp
              ? <RegisterForm onRegister={handleRegister} />
              : <LoginForm onLogin={handleLogin} />}
          </CardContent>
      }
      <CardFooter className="flex gap-2 justify-center" >
        <Button
          variant={"link"}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Back to login"
            : "Click here to Sign Up!"}
        </Button>
      </CardFooter>
    </Suspense >
  )
}

const LoginForm = ({ onLogin }: { onLogin: (creds: { username: string, password: string }) => void }) => {
  const [showPass, setShowPass] = useState(false)
  const loginSchema = z.object({
    username: z.string().min(3).max(50),
    password: z.string().min(8).max(50),
  })

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const handleSubmit = (values: z.infer<typeof loginSchema>) => {
    onLogin(values)
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(handleSubmit)}>
        <FormField
          control={loginForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )} />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <span className="flex gap-2">
                  <Input type={
                    showPass
                      ? "text"
                      : "password"
                  } {...field} />
                  <Button onClick={() => setShowPass(!showPass)} variant="secondary" size="icon">{
                    showPass
                      ? < EyeOpenIcon />
                      : <EyeClosedIcon />
                  }</Button>
                </span>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="mt-6" type="submit">Login</Button>
      </form>
    </Form>
  )
}

const RegisterForm = ({ onRegister }: { onRegister: (user: TUserPostRequest) => void }) => {
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const regSchema = z.object({
    name: z.string().min(3).max(50),
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
  }).refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "passwords did not match"
  })

  const regForm = useForm<z.infer<typeof regSchema>>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const handleSubmit = (values: z.infer<typeof regSchema>) => {
    const postVals = {
      name: values['name'],
      username: values['username'],
      email: values['email'],
      password: values['password']
    }
    onRegister(postVals)
  }

  return (
    <Form {...regForm}>
      <form onSubmit={regForm.handleSubmit(handleSubmit)}>
        <FormField
          control={regForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )} />
        <FormField
          control={regForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )} />
        <FormField
          control={regForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Id</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
            </FormItem>
          )} />
        <FormField
          control={regForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <span className="flex gap-2">
                  <Input type={
                    showPass
                      ? "text"
                      : "password"
                  } {...field} />
                  <Button onClick={() => setShowPass(!showPass)} variant="secondary" size="icon">{
                    showPass
                      ? < EyeOpenIcon />
                      : <EyeClosedIcon />
                  }</Button>
                </span>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={regForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <span className="flex gap-2">
                  <Input type={
                    showConfirmPass
                      ? "text"
                      : "password"
                  } {...field} />
                  <Button onClick={() => setShowConfirmPass(!showConfirmPass)} variant="secondary" size="icon">{
                    showConfirmPass
                      ? < EyeOpenIcon />
                      : <EyeClosedIcon />
                  }</Button>
                </span>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="mt-6" type="submit">SignUp</Button>
      </form>
    </Form>
  )
}

export default Login;
