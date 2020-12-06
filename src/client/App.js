import { Container} from 'semantic-ui-react';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Match from './components/Match'

function App() {
  return (
    <Container>
      <BrowserRouter >
        <Route exact path='/' component={() => <h1>Home Page</h1>}/>
        <Route path='/auth' component={() => <Auth />}/>
        <Route path='/match' component={() => <Match />}/>
      </BrowserRouter>
    </Container>
  );
}

export default App;
