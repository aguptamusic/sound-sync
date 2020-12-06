import { Button } from 'semantic-ui-react';

function Auth() {
    return (
        <Button 
            href="http://localhost:4000/api/auth"
            className='ui green button'                     
            color='green'
        >
            Authorize Spotify Access
        </Button>
    );
}

export default Auth;