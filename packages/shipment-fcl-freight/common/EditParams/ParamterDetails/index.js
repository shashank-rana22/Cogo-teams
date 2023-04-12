import { InputController, useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import { useImperativeHandle, forwardRef } from 'react';

import getControls from '../utils/getControls';

import styles from './styles.module.css';

const keysToShow = [
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'bl_type',
	'bls_count',
	'cargo_weight_per_container',
];

function renderValue(label, value) {
	switch (label) {
		case 'container_size': { return value.includes('HC') ? value.replace('HC', 'ft HC') : `${value}ft`; }
		default: return startCase(value);
	}
}

export default forwardRef(({ service }, ref) => {
	const { controls, defaultValues } = getControls({ service });

	const { control, formState: { errors }, trigger, getValues, handleSubmit } = useForm({ defaultValues });

	useImperativeHandle(
		ref,
		() => ({
			submitForm: handleSubmit,
			trigger,
			getValues,
		}),
		[handleSubmit, trigger, getValues],
	);

	return (
		<div>
			{keysToShow.map((key) => {
				const { name, label, ...rest } = controls.find((item) => item.name === key) || {};
				return (
					<div className={styles.form_element}>
						{name ? (
							<>
								<div className={styles.label}>
									<div>{label}</div>
									{errors[name]
                                    && <div className={styles.error}>{errors[name].message}</div>}
								</div>
								<InputController
									className={styles.value}
									name={name}
									control={control}
									{...rest}
								/>
							</>
						) : (
							<>
								<div className={styles.label}>{startCase(key)}</div>
								<div className={styles.value}>{renderValue(key, service?.[key])}</div>
							</>
						)}
					</div>
				);
			})}
		</div>
	);
});
