import './App.module.css'
import Header from './components/Header'
import styles from "./App.module.css"
import { PlusCircle, Trash } from 'phosphor-react'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import clipboard from './assets/clipboard.svg'


interface Task {
  id: string;
  content: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskText, setNewTaskText] = useState('')

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault()

    const id = String(new Date().getTime())
    const newTask: Task = {
      id,
      content: newTaskText,
      completed: false
    }

    setTasks([...tasks, newTask])
    setNewTaskText('')
  }

  function handleNewTaskChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('')
    setNewTaskText(e.target.value)
  }

  function handleInvalidTask(e: InvalidEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('Esse campo não pode estar vazio!')
  }

  function handleDeleteTask(id: string) {
    const filteredTasks = tasks.filter(task => task.id !== id);

    setTasks(filteredTasks)
  }

  function handleFinishTask(id: string) {
    const filteredTasks = tasks.filter(task => task.id !== id);
    const task = tasks.filter(task => task.id === id);
    const updatedTask = task[0]
    updatedTask.completed = true;

    setTasks([...filteredTasks, updatedTask])
  }
  
  const isNewTaskEmpty = newTaskText.length === 0;
  console.log(tasks)

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

          {tasks.length === 0
            ?
            <main className={styles.mainEmpty}>
              <div className={styles.empty}>
                <img src={clipboard} />
                <div>
                  <span>Você ainda não tem tarefas cadastradas</span>
                  <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
              </div>
            </main>
            :
            tasks.map(task => {
              return (
                <main key={task.id} className={styles.main}>
                  <div className={styles.task}>
                    {task.completed
                      ?
                      <>
                        <button className={styles.finishTask} onClick={() => handleFinishTask(task.id)}></button>
                        <span className={styles.taskContent}>{task.content}</span>
                        <button className={styles.deleteTask} onClick={() => handleDeleteTask(task.id)}><Trash size={16} /></button>
                      </>
                      :
                      <>
                        <button className={styles.finishTask} onClick={() => handleFinishTask(task.id)}></button>
                        <span className={styles.taskContent}>{task.content}</span>
                        <button className={styles.deleteTask} onClick={() => handleDeleteTask(task.id)}><Trash size={16} /></button>
                      </>
                    }
                  </div>
                </main>
              )
            })
          }

        </div>
      </div>
    </div >
  )
}

export default App
