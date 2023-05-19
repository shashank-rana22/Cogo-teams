import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { v4 as uuid } from 'uuid';

import Item from '../../../Item';

import styles from './styles.module.css';

function Child({
	control,
	controls = [],
	index,
	name = '',
	field = {},
	remove = () => {},
	customValues = {},
	showDeleteButton = true,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.item_container}>
				{controls?.map((control_item) => {
					const { render, span } = control_item || {};

					const flex = ((span || 12) / 12) * 100 - 1;

					if (control_item?.type === 'static') {
						return (
							<div key={uuid()} style={{ width: `${flex}%` }} className={styles.static_container}>
								{render ? render(customValues) : customValues?.[control_item?.name]}
							</div>
						);
					}

					return (
						<Item
							{...control_item}
							key={`${name}.${index}.${control_item?.name}`}
							name={`${name}.${index}.${control_item?.name}`}
							value={field?.[control_item?.name]}
							control={control}
							label={null}
						/>
					);
				})}

				{showDeleteButton
					? (
						<div className={styles.delete_button_container}>
							<IcMDelete width={20} height={20} onClick={() => remove(index, 1)} />
						</div>
					) : null}
			</div>
		</div>
	);
}
export default Child;
