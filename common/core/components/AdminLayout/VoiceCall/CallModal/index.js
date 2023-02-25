import { Modal, cl } from '@cogoport/components';
import { IcMProfile, IcMMinus } from '@cogoport/icons-react';
import { setProfileState } from '@cogoport/store/reducers/profile';
import React from 'react';

import { NumberHide } from '../constant';

import styles from './styles.module.css';

function CallModal({
	dispatch,
	profileData = {},
	showCallModal,
	name = '',
	mobile_number = '',
	mobile_country_code = '',
	status = '',
	handleEnd = () => {},
	durationTime = () => {},
	callLoading,
}) {
	return (
		<Modal
			show={showCallModal}
			size="sm"
			className={styles.modal_styles}
		>
			<Modal.Body>
				<IcMMinus
					width={25}
					height={25}
					cursor="pointer"
					onClick={() => {
						dispatch(
							setProfileState({
								...profileData,
								voice_call: {
									...profileData?.voice_call,
									showCallModal : false,
									minimizeModal : true,
								},
							}),
						);
					}}
				/>
				<div className={styles.content}>
					<div className={styles.avatar}>
						<IcMProfile width={40} height={40} />
					</div>
					<div className={styles.org_name}>
						{name || 'Unknown User'}
					</div>
					<div className={styles.number}>
						{mobile_country_code}
						{' '}
						{NumberHide(mobile_number)}
					</div>
					<div className={styles.status_div}>{status || 'Connecting...'}</div>
					<div className={styles.timer}>{durationTime()}</div>
					<div className={styles.hang_up}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/hangUp.svg"
							alt="hang-Up"
							style={{ width: '50px', height: '50px' }}
							role="presentation"
							onClick={handleEnd}
							className={cl`${callLoading ? styles.disable : ''}`}
						/>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default CallModal;
