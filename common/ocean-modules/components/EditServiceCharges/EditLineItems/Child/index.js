import { Button } from '@cogoport/components';
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
}) {
	const keys = useMemo(
		() => Array(controls.length).fill(null).map(() => Math.random()),
		[controls.length],
	);
	return (
		<div className={styles.container}>
			<div className={styles.item_container}>
				{controls?.map((control_item, i) => {
					const { render, span } = control_item || {};

					const flex = ((span || 12) / 12) * 100 - 1;

					if (control_item?.type === 'static') {
						return (
							<div style={{ width: `${flex}%` }} className={styles.static_container} key={keys[i]}>
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

				<div className={styles.delete_button_container}>
					<Button onClick={() => remove(index, 1)}>Delete</Button>
				</div>
			</div>
		</div>
	);
}
export default Child;
