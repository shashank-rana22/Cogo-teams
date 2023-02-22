import { initializeApp, getApp, getApps } from 'firebase/app';
import {
	query,
	where,
	getCountFromServer,
	collectionGroup, getFirestore, orderBy,
} from 'firebase/firestore';
import { useState } from 'react';

import { firebaseConfig } from '../configurations/firebase-configs';

function useGetUsersStats() {
	const [userStats, setUserStats] = useState({ ai_chats: 0, kam_chats: 0 });

	const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
	const firestore = getFirestore(app);

	const getUserSats = async () => {
		const omniChannelCollection = collectionGroup(firestore, 'rooms');
		const countKamChats = query(
			omniChannelCollection,
			where('session_type', '==', 'admin'),
			orderBy('updated_at', 'desc'),
		);
		const countBotChats = query(
			omniChannelCollection,
			where('session_type', '==', 'bot'),
			orderBy('updated_at', 'desc'),
		);
		const ActiveBotChats = await getCountFromServer(countBotChats);
		const ActiveKamChats = await getCountFromServer(countKamChats);
		setUserStats({
			ai_chats  : ActiveBotChats.data().count,
			kam_chats : ActiveKamChats.data().count,
		});
	};

	return {
		getUserSats,
		userStats,
	};
}

export default useGetUsersStats;
