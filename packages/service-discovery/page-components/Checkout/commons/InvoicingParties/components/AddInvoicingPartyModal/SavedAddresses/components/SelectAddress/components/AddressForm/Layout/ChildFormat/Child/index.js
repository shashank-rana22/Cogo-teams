import { IcMDelete } from '@cogoport/icons-react';

import getElementController from '../../../../../../../../../../../forms/getElementController';

import styles from './styles.module.css';

const ONE = 1;

function Child(props) {
	const {
		controls,
		control,
		index,
		name,
		remove,
		showDeleteButton = true,
		noDeleteButtonTill = 1,
		disabled = false,
		error = {},
	} = props;

	return (
		<div className={styles.content}>
			{controls.map((controlItem) => {
				const Element = getElementController(controlItem.type);

				if (!Element) return null;

				return (
					<div
						key={`${name}.${index}.${controlItem.name}`}
						className={styles.list}
						style={controlItem.style}
					>
						<div className={styles.label}>{controlItem.label}</div>

						<Element
							key={`${name}.${index}.${controlItem.name}`}
							control={control}
							id={`create_form_${controlItem.name}_field`}
							{...controlItem}
							name={`${name}.${index}.${controlItem.name}`}
							style={undefined}
						/>

						<div className={styles.error_message}>
							{error?.[controlItem?.name]?.message}
						</div>
					</div>
				);
			})}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<IcMDelete
					className={styles.icon}
					onClick={() => remove(index, ONE)}
				/>
			) : null}
		</div>
	);
}
export default Child;
