import { Task } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { formatDate } from "date-fns";
import { Badge } from "../ui/badge";
import { Flag, Calendar, Calendar1} from 'lucide-react';
import { DeleteButton } from "./tasks/delete-button";
import { EditDialog } from "./tasks/edit-dialog";

interface ContentProps {
    tasks: Task;
}

export function DataDialog({ tasks } : ContentProps) {
    const getDate = (date: string) => {
        return formatDate(date, 'yyyy, MMMM dd');
    };

    const getStatus = (value: string) => {
        const labelMap: Record<string, { label: string; bg: string}> = {
            'to_do': { label: 'To Do', bg: 'bg-blue-500'},
            'in_progress': { label: 'In Progress', bg: 'bg-yellow-500'},
            'in_review': { label: 'In Review', bg: 'bg-purple-500'},
            'done': { label: 'Done', bg: 'bg-green-500'},
            'closed': { label: 'Closed', bg: 'bg-gray-500'},
        }

        return labelMap[value] || { label: 'To Do', bg: 'bg-blue-500'};
    };

    const getPriority = (value: string) => {
        const statusMap: Record<string, { label: string; color: string; bg: string}> = {
            'low': { label: 'Low', color: 'text-neutral-500', bg: 'bg-neutral-200'},
            'normal': { label: 'Normal', color: 'text-blue-500', bg: 'bg-blue-200'},
            'high': { label: 'High', color: 'text-orange-500', bg: 'bg-orange-200'},
            'urgent': { label: 'Urgent', color: 'text-red-500', bg: 'bg-red-200'},
        }

        return statusMap[value] || { label: 'Low', color: 'bg-neutral-500', bg: 'bg-neutral-200'};
    }

    const status = getStatus(tasks.status);
    const priority = getPriority(tasks.priority);

    return (
        <Dialog>
            <DialogTrigger
                className="cursor-pointer bg-gray-50 rounded-md hover:bg-blue-400/16 transition-all duration-250 hover:scale-105 group"
            >
                <div className="flex flex-col items-start p-4 gap-2">
                    <p className="font-light text-gray-600 group-hover:text-neutral-700 group-hover:font-normal transition-all duration-250">
                        {tasks.title}
                    </p>
                    <span className="flex items-center gap-2">
                        <Flag
                            className={`${priority.color} size-4`}
                        />
                        <p className={`text-sm ${priority.color}`}>
                            {priority.label}
                        </p>
                    </span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-normal">
                        {tasks.title}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground break-all">
                        {tasks.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="border-t flex justify-between">
                    {/* Data */}
                    <div className="flex flex-col gap-4">
                        {/* Status */}
                        <div className="flex flex-col gap-1 mt-2">
                            <p className="text-xs text-muted-foreground">
                                Status:
                            </p>
                            <Badge
                                className={`${status.bg}`}
                            >
                                {status.label}
                            </Badge>
                        </div>
                        {/* End Status */}

                        {/* Priority */}
                        <div className="flex flex-col gap-1">
                            <p className="text-xs text-muted-foreground">
                                Priority:
                            </p>
                            <Badge
                                className={`${priority.bg}`}
                            >
                                <Flag
                                    className={`${priority.color}`}
                                />
                                <p className={`${priority.color}`}>
                                    {priority.label}
                                </p>
                            </Badge>
                        </div>
                        {/* End Priority */}
                        
                        <div className="flex gap-8">
                            {/* Date Updated */}
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                    <Calendar1
                                        className="size-4"
                                    />
                                    <p>
                                        Last Updated:
                                    </p>
                                </div>
                                <Badge className=" bg-gray-300 text-neutral-700">
                                    {getDate(tasks.updated_at)}
                                </Badge>
                            </div>
                            {/* End Date Updated */}

                            {/* Date Created */}
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                    <Calendar
                                        className="size-4"
                                    />
                                    <p>
                                        Date Created:
                                    </p>
                                </div>
                                <Badge className="bg-gray-300 text-neutral-700">
                                    {getDate(tasks.created_at)}
                                </Badge>
                            </div>
                            {/* End Date Created */}
                        </div>
                    </div>
                    {/* End Data */}
                    <div className="flex flex-col items-end border-l pl-4 gap-2">
                        <p className="text-xs font-medium text-muted-foreground mt-2">
                            Quick Navigation
                        </p>
                        <div className="flex flex-col gap-1 w-full">
                            <EditDialog
                                task={tasks}
                            />
                            <DeleteButton
                                task={tasks}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}