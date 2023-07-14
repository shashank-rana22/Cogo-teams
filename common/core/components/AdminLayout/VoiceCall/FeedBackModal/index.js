import { Modal, Button } from '@cogoport/components';
import { ChipsController, TextAreaController, useForm } from '@cogoport/forms';

import controls from '../configurations/feedback-form-controls';
import useCreateCommunicationLog from '../hooks/useCreateCommunicationLog';

import styles from './styles.module.css';

function FeedbackModal({ voice_call_recipient_data, callEndAt = '', unmountVoiceCall }) {
	const { handleSubmit, control, formState: { errors } } = useForm();
	const {
		createCommunicationLog,
		loading,
	} = useCreateCommunicationLog({
		voice_call_recipient_data,
		callEndAt,
		unmountVoiceCall,
	});
	const { feedbackType, feedbackDesc } = controls;

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
