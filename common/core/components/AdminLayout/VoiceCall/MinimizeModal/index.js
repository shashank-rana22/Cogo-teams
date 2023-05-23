import { IcMProfile, IcMCall } from '@cogoport/icons-react';
import React from 'react';

import secsToDurationConverter from '../utils/secsToDurationConverter';

import styles from './styles.module.css';

function MinimizeModal({
	status = '',
	callLoading = false,
	counter = 0,
	voice_call_recipient_data,
	hangUpCall,
	hangUpLoading = false,
	localStateReducer,
}) {
	const {
		mobile_number = '',
		mobile_country_code = '',
		userName = '',
	} = voice_call_recipient_data || {};

	const handleEndClick = (e) => {
		e.stopPropagation();
		if (!hangUpLoading && !callLoading) {
			hangUpCall();
		}
	};

	return (
		<div
			className={styles.container}
			role="button"
			tabIndex={0}
			onClick={() => localStateReducer({ showCallModalType: 'fullCallModal' })}
		>
			<div className={styles.avatar}>
				<IcMProfile width={20} height={20} />
			</div>
			<div
				className={styles.details}
				role="button"
				tabIndex={0}
			>
				<div className={styles.min_number}>
					{userName || `${mobile_country_code} ${mobile_number}`
				|| 'Unkown User'}
				</div>
				<div className={styles.status_container}>
					<div className={styles.min_duration}>
						{status ? secsToDurationConverter(status, counter) : 'Connecting...'}
					</div>
				</div>
			</div>

			{!callLoading && (
				<div
					onClick={(e) => handleEndClick(e)}
					role="button"
					tabIndex={0}
					className={styles.end_call}
					style={{ cursor: (hangUpLoading || callLoading) ? 'not-allowed' : 'pointer' }}
				>
					<IcMCall
						className={styles.end_call_icon}
					/>
				</div>
			)}
		</div>
	);
}

export default MinimizeModal;
