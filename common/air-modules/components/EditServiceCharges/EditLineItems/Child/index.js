import { useMemo } from 'react';

import Item from '../../../Layout/Item';

import styles from './styles.module.css';

const TOTAL_SPAN = 12;
const FLEX_HUNDRED = 100;
const FLEX_ONE = 1;

function Child({
	control,
	controls = [],
	index,
	name = '',
	field = {},
	customValues = {},
	error = {},
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

					const flex = ((span || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED - FLEX_ONE;

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
							label={control_item?.label}
							error={error?.[control_item.name]}
							source="edit_line_items"
						/>
					);
				})}

			</div>
		</div>
	);
}
export default Child;
