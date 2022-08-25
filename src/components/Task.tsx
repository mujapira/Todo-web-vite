import { Trash } from 'phosphor-react';
import styles from './Task.module.css'
import done from '../assets/done.svg'

interface Task {
    id: string;
    content: string;
    completed: boolean;
    publishedAt: Date,
}

interface Props {
    task: Task
    onFinish: (id: string) => void
    onDelete: (id: string) => void
    isFinished?: boolean
}

export default function Task({ task, onFinish, onDelete, isFinished = false }: Props) {
    return (
        <>
            <button
                className={isFinished ? styles.finishButtonFinished : styles.finishButton}
                onClick={() => onFinish(task.id)}>
                {isFinished === true && <img src={done} />}
            </button>
            <span className={isFinished ? styles.taskContentFinished : styles.taskContent}>{task.content}</span>
            <button className={styles.deleteButton} onClick={() => onDelete(task.id)}><Trash size={16} /></button>
        </>
    )
}