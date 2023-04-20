import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import controls from './controls';
import Item from './Item';
// import styles from './styles.module.css';

function Retest() {
	console.log('controls', controls);
	const {
		control, formState: { errors }, watch,
	} = useForm();

	const x = watch('users_list');

	const newControls = [];

	useEffect(() => {
		if (x === 'custom') {
			controls.map((item) => {
				if (item.name === 'channels') {
					const newitem = { ...item, show: true };
					newControls.push(newitem);
				} else {
					newControls.push(item);
				}

				return null;
			});
		}
	}, [x, newControls]);

	console.log('x', newControls);
	return (
		<>

			{(controls || []).map((controlItem) => {
				const { label, show } = controlItem;
				return (
                    
					<Item
						{...controlItem}
						control={control}
						error={errors[controlItem?.name]}
					/>}
				);
			})}
		</>
	);
}

export default Retest;
