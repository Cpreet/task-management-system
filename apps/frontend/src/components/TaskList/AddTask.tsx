import { useState } from "react"

import { Input } from "../ui/input"
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

import type { KeyboardEventHandler, MouseEventHandler } from "react"
import type { TTask } from "@/types";

type AddTaskProps = {
  addAction?: (task: Omit<TTask, "createdAt" | "updatedAt">) => void
}

const AddTask = ({ addAction }: AddTaskProps) => {
  const [curr, setCurr] = useState("");

  const addTask = () => {
    console.log(curr)
    if (!addAction) return
    const newTask = {
      title: curr,
      description: "",
      deadline: new Date(),
      status: false,
    }
    addAction(newTask)
  }

  const handleAdd: MouseEventHandler<HTMLButtonElement> = () => {
    if (!curr) return
    addTask()
    setCurr("")
  }

  const handleKeyAdd: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== "Enter") return;
    if (!curr) return
    addTask()
    setCurr("")
  }

  return (
    <div className="flex group hover:gap-1">
      <Input
        type="text"
        value={curr}
        onChange={(e) => setCurr(e.currentTarget.value)}
        onKeyUp={handleKeyAdd}
        placeholder="Type & press ↲ ..."
      />
      <Button
        className="w-0 group-hover:w-9 transition-all"
        variant="ghost" size="icon" onClick={handleAdd}
      ><Plus /></Button>
    </div>
  )
}

export default AddTask
