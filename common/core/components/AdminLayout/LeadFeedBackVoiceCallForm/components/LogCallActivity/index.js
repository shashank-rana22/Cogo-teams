import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import FormLayout from '../../common/FormLayout';
import getControls from '../../configurations/getFeedbackFormControls';
import useCreateLeadOrgUserLog from '../../hooks/useCreateLeadOrgUserLog';

import styles from './styles.module.css';

const HIDE_CANCEL = ['voice_call'];

function LogCallActivity({
	leadOrgId = '',
	onCloseForm = () => {},
	partnerId = '',
	loggedInAgentId = '',
	leadUserId = '',
	restData = {},
	source = '',
	callRecordId = '',
}) {
	const { communication_start_time, communication_end_time } = restData || {};

	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
		watch,
	} = useForm({
		defaultValues: {
			agent_id                 : loggedInAgentId,
			lead_user_id             : leadUserId,
			communication_start_time : communication_start_time ? new Date(communication_start_time) : null,
			communication_end_time   : communication_end_time ? new Date(communication_end_time) : null,
		},
	});

	const {
		createLeadOrgUserLog = () => {},
		loading = false,
	} = useCreateLeadOrgUserLog({ leadOrgId, partnerId, onCloseForm, callRecordId });

	const controls = getControls({
		communicationType    : 'call',
		lead_organization_id : leadOrgId,
		watch,
	});

	return (
		<div className={styles.main_container}>
			<div className={styles.form_container}>
				<FormLayout
					controls={controls}
					control={control}
					errors={errors}
				/>
			</div>
			<div className={styles.footer}>
				{!HIDE_CANCEL.includes(source) ? (
					<Button
						size="md"
						themeType="secondary"
						disabled={loading}
						onClick={onCloseForm}
					>
						Cancel
					</Button>
				) : null}
				<Button
					size="md"
					themeType="accent"
					className={styles.button_styles}
					onClick={handleSubmit(createLeadOrgUserLog)}
					loading={loading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default LogCallActivity;
