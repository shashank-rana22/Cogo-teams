import { IcMProfile } from '@cogoport/icons-react';
import { setProfileState } from '@cogoport/store/reducers/profile';
import React from 'react';

import styles from './styles.module.css';

function MinimizeModal({
	dispatch,
	profileData = {},
	name = '',
	mobile_number = '',
	mobile_country_code = '',
	status = '',
	handleEnd = () => { },
	durationTime = () => { },
	callLoading,
}) {
	const handleClick = (type) => {
		dispatch(
			setProfileState({
				...profileData,
				voice_call: {
					...profileData?.voice_call,
					[type]        : true,
					minimizeModal : false,
				},
			}),
		);
	};

	const handleEndClick = (e) => {
		e.stopPropagation();
		handleEnd();
	};

	return (
		<div
			className={styles.container}
			role="presentation"
			onClick={() => handleClick('showCallModal')}
		>
			<div className={styles.avatar}>
				<IcMProfile width={20} height={20} />
			</div>
			<div
				className={styles.details}
				role="presentation"
				onClick={() => handleClick('showActiveCallModal')}
			>
				<div className={styles.min_number}>{name || `${mobile_country_code} ${mobile_number}`}</div>
				<div className={styles.status_container}>
					<div className={styles.min_duration}>{status || 'Connecting...'}</div>
					{' '}
					<div className={styles.min_duration}>
						{durationTime()}
					</div>
				</div>
			</div>

			{!callLoading && (
				<div
					onClick={(e) => handleEndClick(e)}
					role="presentation"
				>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/end-icon.svg"
						alt="end-icon"
						className={styles.end_icon}
					/>
				</div>
			)}
		</div>
	);
}

export default MinimizeModal;
