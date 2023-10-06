import { cl } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../getFieldController';

import styles from './styles.module.css';

const ONE = 1;

function Child(props) {
	const {
		controls = [],
		control,
		index = 0,
		name = '',
		remove = () => {},
		showDeleteButton = true,
		noDeleteButtonTill = 0,
		disabled = false,
		error = {},

	} = props;

	return (
		<div className={styles.content}>
			{controls.map((controlItem) => {
				const Element = getFieldController(controlItem.type);

				if (!Element) return null;

				return (
					<div className={styles.list} key={controlItem.name}>
						<div className={styles.label}>{controlItem.label}</div>

						<Element
							key={`${name}.${index}.${controlItem.name}`}
							control={control}
							id={`create_form_${controlItem.name}_field`}
							{...controlItem}
							name={`${name}.${index}.${controlItem.name}`}
						/>

						<div className={styles.error_message}>
							{error?.[controlItem.name]?.message}
						</div>
					</div>
				);
			})}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<IcMDelete
					className={cl`form-fieldArray-${name}-remove ${styles.icon}`}
					onClick={() => remove(index, ONE)}
				/>
			) : null}

		</div>
	);
}
export default Child;
