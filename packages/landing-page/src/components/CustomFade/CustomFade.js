import React from 'react';
import Fade from 'react-reveal/Fade';
import { EnabledFeatures } from '../../_ENABLED_FEATURES/EnabledFeatures';

export function CustomFade(props) {
	if (EnabledFeatures.Fade) {
		return <Fade left={props.left} cascade={props.cascade} duration={props.duration} >{props.children}</Fade>
	} else {
		return <>{props.children}</>
	}
}