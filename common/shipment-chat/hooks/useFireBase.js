import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';

import { FirebaseConfig } from '../FirebaseConfig';

const useFireBase = ({ id }) => {
	const [msgContent, setMsgContent] = useState([]);

	useEffect(() => {
		const app = getApps().length === 0 ? initializeApp(FirebaseConfig) : getApp();
		const db = getDatabase(app);
		const hit = ref(db, `Channels/${id}`);

		const unSubscribe = onValue(hit, (item) => {
			setMsgContent(item.val());
		});

		return () => unSubscribe();
	}, [id]);

	return {
		msgContent,
	};
};

export default useFireBase;
