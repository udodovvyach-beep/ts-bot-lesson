interface Task {
    id: number;
    title: string;
    isDone: boolean;
    priority: "low" | "medium" | "high"
}

function getTaskStatus(task: Task) : string {
    const {title} = task;
    if (task.isDone) {
        return `✅ Выполнено: ${title}`;
    } else {
        return `⏳ В работе ${task.priority}: ${title}`;
    }
}

const task1: Task = {
                        id: 1, 
                        title: "Настроить среду", 
                        isDone: true, 
                        priority: "high"
                    };

const task2: Task = {
                        id: 2,
                        title: "Изучить TS",
                        isDone: false,
                        priority: "medium"
                    }

console.log(getTaskStatus(task1));
console.log(getTaskStatus(task2));