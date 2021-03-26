import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { store } from './index';
import { loadUser } from './store/actions/authActions';
import './App.less';
import Navbar from './components/layout/Navbar';
import Story from './components/pages/story/Story';
import Browser from './components/pages/browser/Browser';
import WordList from './components/pages/savedWords/WordList';
import InputForm from './components/pages/userText/InputForm';
import UserRegister from './components/pages/user/userRegister';
import UserLogin from './components/pages/user/userLogin';
import StoryAdd from './components/pages/story/StoryAdd';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <div className='App'>
        <header>
          <Navbar></Navbar>
        </header>
        <Switch>
          <Route exact path='/' component={Browser} />
          <Route path='/story/:storyId' component={Story} />
          <Route path='/addstory' component={StoryAdd} />
          <Route exact path='/words' component={WordList} />
          <Route exact path='/custom' component={InputForm} />
          <Route exact path='/user/register' component={UserRegister} />
          <Route exact path='/user/login' component={UserLogin} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

// const mapDispatchToProps = (dispatch: any) => ({
//   loadUser: () => dispatch({ type: 'USER_LOADING' }),
// });

export default App;
