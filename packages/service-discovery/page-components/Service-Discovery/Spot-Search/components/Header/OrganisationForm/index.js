import React from 'react';

import getElementController from '../../../configurations/getElementController';

import getFormControls from './getControls';
import styles from './styles.module.css';

function OrganisationForm({ organisation = '', setOrganisation = () => {}, control, errors, setValue }) {
	const controls = getFormControls({ organisation, setOrganisation, setValue });

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				{controls.map((controlItem) => {
					const { label, type, name } = controlItem;

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
