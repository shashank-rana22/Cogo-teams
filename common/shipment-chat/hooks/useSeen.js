import { getApp, getApps, initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';

import { FirebaseConfig } from '../FirebaseConfig';

const useSeen = () => {
	const [msgSeen, setMsgSeen] = useState({});

	const app = getApps().length === 0 ? initializeApp(FirebaseConfig) : getApp();
	const db = getDatabase(app);

	useEffect(() => {
		const hit = ref(db, 'listchannels');

		onValue(hit, (snapshot) => {
			const data = snapshot.val();
			setMsgSeen(data);
		});
	}, [db]);

	return {
		msgSeen,
	};
};

export default useSeen;
