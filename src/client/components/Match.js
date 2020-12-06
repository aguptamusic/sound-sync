import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../App.css";

function Match() {
  return (
    <div className="Green-Button">
      <Button
        animated
        color="green"
        href="http://localhost:4000/api/match"
        size="massive"
      >
        <Button.Content visible>Sound Sync!</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>
    </div>
  );
}

export default Match;
