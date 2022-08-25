import clipboard from '../assets/clipboard.svg'
import styles from "./EmptyTaskList.module.css"

export default function EmptyTaskList() {
    return (
        <div className={styles.emptyTaskList}>
            <div className={styles.wrapper}>
                <img src={clipboard} />
                <div>
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <span>Crie tarefas e organize seus itens a fazer</span>
                </div>
            </div>
        </div>
    )
}