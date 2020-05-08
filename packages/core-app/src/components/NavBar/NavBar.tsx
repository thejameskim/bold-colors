import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { OpenCVHelper } from '../../utils/OpenCVHelper';
import './NavBar.css';

type NavBarProps = {
    cvHelper: OpenCVHelper
    height: number,
    setHideSetting: () => void,
    setHideHelp: () => void
}

export const NavBar: React.FC<NavBarProps> = ({
    cvHelper,
    height,
    setHideSetting,
    setHideHelp
}) => {
    return(<>
        <nav style={{ height: height }}>
            <button onClick={setHideHelp}><FontAwesomeIcon icon={faQuestionCircle} color="white" /></button>
			<button onClick={() => {
				cvHelper.getFrameAsImage();
			}}>
				<FontAwesomeIcon icon={faCamera} />
			</button>
            <button onClick={setHideSetting}><FontAwesomeIcon icon={faCog} /></button>
        </nav>
    </>)
}