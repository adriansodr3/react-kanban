import { Card, Flex, Text, Heading, Badge, Button, Dialog, Box, TextField, TextArea, RadioGroup } from "@radix-ui/themes"
import type { Task, TaskPriority, TaskStatus } from "../entities/Task"
import { useTask } from "../hooks/useTask"
import { Pencil1Icon } from "@radix-ui/react-icons"
import type { FormEventHandler } from "react"
import { z } from "zod"
import { useState } from "react"

interface TaskCardProps {
    task: Task
}

const UpdateTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["todo", "doing", "done"]),
    priority: z.enum(["low", "medium", "high"])
})

export const TaskCard: React.FC<TaskCardProps> = ({ task }) =>{

    const { updateTask, deleteTask } = useTask()
    const [isEditOpen, setIsEditOpen] = useState(false)

    const getActionText = (status:TaskStatus) => {
        const actionsText:{[key:string]: "Iniciar" | "Concluir" | "Arquivar"} = {
            "todo": "Iniciar",
            "doing": "Concluir",
            "done":  "Arquivar"
        }

        return actionsText[status]
    }

    const getActionColor = (status: TaskStatus) => {
        const actionsColor:{[key:string]: "indigo" | "green" | "bronze"} = {
            "todo": "indigo",
            "doing": "green",
            "done": "bronze"
        }
        return actionsColor[status]
    }

    const getPriorityColor = (priority:TaskPriority) => {
        const priorityColors: {[key: string]: "sky" | "amber" | "tomato"} = {
            "low": "sky",
            "medium": "amber",
            "high": "tomato"
        }
        return priorityColors[priority]
    }

    const handleActionClick = async () => {
        const nextStatus: TaskStatus = task.status === "todo" ? "doing" : "done"
        await updateTask(task.id, { status: nextStatus })
    }

    const handleDeleteClick = async () => {
        await deleteTask(task.id)
    }

    const handleEditSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)

        const title = formData.get('title')
        const description = formData.get("description")
        const status = formData.get("status")
        const priority = formData.get("priority")

        const taskData = UpdateTaskSchema.parse({ title, description, status, priority })
        await updateTask(task.id, taskData)
        setIsEditOpen(false)
    }

    return(
        <Card>
           <Flex align={"center"} gap={"4"}>
                <Heading as="h3" size={"3"}><Text weight="bold">{task.title}</Text></Heading>
                <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
           </Flex>

           <Text as="p" my={"4"}>{task.description}</Text>
           <Flex gap={"2"}>

                {task.status !== "done" && (
                    <Button color={getActionColor(task.status)} onClick={handleActionClick}>
                        {getActionText(task.status)}
                    </Button>
                )}

                <Dialog.Root open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <Dialog.Trigger>
                        <Button color="blue">
                            <Pencil1Icon /> Editar
                        </Button>
                    </Dialog.Trigger>
                    <Dialog.Content maxWidth="32rem">
                        <Dialog.Title>
                            Editar tarefa
                        </Dialog.Title>
                        <Dialog.Description size="2" mb="4">
                            Edite as informações da tarefa
                        </Dialog.Description>
                        <form onSubmit={handleEditSubmit}>
                            <Flex direction="column" gap="4">
                                <Box maxWidth="32rem">
                                    <Box mb="2">
                                        <Text as="label" htmlFor="title">Título</Text>
                                    </Box>
                                    <TextField.Root
                                        placeholder="Defina um título"
                                        name="title"
                                        id="title"
                                        defaultValue={task.title}
                                        autoFocus
                                        required
                                    />
                                </Box>
                                <Box maxWidth="32rem">
                                    <Box mb="2">
                                        <Text as="label" htmlFor="description">Descrição</Text>
                                    </Box>
                                    <TextArea
                                        placeholder="Descreva a tarefa"
                                        name="description"
                                        id="description"
                                        defaultValue={task.description}
                                        required
                                    />
                                </Box>

                                <Flex gap="8">
                                    <Box>
                                        <Text as="div" mb="2">Situação</Text>
                                        <RadioGroup.Root name="status" defaultValue={task.status}>
                                            <RadioGroup.Item value="todo">
                                                <Badge color="gray">Para fazer</Badge>
                                            </RadioGroup.Item>
                                            <RadioGroup.Item value="doing">
                                                <Badge color="yellow">Em progresso</Badge>
                                            </RadioGroup.Item>
                                            <RadioGroup.Item value="done">
                                                <Badge color="green">Concluída</Badge>
                                            </RadioGroup.Item>
                                        </RadioGroup.Root>
                                    </Box>

                                    <Box>
                                        <Text as="div" mb="2">Prioridade</Text>
                                        <RadioGroup.Root name="priority" defaultValue={task.priority}>
                                            <RadioGroup.Item value="low">
                                                <Badge color="sky">Baixa</Badge>
                                            </RadioGroup.Item>
                                            <RadioGroup.Item value="medium">
                                                <Badge color="amber">Média</Badge>
                                            </RadioGroup.Item>
                                            <RadioGroup.Item value="high">
                                                <Badge color="tomato">Alta</Badge>
                                            </RadioGroup.Item>
                                        </RadioGroup.Root>
                                    </Box>
                                </Flex>

                                <Flex gap="2" justify="end">
                                    <Dialog.Close>
                                        <Button color="gray" variant="soft">Cancelar</Button>
                                    </Dialog.Close>
                                    <Button type="submit">Salvar alterações</Button>
                                </Flex>
                            </Flex>
                        </form>
                    </Dialog.Content>
                </Dialog.Root>

                <Button color="red" onClick={handleDeleteClick}>Excluir</Button>
           </Flex>
        </Card>
    )
}