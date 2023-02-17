import { Button, Toast } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { setCookie } from '@cogoport/utils';
import React, { useState } from 'react';

import MappedUser from './MappedUser';
import styles from './styles.module.css';

function SwitchAccounts({
	userMappings = [],
	refetch = () => {},
	loading,
	timeLeft,
	checkIfSessionExpiring,
	setOpenPopover = () => {},
}) {
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

	if (userMappings?.length < 2) {
		return null;
	}

	return (
		<div className={styles.container}>
			{(userMappings || []).map((user) => {
				if (user?.user_id === profile?.user?.id) {
					return null;
				}

				return (
					<MappedUser
						loading={loading}
						timeLeft={timeLeft}
						key={user?.user_id}
						userMappings={userMappings}
						profileData={profile}
						refetch={refetch}
						user={user}
						setOpenPopover={setOpenPopover}
						checkIfSessionExpiring={checkIfSessionExpiring}
						sessionId={sessionId}
						setSessionId={setSessionId}
						setShowActions={setShowActions}
						showActions={showActions}
					/>
				);
			})}
			<div className={styles.button_container}>
				<Button
					style={{ width: '100%' }}
					themeType="accent"
					disabled={!sessionId || checkIfSessionExpiring || loading}
					onClick={() => handleSwitchProfile(sessionId)}
				>
					Switch Account
				</Button>
			</div>
		</div>
	);
}

export default SwitchAccounts;
