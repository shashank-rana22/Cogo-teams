import { InputController, useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import { useImperativeHandle, forwardRef } from 'react';

import getControls from '../utils/getControls';

import styles from './styles.module.css';

const keysToShow = [
	{ title: 'Container Size', key: 'container_size' },
	{ title: 'Containers Count', key: 'containers_count' },
	{ title: 'Container Type', key: 'container_type' },
	{ title: 'Commodity', key: 'commodity' },
	{ title: 'Trade Type', key: 'trade_type' },
	{ title: 'Packing Type', key: 'packing_type' },
	{ title: 'Container Weight(Mt)', key: 'cargo_weight_per_container' },
];

function renderValue(key, value) {
	switch (key) {
		case 'container_size': { return value.includes('HC') ? value.replace('HC', 'ft HC') : `${value}ft`; }
		default: return startCase(value);
	}
}

export default forwardRef(({ service }, ref) => {
	const { controls, defaultValues } = getControls({ service });

	const { control, formState: { errors }, trigger, getValues } = useForm({ defaultValues });

	useImperativeHandle(
		ref,
		() => ({
			trigger,
			getValues,
			defaultValues,
		}),
		[trigger, getValues, defaultValues],
	);

	return (
		<div>
			{keysToShow.map(({ key, title }) => {
				const { name, label, ...rest } = controls.find((item) => item.name === key) || {};
				return (
					<div key={key} className={styles.form_element}>
						{name ? (
							<>
								<div className={styles.label}>
									<div>{label}</div>
								</div>
								<div className={styles.field_container}>
									<InputController
										className={styles.value}
										name={name}
										control={control}
										{...rest}
									/>
									{errors[name]
                                    && <div className={styles.error}>{errors[name].message}</div>}
								</div>
							</>
						) : (
							<>
								<div className={styles.label}>{title}</div>
								<div className={styles.value}>{renderValue(key, service?.[key])}</div>
							</>
						)}
					</div>
				);
			})}
		</div>
	);
});
