import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Form from '../../common/Form';
import LEAD_ORG_FEEDBACK from '../../configurations/leadOrgFeedbackForm';
import usePostAllocationFeedback from '../../hooks/usePostAllocationFeedback';

import styles from './styles.module.css';

function LeadOrgFeedback({ onCloseForm = () => {}, leadOrgId = '' }) {
	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
		watch,
	} = useForm();

	const {
		postAllocationFeedback = () => {},
		loading = false,
	} = usePostAllocationFeedback({ leadOrgId, onCloseForm });

	const selectedFeedback = watch('feedback');

	return (
		<div className={styles.main_container}>
			<div className={styles.form_container}>
				<Form
					controls={LEAD_ORG_FEEDBACK}
					control={control}
					errors={errors}
					showElements={{ other_feedback: selectedFeedback === 'other' }}
				/>
			</div>
			<div className={styles.footer}>
				<Button
					size="md"
					themeType="secondary"
					disabled={loading}
					onClick={onCloseForm}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="accent"
					className={styles.button_styles}
					onClick={handleSubmit(postAllocationFeedback)}
					loading={loading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default LeadOrgFeedback;
