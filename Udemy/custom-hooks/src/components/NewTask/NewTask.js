import useFetch from '../../hooks/useFetch'
import Section from '../UI/Section'
import TaskForm from './TaskForm'

const NewTask = props => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useFetch()

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText }
    props.onAddTask(createdTask)
  }

  const enterTaskHandler = async taskText => {
    sendTaskRequest({
      url: 'https://react-http-70be7-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: taskText })
    }, createTask.bind(null, taskText))
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  )
}

export default NewTask