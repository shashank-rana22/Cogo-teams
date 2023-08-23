import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import CONTACT_FORM_CONTROLS from '../../configurations/contactsForm';
import useCreateLeadUser from '../../hooks/useCreateLeadUser';
import Form from '../Form';

import styles from './styles.module.css';

function AddContactsForm({
	componentParams = {},
	onChange = () => {},
	onRemove = () => {},
	value = '',
}) {
	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
	} = useForm();

	const { lead_organization_id } = componentParams || {};

	const {
		createLeadUser, loading,
	} = useCreateLeadUser({ leadOrgId: lead_organization_id, onChange });

	if (!isEmpty(value)) {
		return (
			<div className={styles.added_container_styles}>
				<div className={styles.name_styles}>{startCase(value?.name)}</div>
				<IcMDelete onClick={onRemove} className={styles.delete_styles} />
			</div>
		);
	}

	return (
		<fieldset className={styles.outer_container}>
			<legend className={styles.legend_styles}>
				Add New Contact
			</legend>
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
		</fieldset>
	);
}
export default AddContactsForm;
