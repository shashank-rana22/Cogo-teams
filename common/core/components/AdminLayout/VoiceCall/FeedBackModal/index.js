import { Modal, Button } from '@cogoport/components';
import { ChipsController, TextAreaController, AsyncSelectController, useForm } from '@cogoport/forms';

import getControls from '../configurations/feedback-form-controls';
import useCreateCommunicationLog from '../hooks/useCreateCommunicationLog';

import styles from './styles.module.css';

function FeedbackModal({
	receiverUserDetails = {},
	unmountVoiceCall = () => {},
	loggedInAgentId = '',
	callStartAt = '',
	callEndAt = '',
	callRecordId = '',
	agentType = '',
	firestore = {},
}) {
	const { mobile_number = '', mobile_country_code = '' } = receiverUserDetails || {};
	const { handleSubmit, control, formState: { errors }, watch } = useForm();

	const {
		createCommunicationLog,
		loading,
	} = useCreateCommunicationLog({
		receiverUserDetails,
		unmountVoiceCall,
		loggedInAgentId,
		callStartAt,
		callEndAt,
		callRecordId,
		firestore,
	});

	const formValues = watch();

	const { title = '' } = formValues || {};

	const { feedbackType, feedbackDesc, sid } = getControls({
		mobileCountryCode : mobile_country_code,
		mobileNumber      : mobile_number,
		title,
		agentType,
	});

	return (
		<Modal
			scroll={false}
			size="sm"
			show
			className={styles.styled_ui_modal_dialog}
			closeOnOuterClick={false}
			showCloseIcon={false}
		>
			<Modal.Body>
				<form onSubmit={handleSubmit(createCommunicationLog)}>
					<div className={styles.feed_title}>Feedback</div>
					<div className={styles.label}>Reason for contact ?</div>
					<ChipsController
						className={styles.styled_chips}
						control={control}
						{...feedbackType}
					/>
					<div className={styles.error_message}>{errors?.title && 'This is Required'}</div>
					{title === 'shipment_enquiry' ? (
						<>
							<div className={styles.shipment_details}>
								<div className={styles.label}>Select SID</div>
								<AsyncSelectController
									control={control}
									{...sid}
								/>
							</div>
							<div className={styles.error_message}>{errors?.sid && 'This is Required'}</div>
						</>
					) : null}
					<TextAreaController
						control={control}
						{...feedbackDesc}
					/>
					<div className={styles.error_message}>{errors?.communication_summary && 'This is Required'}</div>
					<div className={styles.button_container}>
						<Button
							size="md"
							className={styles.button_container}
							themeType="accent"
							loading={loading}
							type="submit"
						>
							Submit
						</Button>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	);
}

export default FeedbackModal;
