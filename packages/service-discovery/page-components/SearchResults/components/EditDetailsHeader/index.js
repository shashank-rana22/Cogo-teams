import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import getElementController from '../../../../configs/getElementController';
import getLocationInfo from '../../utils/locations-search';

import getFormControls from './controls';
import styles from './styles.module.css';

function EditDetailsHeader({ data = {}, ...rest }) {
	const { control, formState:{ errors }, setValue } = useForm();

	const {
		importer_exporter_id = '',
		importer_exporter_branch_id = '',
		user_id = '',
		service_type = '',
	} = data || {};

	const {
		origin:{ id: origin_id = '' },
		destination:{ id: destination_id = '' },
	} = getLocationInfo(data, {}, 'search_type');

	const [organization, setOrganization] = useState(rest.organization || {
		organization_id        : importer_exporter_id,
		organization_branch_id : importer_exporter_branch_id,
		user_id,
	});

	const controls = getFormControls({
		organization,
		setOrganization,
		setValue,
		mode: service_type,
		origin_id,
		destination_id,
	});

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

			<Button size="lg" themeType="accent">Apply</Button>
		</div>
	);
}

export default EditDetailsHeader;
