import { IcMProfile } from '@cogoport/icons-react';
import { setProfileState } from '@cogoport/store/reducers/profile';
import React from 'react';

import styles from './styles.module.css';

function MinimizeModal({
	dispatch,
	profileData = {},
	name = '',
	code = '',
	number = '',
	status = '',
	handleEnd = () => { },
	durationTime = () => { },
	callLoading,
}) {
	return (
		<div
			className={styles.container}
			role="presentation"
			onClick={() => {
				dispatch(
					setProfileState({
						...profileData,
						voice_call: {
							...profileData?.voice_call,
							showCallModal : true,
							minimizeModal : false,
						},
					}),
				);
			}}
		>
			<div className={styles.avatar}>
				<IcMProfile width={20} height={20} />
			</div>
			<div
				className={styles.details}
				role="presentation"
				onClick={() => {
					dispatch(
						setProfileState({
							...profileData,
							voice_call: {
								...profileData?.voice_call,
								showActiveCallModal : true,
								minimizeModal       : false,
							},
						}),
					);
				}}
			>
				<div className={styles.min_number}>{name || `${code} ${number}`}</div>
				<div className={styles.status_container}>
					<div className={styles.min_duration}>{status || 'Connecting...'}</div>
					{ ' '}
					<div className={styles.min_duration}>
						{durationTime()}
					</div>
				</div>
			</div>

			{!callLoading && (
				<div
					onClick={(e) => {
						e.stopPropagation();
						handleEnd();
					}}
					role="presentation"
				>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/end-icon.svg"
						alt="end-icon"
						style={{ cursor: 'pointer', width: '25px', height: '25px', marginTop: '5px' }}
					/>
				</div>
			)}
		</div>
	);
}

export default MinimizeModal;
