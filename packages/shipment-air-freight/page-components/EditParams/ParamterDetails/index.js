import { Layout } from '@cogoport/air-modules';
import { InputController, useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef } from 'react';

import getControls from '../utils/getControls';

import styles from './styles.module.css';

const PACKING_ARRAY = [
	{
		label : 'Total Weight (kgs)',
		key   : 'weight',
	},
	{
		label : 'Total Volume (cbm)',
		key   : 'volume',
	},
	{
		label : 'Total Packages Count',
		key   : 'packages_count',
	},
	{
		label : 'Chargeable Weight',
		key   : 'chargeable_weight',
	},
];

const KEYS_AIR_FREIGHT = ['packages'];

export default forwardRef(({ service }, ref) => {
	const { controls, defaultValues } = getControls({ service });

	const { control, formState: { errors }, trigger, getValues } = useForm({ defaultValues });

	const airFields = (controls || []).filter((field) => KEYS_AIR_FREIGHT.includes(field.name));

	const fields = controls.reduce((obj, cur) => ({ ...obj, [cur.name]: cur }), {});

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
			<Layout fields={airFields} control={control} errors={errors} />
			<div className={styles.wrapper}>
				{PACKING_ARRAY.map(({ key, label }) => {
					const { name } = controls.find((item) => item.name === key) || {};
					return (
						<div className={styles.form_element} key={key}>
							<div className={styles.label}>
								<div>{label}</div>
							</div>
							<InputController control={control} {...fields[key]} />
							{errors[name]
                                    && <div className={styles.error}>{errors[name].message}</div>}
						</div>
					);
				})}
			</div>
		</div>
	);
});
