import React, { useEffect, useState } from 'react'
import Tasks from './components/Tasks/Tasks'
import NewTask from './components/NewTask/NewTask'
import BackwardCounter from './components/BackwardCounter'
import ForwardCounter from './components/ForwardCounter'
import useFetch from './hooks/useFetch'

function App() {
  const [tasks, setTasks] = useState([])

  const { isLoading, error, sendRequest: fetchTasks } = useFetch()

  useEffect(() => {
    const transformTasks = tasksOjb => {
      const loadedTasks = []
      for (const taskKey in tasksOjb) loadedTasks.push({ id: taskKey, text: tasksOjb[taskKey].text })
      setTasks(loadedTasks)
    }

    fetchTasks({ url: 'https://react-http-70be7-default-rtdb.europe-west1.firebasedatabase.app/tasks.json' }, transformTasks)
  }, [fetchTasks])

  const taskAddHandler = task => {
    setTasks(prevTasks => prevTasks.concat(task))
  }

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
      <ForwardCounter />
      <BackwardCounter />
    </React.Fragment>
  )
}

export default App