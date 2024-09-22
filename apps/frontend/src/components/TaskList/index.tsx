import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useMutation, useQuery } from "@tanstack/react-query";

import Loader from "@/components/Loader";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Error from "@/components/Error";

import Task from "./Task";
import AddTask from "./AddTask";
import Logo from "../Logo";

import { TTaskPutRequest, TTaskPutResponse, type TTask, type TTaskGetListResponse, type TTaskPostRequest, type TTaskPostResponse } from "@/types";
import { api } from "../AxisoInstance";
import { ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { ExitIcon } from "@radix-ui/react-icons";

const TaskList = () => {
  const [tasks, setTasks] = useState<TTask[]>([])
  const navigate = useNavigate()

  const taskQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: () => api.get<TTaskGetListResponse>("/tasks/all").then(resp => resp.data),
  })

  useEffect(() => {
    if (taskQuery.data)
      setTasks([...taskQuery.data.taskList])
  }, [taskQuery.data])

  const taskAdd = useMutation({
    mutationFn: (data: TTaskPostRequest) => api.post("/tasks", { ...data }).then(resp => resp.data),
    onSuccess: (data) => setTasks([{ ...tasks[0], _id: data.taskId }, ...tasks.slice(1)])
  })

  const taskUpdate = useMutation({
    mutationFn: (data: TTaskPutRequest) => api.put<TTaskPutResponse>("/tasks", { ...data })
  })

  const userLogout = useMutation({
    mutationFn: () => api.post<{ message: "success" | "failure" }>("/auth/logout", {}).then(resp => resp.data),
    onSuccess: (data) => data.message === "success" ? navigate("/") : () => { }
  })

  const handleAdd = (task: TTaskPostRequest) => {
    taskAdd.mutate(task);
    setTasks([{ ...task, createdAt: new Date(), updatedAt: new Date() }, ...tasks])
  }

  const handleTaskChange = (task: TTask) => {
    taskUpdate.mutate(task)
  }

  const handleLogout = () => {
    userLogout.mutate()
  }

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Suspense fallback={<Loader />}>
        <CardHeader className="min-w-96">
          <span className="flex justify-between">
            <span>
              <CardTitle>Task List</CardTitle>
              <CardDescription>{
                taskQuery.isLoading && "Loading..." ||
                "Current Tasks"
              }</CardDescription>
            </span>
            <Logo />
          </span>
        </CardHeader>
        <div>
          {/*<Filter />*/}
          <CardContent>
            <AddTask addAction={handleAdd} />
          </CardContent>
          <CardContent>
            <div className="flex flex-col max-h-96 min-h-52 min-w-80
          gap-2 overflow-y-scroll
          no-scrollbar">
              {
                !taskQuery.isLoading && tasks.length === 0 && (
                  <div className="flex flex-col items-center gap-4 h-full flex-grow justify-center">
                    <ThumbsUp size={64} />
                    No Tasks !
                  </div>
                )
              }
              {
                tasks
                && tasks.length > 0
                && tasks.map(
                  task =>
                    <Task
                      key={`task-${task.createdAt}-${task.title}`}
                      task={task}
                      onChange={handleTaskChange}
                    />
                )
              }
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant={"ghost"} size="icon" onClick={handleLogout}><ExitIcon /></Button>
          </CardFooter>
          {/*<CardFooter className='flex justify-between'>
          <Button variant={"ghost"} size="lg"><PieChart /></Button>
          <Button variant={"ghost"} size="lg"><LucideListTodo /></Button>
          <Button variant={"ghost"} size="lg"><FilterIcon /></Button>
        </CardFooter>*/}
        </div>
      </Suspense>
    </ErrorBoundary >
  )
}

export default TaskList;
