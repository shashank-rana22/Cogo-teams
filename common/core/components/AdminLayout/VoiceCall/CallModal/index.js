import { Modal, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMMinus, IcMUserAllocations, IcMCall } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import hideNumber from '../../../../helpers/hideNumber';
import { useGetControls } from '../configurations/group-call-controls';
import getConferenceText from '../helpers/getConferenceText';
import secsToDurationConverter from '../utils/secsToDurationConverter';

import Attendees from './Attendees';
import ConferenceForm from './ConferenceForm';
import IncomingCallUserDetails from './IncomingCallUserDetails';
import styles from './styles.module.css';

function CallModal({
	receiverUserDetails = {},
	status = '',
	callLoading = false,
	updateLiveCallStatusLoading = false,
	updateLiveCallStatus = () => {},
	setCallState = () => {},
	counter = 0,
	hangUpCall = () => {},
	hangUpLoading = false,
	attendees = [],
	conferenceType = '',
	callState = {},
	callUserDetails = {},
	callUserLoading = false,
}) {
	const { handleSubmit, control, formState: { errors }, watch, reset } = useForm();

	const controls = useGetControls();

	const { live_call_action_type = '' } = watch();
	const {
		mobile_number = '',
		mobile_country_code = '',
		userName = '',
	} = receiverUserDetails || {};

	const isInConferenceCall = !isEmpty(attendees) || false;

	const hangUpFunc = () => {
		if (!hangUpLoading && !callLoading) {
			hangUpCall();
		}
	};

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
						className={styles.minus_sign}
						onClick={() => setCallState((p) => ({ ...p, showCallModalType: 'minimizedModal' }))}
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
							<div className={styles.user_name}>
								{userName
							|| `${mobile_country_code} ${mobile_number}` || 'Unknown User'}
							</div>
							<div className={styles.number}>
								{mobile_country_code}
								{' '}
								{' '}
								<span>{hideNumber(mobile_number)}</span>
							</div>
							<div className={styles.timer}>{secsToDurationConverter(status, counter)}</div>
						</div>
					</div>
					{!status && conferenceType
					&& <div className={styles.call_text}>{getConferenceText({ callState })}</div>}
					{status && isInConferenceCall && <Attendees attendees={attendees} />}
					<div className={styles.footer} style={{ height: status ? '56%' : '30%' }}>
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
						{!live_call_action_type && (status || !conferenceType) && (
							<div
								className={cl`${styles.end_call} 
								${(hangUpLoading || callLoading) ? styles.disable : ''}`}
								role="presentation"
								onClick={hangUpFunc}
							>
								<IcMCall className={styles.end_call_icon} />
								<div className={styles.warn_text}>End Complete Call</div>
							</div>
						)}
					</div>
				</div>
				<IncomingCallUserDetails
					receiverUserDetails={receiverUserDetails}
					callUserDetails={callUserDetails}
					callUserLoading={callUserLoading}
				/>
			</Modal.Body>
		</Modal>
	);
}

export default CallModal;
