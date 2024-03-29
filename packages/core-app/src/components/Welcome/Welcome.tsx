import React from 'react';
import './Welcome.css';

type WelcomeProps = {
    hide: Boolean
}

export const Welcome: React.FC<WelcomeProps> = ({
    hide
}) => {
    return(<div id="welcome-pu" className={hide ? "hidden" : ""}>
        <h1><span>Welcome to</span><br />Bold Colors</h1>
        <p>Start by tapping an object below</p>
    </div>);
}