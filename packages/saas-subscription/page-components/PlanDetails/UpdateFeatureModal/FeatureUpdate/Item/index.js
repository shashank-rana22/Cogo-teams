import { cl } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../../../../utils/getFieldController';

import styles from './styles.module.css';

const THRESHOLD_DELETE = 1;

function Item({
	info, controls, control, remove, errors, index, fields = [], name,
}) {
	return (
		<>
			{controls.map((field) => {
				const Element = getFieldController(field?.type);
				console.log(field, 'field');
				return (
					<div
						key={`${field?.name}_${info?.id}`}
						style={{ width: field?.width }}
						className={cl`${styles.col}
						${errors?.[index]?.[field?.name] && styles.error} ${styles[field?.className]}`}
					>
						<Element
							{...field}
							control={control}
							value={info[field?.name]}
							name={`${name}.${index}.${field?.name}`}
							key={`${name}.${index}.${field?.name}`}
						/>
					</div>
				);
			})}
			{fields.length > THRESHOLD_DELETE && (
				<div
					className={styles.icon_container}
					role="presentation"
				>
					<IcMDelete
						fill="#e63946"
						className={styles.delete_icon}
						width={20}
						height={20}
						onClick={() => remove(index, THRESHOLD_DELETE)}
					/>
				</div>
			)}
		</>
	);
}

export default Item;
