import React from 'react';

import getElementController from '../../../../../../configs/getElementController';

import getFormControls from './getControls';
import styles from './styles.module.css';

function OrganisationForm({
	organization = '',
	setOrganization = () => {},
	control,
	errors,
	setValue,
	style = {},
	organization_id,
	user_id,
	...rest
}) {
	const controls = getFormControls({ organization, setOrganization, setValue });

	const getValue = (name) => {
		if (!organization_id) return null;
		if (name === 'organization_id') {
			return organization_id;
		}
		if (name === 'user_id') {
			if (organization_id) return user_id;
		}
		return null;
	};

	return (
		<div className={styles.container} style={style}>
			<div className={styles.form}>
				{controls.map((controlItem) => {
					const { label, type, name } = controlItem;

					const value = getValue(name);

					const Element = getElementController(type);

					return (
						<div key={`${name}_${label}`} className={styles.form_item}>
							<div className={styles.label}>
								{label || ''}
								{' '}
								{controlItem?.rules ? (
									<div className={styles.required_mark}>*</div>
								) : null}
							</div>

							<Element
								{...controlItem}
								name={name}
								label={label}
								control={control}
								value={value}
								disabled={rest?.disabled}
							/>

							{errors[name] && (
								<div className={styles.error_message}>
									{errors[name]?.message}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default OrganisationForm;
