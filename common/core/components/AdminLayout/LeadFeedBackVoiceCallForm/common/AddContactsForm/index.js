import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import CONTACT_FORM_CONTROLS from '../../configurations/contactsForm';
import useCreateLeadUser from '../../hooks/useCreateLeadUser';
import Form from '../Form';

import styles from './styles.module.css';

function AddContactsForm({ componentParams = {}, onChange = () => {}, onRemove = () => {}, value = '' }) {
	console.log('value', value);
	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
	} = useForm();

	const { lead_organization_id } = componentParams || {};

	const {
		createLeadUser, loading,
	} = useCreateLeadUser({ leadOrgId: lead_organization_id, onChange });

	if (value) {
		return (
			<div>
				{value}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div>head</div>
			<div className={styles.form_div}>
				<Form
					control={control}
					errors={errors}
					controls={CONTACT_FORM_CONTROLS}
				/>
			</div>
			<div className={styles.footer}>
				<Button
					size="sm"
					themeType="tertiary"
					disabled={loading}
					onClick={onRemove}
				>
					cancel
				</Button>
				<Button
					size="sm"
					themeType="accent"
					className={styles.button_margin}
					loading={loading}
					onClick={handleSubmit(createLeadUser)}
				>
					Add Contact
				</Button>
			</div>
		</div>
	);
}
export default AddContactsForm;
