import { Modal, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMMinus, IcMUserAllocations } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import hideNumber from '../../../../helpers/hideNumber';
import { useGetControls } from '../configurations/group-call-controls';
import secsToDurationConverter from '../utils/secsToDurationConverter';

import Attendees from './Attendees';
import ConferenceForm from './ConferenceForm';
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
	attendees = [],
}) {
	const { handleSubmit, control, formState: { errors }, watch, reset } = useForm();
	const controls = useGetControls({ localStateReducer });
	const { live_call_action_type = '' } = watch();
	const {
		mobile_number = '7981304246',
		mobile_country_code = '+91',
		userName = '',
	} = voice_call_recipient_data || {};

	const isInConferenceCall = !isEmpty(attendees) || false;
	return (
		<Modal
			show
			className={styles.modal_styles}
			scroll={false}
			closeOnOuterClick={false}
		>
			<Modal.Body>
				<div className={styles.minus_div}>
					<IcMMinus
						width={15}
						height={15}
						cursor="pointer"
						fill="#4F4F4F"
						onClick={() => localStateReducer({ showCallModalType: 'minimizedModal' })}
					/>
				</div>
				<div className={styles.content}>
					<div className={cl`${styles.header_flex} ${isInConferenceCall ? styles.header_on_conference : ''}`}>
						<div className={styles.avatar}>
							<IcMUserAllocations width={43} height={43} fill="#888FD1" />
						</div>
						<div className={cl`${styles.user_details} 
						${isInConferenceCall ? styles.user_details_on_conference : ''}`}
						>
							<div className={styles.user_name}>{userName || 'Unknown User'}</div>
							<div className={styles.number}>
								{mobile_country_code}
								<span>{hideNumber(mobile_number)}</span>
							</div>
							<div className={styles.timer}>{secsToDurationConverter(status, counter)}</div>
						</div>
					</div>
					{isInConferenceCall &&	<Attendees attendees={attendees} />}
					<div className={styles.footer} style={{ '--height': status ? '56%' : '30%' }}>
						{status
							? (
								<ConferenceForm {...{
									...(controls || {}),
									control,
									live_call_action_type,
									reset,
									updateLiveCallStatusLoading,
									updateLiveCallStatus,
									handleSubmit,
									errors,
								}}
								/>
							)
							: <div className={styles.connecting}>Connecting...</div>}
						{!live_call_action_type && (
							<div
								className={cl`${styles.end_call} 
								${(hangUpLoading || callLoading) ? styles.disable : ''}`}
								tabIndex={0}
								role="button"
								onClick={() => {
									if (!hangUpLoading && !callLoading) {
										hangUpCall();
									}
								}}
							>
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/hangUp.svg"
									alt="hang up"
									height={40}
								/>
							</div>
						)}
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default CallModal;
