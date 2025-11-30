import { Grid, Flex, Badge, ScrollArea } from "@radix-ui/themes"
import type { Task } from "../entities/Task"
import { TaskCard } from "./TaskCard"
import { useTask } from "../hooks/useTask"


export const TaskBoard: React.FC = () => {

    const {tasks} = useTask()

    const tasksTodo: Task[] = tasks?.filter(task => task.status === "todo") ?? []
    const tasksInProgress: Task[] =  tasks?.filter(task => task.status === "doing") ?? []
    const tasksDone: Task[] =  tasks?.filter(task => task.status === "done") ?? []

    return (
        <ScrollArea scrollbars="horizontal">
            <Grid columns={"3"} gap={"4"} minWidth={"64rem"}>
                <Flex direction="column" gap="4">
                    <Badge size={"3"} color="gray">
                        Para fazer ({tasksTodo.length})
                    </Badge>

                    {tasksTodo.map((task) => <TaskCard key={task.id} task={task}/>)}
                </Flex>

                <Flex direction="column" gap="4">
                    <Badge size={"3"} color="yellow">
                        Em progresso ({tasksInProgress.length})
                    </Badge>
                    {tasksInProgress.map((task) => <TaskCard key={task.id} task={task}/>)}
                </Flex>

                <Flex direction="column" gap="4">
                    <Badge size={"3"} color="green">
                        Concluidas ({tasksDone.length})
                    </Badge>
                    {tasksDone.map((task) => <TaskCard key={task.id} task={task}/>)}
                </Flex>
            </Grid>
        </ScrollArea>
    )
}