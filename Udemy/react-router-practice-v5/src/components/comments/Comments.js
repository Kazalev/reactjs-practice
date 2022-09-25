import { useCallback, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { getAllComments } from '../../lib/api'
import useHttp from '../../hooks/use-http'

import LoadingSpinner from '../UI/LoadingSpinner'
import NewCommentForm from './NewCommentForm'
import CommentsList from './CommentsList'

import classes from './Comments.module.css'

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false)
  const params = useParams()
  const { quoteID } = params
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments)

  useEffect(() => {
    sendRequest(quoteID)
  }, [sendRequest, quoteID])

  const startAddCommentHandler = () => { setIsAddingComment(true) }
  const addedCommetnHandler = useCallback(() => {
    sendRequest(quoteID)
  }, [sendRequest, quoteID])

  let comments
  if (status === 'pendind') comments = <div className='centered'><LoadingSpinner /></div>
  if (status === 'completed' && (loadedComments || loadedComments.length > 0)) {
    comments = <CommentsList comments={loadedComments} />
  }
  if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
    comments = <p className='centered'>No comments were added yet!</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteID={quoteID} onAddedComment={addedCommetnHandler} />}
      {comments}
    </section>
  )
}

export default Comments