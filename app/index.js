import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ThemeContext from './contexts/theme'
import Loading from './components/Loading'
import Nav from './components/Nav'

const Posts = React.lazy(() => import('./components/Posts'))
const Post = React.lazy(() => import('./components/Post'))
const User = React.lazy(() => import('./components/User'))



function App() {
  const [theme, setTheme] = React.useState('light')

  const toggleTheme = () =>
    setTheme((theme) =>
      theme === 'light' ? 'dark' : 'light'
    )


  return (
    <Router>
      <ThemeContext.Provider value={theme}>
        <div className={theme}>
          <div className='container'>
            <Nav toggleTheme={toggleTheme} />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={() => <Posts type='top' />}
                />
                <Route
                  path='/new'
                  render={() => <Posts type='new' />}
                />
                <Route path='/post' component={Post} />
                <Route path='/user' component={User} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeContext.Provider>
    </Router>
  )

}


ReactDOM.render(
  <App />,
  document.getElementById('app')
)
