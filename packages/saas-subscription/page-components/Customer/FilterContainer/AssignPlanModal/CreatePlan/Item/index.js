import { cl } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../../../../../utils/getFieldController';

import styles from './styles.module.css';

const getKey = ({ name, index, getValues }) => {
	if (name === 'addonName') {
		return getValues(`addons[${index}]`);
	}
	return name;
};

function Item({
	info, controls, control, remove, errors, index, fields = [], getValues,
}) {
	return (
		<>
			{controls.map((field) => {
				const Element = getFieldController(field?.type);
				return (
					<div
						key={`${field?.name}_${info?.id}`}
						style={{ width: field?.width }}
						className={cl`${styles.col}
						${errors?.[index]?.[field?.name] && styles.error} ${styles[field?.className]}`}
					>
						{errors?.[index]?.[field?.name] && (
									<p className={styles.error}>
										{errors?.[index]?.[field?.name]?.message || errors?.[index]?.[field?.name]?.type}
									</p>
								)}
						<Element
							{...field}
							control={control}
							value={info[field?.name]}
							name={`addons.${index}.${field?.name}`}
							key={getKey({ name: field?.name, index, getValues })}
						/>
					</div>
				);
			})}
			{fields.length > 1 && (
				<div
					className={styles.icon_container}
					role="presentation"
				>
					<IcMDelete
						fill="#e63946"
						className={styles.delete_icon}
						width={20}
						height={20}
						onClick={() => remove(index, 1)}
					/>
				</div>
			)}
		</>
	);
}

export default Item;
