import { useContext } from "react"
import { TasksContext } from "../contexts/TasksContext"

export const useTask = () => {
    return useContext(TasksContext)
}