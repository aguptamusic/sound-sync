import {Component} from 'react'
import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../App.css";
import axios from "axios";
const matchAPI = "http://localhost:4000/api/match";

export default class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  async componentDidMount() {
    
  }

  async _onButtonClick() {
    const res = await axios.get(matchAPI);
    this.setState({ matches: res.data});
    console.log(this.state.matches);
  }

  render() {
    return (
      <div className="Green-Button">
        <Button
          animated
          color="green"
          size="massive"
          onClick={this._onButtonClick}
        >
          <Button.Content visible>Sound Sync!</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>

        {
          this.state.matches.map((match) =>  {
            return <h1>You matched with {JSON.stringify(match)}</h1>
          })
        }
      </div>
    );
  }
}