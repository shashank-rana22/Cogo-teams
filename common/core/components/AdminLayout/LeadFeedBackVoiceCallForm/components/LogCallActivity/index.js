import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Form from '../../common/Form';
import getControls from '../../configurations/getFeedbackFormControls';
import useCreateLeadOrgUserLog from '../../hooks/useCreateLeadOrgUserLog';

import styles from './styles.module.css';

function LogCallActivity({
	leadOrgId = '',
	onCloseForm = () => {},
	partnerId = '',
	loggedInAgentId = '',
}) {
	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
		watch,
	} = useForm({
		defaultValues: {
			agent_id: loggedInAgentId,
		},
	});

	const {
		createLeadOrgUserLog = () => {},
		loading = false,
	} = useCreateLeadOrgUserLog({ leadOrgId, partnerId });

	const controls = getControls({ communicationType: 'call', lead_organization_id: leadOrgId, watch });

	return (
		<div className={styles.main_container}>
			<div className={styles.form_container}>
				<Form
					controls={controls}
					control={control}
					errors={errors}
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
