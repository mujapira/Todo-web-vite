import './App.module.css'
import Header from './components/Header'
import styles from "./App.module.css"
import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import clipboard from './assets/clipboard.svg'


interface Task {
  id: string;
  content: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState([])
  const [newTaskText, setNewTaskText] = useState('')

  function handleCreateNewTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  function handleInvalidTask() {

  }

  function handleNewTaskChange() { }


  function handleDeleteTask(e: any) {
    e.preventDefault()
  }

  const isNewTaskEmpty = newTaskText.length === 0;

  return (


    <div className="App" >
      <Header />

      <div className={styles.taskContainer}>
        <div className={styles.submitTaskContainer}>
          <form onSubmit={handleCreateNewTask}>
            <textarea
              name='task'
              value={newTaskText}
              placeholder='Adicione uma nova tarefa'
              onChange={handleNewTaskChange}
              onInvalid={handleInvalidTask}
              required
            />
            <button type="submit" disabled={isNewTaskEmpty}>Criar <PlusCircle size={16} /> </button>
          </form>
        </div>
        <div className={styles.taskList}>
          <header className={styles.wrapper}>
            <span className={styles.created}>Tarefas criadas <span>0</span></span>
            <span className={styles.finished}>Concluídas <span>0</span></span>
          </header>

          <main className={styles.main}>
            {tasks.length === 0
              ?
              <div className={styles.empty}>
                <img src={clipboard} />
                <div>
                  <span>Você ainda não tem tarefas cadastradas</span>
                  <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
              </div>
              :
              <div>tchau</div>
            }
          </main>

        </div>
      </div>
    </div >
  )
}

export default App
