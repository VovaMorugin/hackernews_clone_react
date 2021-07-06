import React from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/api'
import Loading from './Loading'
import PostsList from './PostsList'


function postReducer(state, action) {
  if (action.type === 'fetch') {
    return {
      ...state,
      loading: true
    }
  }
  else if (action.type === 'success') {
    return {
      posts: action.posts,
      loading: false,
      error: null
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.message,
      loading: false,
    }
  } else {
    throw new Error(`Impossible action`)
  }
}

export default function Posts({ type }) {

  const [state, dispatch] = React.useReducer(
    postReducer,
    {
      posts: null,
      error: null,
      loading: true,
    }
  )

  React.useEffect(() => {
    dispatch({ type: 'fetch' })

    fetchMainPosts(type)
      .then((posts) => dispatch({ type: 'success', posts }))
      .catch(({ message }) => dispatch({ type: 'error', error }))
  }, [type])

  const { posts, error, loading } = state

  if (loading === true) {
    return <Loading />
  }

  if (error) {
    return <p className='center-text error'>{error}</p>
  }

  return <PostsList posts={posts} />

}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new'])
}