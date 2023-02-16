import { Button, Toast } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { setCookie } from 'cookies-next';
import React, { useState } from 'react';

import MappedUser from './MappedUser';
import styles from './styles.module.css';

function SwitchAccounts({ userMappings = [], refetch = () => {}, timeLeft, checkIfSessionExpiring }) {
	const {
		profile,
	} = useSelector((state) => state);

	const [showActions, setShowActions] = useState(false);
	const [sessionId, setSessionId] = useState('');

	const handleSwitchProfile = (user_session_id) => {
		setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, user_session_id, 2000, {});
		// eslint-disable-next-line no-undef
		window.location.href = '/';
		Toast.success('Switching Profile');
	};

	return (
		<div className={styles.container}>
			{(userMappings || []).map((user) => {
				if (user?.user_id === profile?.user?.id) {
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
			<div className={styles.button_container}>
				<Button
					style={{ width: '100%' }}
					themeType="accent"
					onClick={() => handleSwitchProfile(sessionId)}
				>
					Switch Account
				</Button>
			</div>
		</div>
	);
}

export default SwitchAccounts;
