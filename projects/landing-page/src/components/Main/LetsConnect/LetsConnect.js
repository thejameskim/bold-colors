import React, { useState, useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './LetsConnect.css';
import { BackgroundTriangle } from '../../BackgroundTriangle/BackgroundTriangle';
import { viewportSizeIndex } from '../../../utils/isMobile/isMobile';
import { GlobalContext } from '../../../utils/GlobalContext/GlobalContext';

export function LetsConnect() {
	const [email, setEmail] = useState('');
	const { windowWidth } = useContext(GlobalContext);
	const vpIndex = viewportSizeIndex(windowWidth);

	return <>
		<div className="letsconnect-container" id="contact" style={{
			marginTop: [100, 100, 100, 200][vpIndex]

		}}>
			<div className="letsconnect-connect" >
				<div className="letsconnect-inner" style={{
					top: [-90, 0, -50, -150][vpIndex],
					position: 'absolute'
				}}>
					<h3>Interested in what we're making? Let us know!</h3>
					<h1 className={"maincolor-text"}>Let's Get Connected</h1>
					<div className="input-container">
						<input
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder="Type your email here"
						/>
					</div>
					<button onClick={async () => {
						try {
							if (email === "") {
								throw new Error('Empty Email');
							}
							await firebase.database().ref('emails').push(email);
							alert('You are now subscribed to updates. Thank you for your interest!')
							setEmail('');
						} catch (e) {
							alert(`Failed to set email ${e.message}`);
						}
					}}>
						Connect Now
					</button>
				</div>
				<BackgroundTriangle
					height={[300, 400, 250, 250][vpIndex]}
					direction="BOTTOM_RIGHT"
				/>
			</div>
		</div>
	</>
}