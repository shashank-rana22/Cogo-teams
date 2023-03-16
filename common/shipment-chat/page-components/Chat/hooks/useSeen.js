import { useState, useEffect } from 'react';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { FirebaseConfig } from '../FirebaseConfig';

const useSeen = () => {
	const [msgSeen, setMsgSeen] = useState({});

	useEffect(() => {
		const app =
			getApps().length === 0 ? initializeApp(FirebaseConfig) : getApp();
		const db = getDatabase(app);

		const hit = ref(db, `listchannels`);

		onValue(hit, (snapshot) => {
			const data = snapshot.val();
			setMsgSeen(data);
		});
	}, []);

	return {
		msgSeen,
	};
};

export default useSeen;
