import { createContext, type ReactNode } from "react";
import type { Task } from "../entities/Task";
import { useEffect, useState } from "react"
import { taskService } from "../services/api"

export interface TasksContextData {
    tasks: Task[],
    createTask: (attributes: Omit<Task, "id">) => Promise<void>
    updateTask: (id:number, attributes: Partial<Omit<Task, "id">>) => Promise<void>
    deleteTask: (id:number) => Promise<void>
}

export const TasksContext = createContext({} as TasksContextData)


interface TasksContextProviderProps {
    children: ReactNode
}

export const TasksContextProvider: React.FC<TasksContextProviderProps> = ({children}) => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        taskService.fetchTasks().then((data) => {
            setTasks(data)
        })
    }, [])

    
    const createTask = async (attributes: Omit<Task, "id">) => {
        const newTask = await taskService.createTask(attributes)
        setTasks((currentState) => [...currentState, newTask])
    }

    const updateTask = async(id:number, attributes: Partial<Omit<Task, "id">>) => {
        const updatedTask = await taskService.updateTask(id, attributes)
        setTasks((currentState) =>
            currentState.map((task) =>
                String(task.id) === String(id) ? updatedTask : task
            )
        )
    }

    const deleteTask = async (id:number) => {
        await taskService.deleteTask(id)
        setTasks((currentState) => currentState.filter((task) => String(task.id) !== String(id)))
    }

    return (
        <TasksContext.Provider value={{tasks, createTask, updateTask, deleteTask}}>
            {children}
        </TasksContext.Provider>
    )
}