import { Modal, cl, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMProfile, IcMMinus } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import hideNumber from '../../../../helpers/hideNumber';
import useGetControls from '../configurations/group-call-controls';
import CustomCheckBoxGroupController from '../utils/CustomCheckBoxGroupController';
import CustomSelectController from '../utils/CustomSelectController';
import secsToDurationConverter from '../utils/secsToDurationConverter';

import styles from './styles.module.css';

function CallModal({
	voice_call_recipient_data = {},
	status = '',
	callLoading = false,
	updateLiveCallStatusLoading = false,
	updateLiveCallStatus,
	localStateReducer,
	counter,
	hangUpCall,
	hangUpLoading = false,
}) {
	const { handleSubmit, control, formState: { errors } } = useForm();
	const { agent = {}, actionType = {} } = useGetControls({ localStateReducer });

	const {
		mobile_number = '',
		mobile_country_code = '',
		userName = '',
	} = voice_call_recipient_data || {};

	return (
		<Modal
			show
			className={styles.modal_styles}
		>
			<Modal.Body>
				<IcMMinus
					width={25}
					height={25}
					cursor="pointer"
					onClick={() => localStateReducer({ showCallModalType: 'minimizedModal' })}
				/>
				<div className={styles.outer_flex}>
					<div className={styles.content}>
						<div className={styles.avatar}>
							<IcMProfile width={40} height={40} />
						</div>
						<div className={styles.org_name}>
							{userName || 'Unknown User'}
						</div>
						<div className={styles.number}>
							{mobile_country_code}
							{' '}
							{hideNumber(mobile_number)}
						</div>
						<div className={styles.status_div}>{startCase(status) || 'Connecting...'}</div>
						<div className={styles.timer}>{secsToDurationConverter(status, counter)}</div>
						<div className={styles.hang_up}>
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/hangUp.svg"
								alt="hang-Up"
								style={{ width: '50px', height: '50px' }}
								role="presentation"
								onClick={() => {
									if (!hangUpLoading && !callLoading) {
										hangUpCall();
									}
								}}
								className={cl`${(callLoading || hangUpLoading) ? styles.disable : ''}`}
							/>
						</div>
					</div>
					<form
						className={styles.conference_call_setting}
						onSubmit={handleSubmit(updateLiveCallStatus)}
					>
						<div className={styles.agent_selecter}>
							<div className={styles.label_text}>Select Agent</div>
							<CustomSelectController control={control} {...agent} />
							<div className={styles.error_text}>{errors?.agent_id && 'Required'}</div>
						</div>
						<CustomCheckBoxGroupController control={control} {...actionType} />
						<div className={styles.button_div}>
							<Button
								type="submit"
								size="md"
								themeType="accent"
								disabled={!status || callLoading || hangUpLoading}
								loading={updateLiveCallStatusLoading}
							>
								submit
							</Button>
						</div>
					</form>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default CallModal;
