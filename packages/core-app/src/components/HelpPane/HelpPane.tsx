import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './HelpPane.css';

type StepContent = {
    image: string,
    desc: string
}

const instructData: Array<StepContent> = [
    {
        image: './img/person.png',
        desc: 'Point application to climbing way'
    },
    {
        image: './img/fingers.png',
        desc: 'Tap on the location you\'d like to route'
    },
    {
        image: './img/brain.png',
        desc: 'Memorize and/or photograph the route'
    }
];

type HelpPaneProps = {
    hide: Boolean,
    hideFunc: React.Dispatch<React.SetStateAction<Boolean>>,
    windowWidth: number,
    windowHeight: number
}

export const HelpPane: React.FC<HelpPaneProps> = ({
    hide,
    hideFunc,
    windowWidth,
    windowHeight
}) => {
    const stepsContent = instructData.map((step, index) => {
        return <Step key={index} stepData={step} />
    });
    const style = {
        left: (windowWidth / 20) + "px",
        top: (windowHeight / 15) + "px"
    }
    return(
    <>
        <div style={style} className={"helpPane " + (hide ? "hidden" : "")}>
            <button onClick={() => { hideFunc(true) }}><FontAwesomeIcon icon={faTimesCircle} /></button>
            <h1><span>How to use</span><br />Bold Colors</h1>
            <ol>
                {stepsContent}
            </ol>
        </div>
        <div className={"popup-bg " + (hide ? "hidden" : "")}>&nbsp;</div>
    </>);
}

type StepProps = {
    stepData: StepContent
}

const Step: React.FC<StepProps> = ({
    stepData
}) => {
    const url = "url(\'" + stepData.image + "\')";
    return(<li>
        {stepData.desc}
        <div className="instruct-img" style={{ backgroundImage: url }}>&#32;</div>
    </li>);
}