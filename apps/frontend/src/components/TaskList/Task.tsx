import type { TTask } from "@/types";
import Loader from "@/components/Loader";
import { Check, ChevronRight, X } from "lucide-react";
import { FocusEventHandler, KeyboardEventHandler, MouseEventHandler, Suspense, useState } from "react";
import { Button } from "../ui/button";
import { useTheme } from "../ThemeProvider";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Description from "./Description";

type TTaskProps = {
  task: TTask;
  onChange: (task: TTask) => void;
}

const Task = ({ task, onChange }: TTaskProps) => {
  const { theme } = useTheme()
  const [edit, setEdit] = useState(false)
  const [status, setStatus] = useState(task.status)
  const [curr, setCurr] = useState(task.title)

  const handleEnterKey: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") setEdit(false)
  }
  const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
    setEdit(false)
  }
  const handleCompleted: MouseEventHandler<HTMLButtonElement> = () => {
    setStatus(!status)
    onChange({ ...task, status: !status })
  }
  const handleEdit: MouseEventHandler<HTMLDivElement> = () => {
    setEdit(true)
  }

  return (
    <Suspense fallback={<Loader />}>
      <div className="flex group hover:gap-1">
        <div
          className={"flex flex-grow items-center border rounded-md" +
            (status ? theme === "dark" ?
              " border-green-900" : " border-green-500" : "")
          }
          onClick={handleEdit}
        >{edit
          ? (
            <Input
              className="border-0"
              type="text"
              value={curr}
              autoFocus
              onChange={(e) => setCurr(e.currentTarget.value)}
              onKeyUp={handleEnterKey}
              onBlur={handleBlur}
            />
          ) : (
            <p className="text-sm pl-3">
              {curr.slice(0, 30) + (curr.length >= 30 ? "..." : "")}
            </p>
          )}
        </div>
        <div className="flex items-center w-0 flex-end gap-1 group-hover:w-20 transition-all">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCompleted}
          >
            {!status ? <Check /> : <X />}
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                <ChevronRight />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <Description />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Suspense >
  )
}

export default Task
