import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import MappedUser from './MappedUser';
import styles from './styles.module.css';

function SwitchAccounts({ userMappings = [], refetch = () => {}, timeLeft, checkIfSessionExpiring }) {
	const [showActions, setShowActions] = useState(false);
	const [sessionId, setSessionId] = useState('');

	const {
		profile,
	} = useSelector((state) => state);

	return (
		<div className={styles.container}>
			{(userMappings || []).map((user) => {
				if (user?.user_id === profile?.id) {
					return null;
				} return (
					<MappedUser
						key={user?.user_id}
						userMappings={userMappings}
						profileData={profile}
						refetch={refetch}
						user={user}
						sessionId={sessionId}
						setSessionId={setSessionId}
						setShowActions={setShowActions}
						showActions={showActions}
						timeLeft={timeLeft}
						checkIfSessionExpiring={checkIfSessionExpiring}
					/>
				);
			})}
		</div>
	);
}

export default SwitchAccounts;
