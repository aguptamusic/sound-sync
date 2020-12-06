import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../App.css";

function Auth() {
  return (
    <div className="Green-Button">
      <Button
        animated="true"
        color="green"
        size="massive"
        href="http://localhost:4000/api/auth"
      >
        <Button.Content visible>
          Give Spotify Access to Your Account
        </Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>
    </div>
  );
}

export default Auth;
