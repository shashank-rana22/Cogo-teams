import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

function Child(props) {
	const {
		controls = [],
		control,
		index,
		name,
		remove,
		showDeleteButton = true,
		noDeleteButtonTill = 0,
		disabled = false,
		error = {},
		...rest
	} = props;

	return (
		<div className={styles.content}>
			{controls.map((controlItem) => {
				const Element = getFieldController(controlItem?.type);

				if (!Element) return null;

				return (
					<div key={controlItem?.name} className={styles.list}>
						<div className={styles.label}>{controlItem?.label}</div>

						<Element
							{...rest}
							key={`${name}.${index}.${controlItem?.name}`}
							control={control}
							id={`create_form_${controlItem?.name}_field`}
							{...controlItem}
							name={`${name}.${index}.${controlItem?.name}`}
						/>

						<div className={styles.error_message}>
							{error?.[controlItem?.name]?.message}
						</div>
					</div>
				);
			})}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<IcMDelete
					className={`form-fieldArray-${name}-remove`}
					onClick={() => remove(index, FIRST_INDEX)}
					style={{
						height : '20px',
						width  : '20px',
						cursor : 'pointer',
					}}
				/>
			) : null}
		</div>
	);
}
export default Child;
