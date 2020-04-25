import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Main } from './components/Main/Main';
import firebase from 'firebase';

ReactDOM.render(<Main />, document.getElementById('root'));

const firebaseConfig = {
	apiKey: "AIzaSyCM7atDnsQgKS32wNK19U85_OBDRuGENEM",
	authDomain: "boldcolors-e77c8.firebaseapp.com",
	databaseURL: "https://boldcolors-e77c8.firebaseio.com",
	projectId: "boldcolors-e77c8",
	storageBucket: "boldcolors-e77c8.appspot.com",
	messagingSenderId: "754765351249",
	appId: "1:754765351249:web:7cbc78fd4033f48821eb70",
	measurementId: "G-06R0MLGCRC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
