import { Button } from 'semantic-ui-react';

function Match() {
    return (
        <Button 
            href="http://localhost:4000/api/matches"
            className='ui green button'                     
            color='green'
        >
            Recommend Matches!
        </Button>
    );
}

export default Match;