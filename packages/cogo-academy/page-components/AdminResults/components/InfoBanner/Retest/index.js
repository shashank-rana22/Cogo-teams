import { isEmpty } from '@cogoport/utils';

import controls from './controls';
import Item from './Item';
// import styles from './styles.module.css';

function Retest({ watch, control, setValue, errors }) {
	const watchUsersList = watch('users_list');

	let newControls = [];

	if (watchUsersList === 'custom') {
		setValue('channels', '');
		controls.forEach((item) => {
			if (item.name === 'channels') {
				const newitem = { ...item, show: true };
				newControls.push(newitem);
			} else {
				newControls.push(item);
			}
		});
	} else newControls = controls;

	return (
		<>

			{(newControls || []).map((controlItem) => {
				const { show } = controlItem;
				if (!isEmpty(show) && !show) {
					return null;
				}
				return (

					<Item
						{...controlItem}
						control={control}
						error={errors[controlItem?.name]}
					/>
				);
			})}
		</>
	);
}

export default Retest;
