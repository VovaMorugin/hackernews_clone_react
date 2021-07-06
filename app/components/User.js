import React from 'react'
import queryString from 'query-string'
import { fetchUser, fetchPosts } from '../utils/api'
import Loading from './Loading'
import { formatDate } from '../utils/helpers'
import PostsList from './PostsList'


function postReducer(state, action) {

  if (action.type === 'fetch') {
    return {
      ...state,
      loadingPosts: true,
      loadingUser: true
    }

  } else if (action.type === 'successUser') {
    return {
      ...state,
      user: action.user,
      loadingUser: false
    }
  } else if (action.type === 'successPosts') {
    return {
      ...state,
      posts: action.posts,
      loadingPosts: false,
      error: null
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error,
      loadingPosts: false,
      loadingUser: false
    }
  } else {
    throw new Error('Impossible type')
  }

}

export default function Post({ location }) {
  const { id } = queryString.parse(location.search)

  const [state, dispatch] = React.useReducer(
    postReducer,
    {
      user: null,
      loadingUser: true,
      posts: null,
      loadingPosts: true,
      error: null,
    }
  )

  React.useEffect(() => {
    dispatch({ type: 'fetch' })

    fetchUser(id)
      .then((user) => {
        dispatch({ type: 'successUser', user })
        return fetchPosts(user.submitted.slice(0, 30))
      })

      .then((posts) => dispatch(({ type: 'successPosts', posts })))
      .catch(({ message }) => dispatch({ type: 'error', error: message }))

  }, [id])


  const { user, posts, loadingUser, loadingPosts, error } = state

  if (error) {
    return <p className='center-text error'>{error}</p>
  }

  return (
    <React.Fragment>
      {loadingUser === true
        ? <Loading text='Fetching User' />
        : <React.Fragment>
          <h1 className='header'>{user.id}</h1>
          <div className='meta-info-light'>
            <span>joined <b>{formatDate(user.created)}</b></span>
            <span>has <b>{user.karma.toLocaleString()}</b> karma</span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: user.about }} />
        </React.Fragment>}
      {loadingPosts === true
        ? loadingUser === false && <Loading text='Fetching posts' />
        : <React.Fragment>
          <h2>Posts</h2>
          <PostsList posts={posts} />
        </React.Fragment>}
    </React.Fragment>
  )

}