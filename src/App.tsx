import styles from "./App.module.css"
import './App.module.css'
import Header from './components/Header'
import { PlusCircle, Trash } from 'phosphor-react'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import done from './assets/done.svg'
import EmptyTaskList from './components/EmptyTaskList'
import Task from "./components/Task"


interface Task {
  id: string;
  content: string;
  completed: boolean;
  publishedAt: Date,
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskText, setNewTaskText] = useState('')
  const [completedTasks, setCompletedTasks] = useState<number>(0)

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault()

    const id = String(new Date().getTime())
    const newTask: Task = {
      id,
      content: newTaskText,
      completed: false,
      publishedAt: new Date(),
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

    if (updatedTask.completed === false) {
      updatedTask.completed = true
      setCompletedTasks(prevState => prevState + 1)
    } else {
      return
    }

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
            <span className={styles.created}>Tarefas criadas <span>{tasks.length}</span></span>
            {tasks.length >= 1
              ?
              <span className={styles.finished}>Concluídas <span>{completedTasks} de {tasks.length}</span></span>
              :
              <span className={styles.finished}>Concluídas <span>{tasks.length}</span></span>
            }
          </header>

          {tasks.length === 0
            ?
            <EmptyTaskList />
            :
            tasks.map(task => {
              return (
                <div key={task.id} className={styles.main}>
                  <div className={styles.task}>
                    {task.completed === false
                      ?
                      <Task
                        task={task}
                        onFinish={() => handleFinishTask(task.id)}
                        onDelete={() => handleDeleteTask(task.id)}
                        isFinished={false}
                      />
                      :
                      <Task
                        task={task}
                        onFinish={() => handleFinishTask(task.id)}
                        onDelete={() => handleDeleteTask(task.id)}
                        isFinished={true}
                      />
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div >
  )
}

export default App
