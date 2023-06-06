import { cl } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useMemo } from 'react';

import Item from '../../../Layout/Item';

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
	error = {},
	disableServiceEdit = false,
}) {
	const keys = useMemo(
		() => Array(controls.length).fill(null).map(() => Math.random()),
		[controls.length],
	);
	return (
		<div className={styles.container}>
			<div className={styles.item_container}>
				{controls?.map((controlItem, i) => {
					const { render, span } = controlItem || {};

					const flex = ((span || 12) / 12) * 100 - 1;

					if (controlItem?.type === 'static') {
						return (
							<div style={{ width: `${flex}%` }} className={styles.static_container} key={keys[i]}>
								{render ? render(customValues) : customValues?.[controlItem?.name]}
							</div>
						);
					}

					return (
						<Item
							{...controlItem}
							key={`${name}.${index}.${controlItem?.name}`}
							name={`${name}.${index}.${controlItem?.name}`}
							value={field?.[controlItem?.name]}
							control={control}
							source="edit_line_items"
							label={controlItem?.label}
							error={error?.[controlItem.name]}
							source="edit_line_items"
						/>
					);
				})}

				{showDeleteButton
					? (
						<IcMDelete
							width={20}
							height={20}
							onClick={!disableServiceEdit ? () => remove(index, 1) : null}
							className={
						cl`${disableServiceEdit ? styles.disableServiceEdit : styles.delete_button_container}`
}
						/>
					) : null}
			</div>
		</div>
	);
}
export default Child;
