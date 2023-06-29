import { IcMDelete } from '@cogoport/icons-react';

import Item from '../../../Layout/Item';

import styles from './styles.module.css';

const TOTAL_SPAN = 12;
const FLEX_HUNDRED = 100;
const FLEX_ONE = 1;
const FIRST_INDEX = 1;

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
}) {
	return (
		<div className={styles.container}>
			<div className={styles.item_container}>
				{controls?.map((control_item) => {
					const { render, span } = control_item || {};

					const flex = ((span || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED - FLEX_ONE;

					if (control_item?.type === 'static') {
						return (
							<div
								style={{ width: `${flex}%` }}
								className={styles.static_container}
								key={control_item?.name}
							>
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
				{showDeleteButton ? (
					<div className={styles.delete_button_container}>
						<IcMDelete width={20} height={20} onClick={() => remove(index, FIRST_INDEX)} />
					</div>
				) : null}

			</div>
		</div>
	);
}
export default Child;
