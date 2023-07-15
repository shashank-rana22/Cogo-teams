import { IcMDelete } from '@cogoport/icons-react';

import getFieldController from '../../../../../../../configs/getElementController';
import getControls from '../../controls';

import styles from './styles.module.css';

const REMOVE_CHILD_INDEX = 1;

function Child(props) {
	const {
		control,
		index,
		name,
		remove,
		showDeleteButton = true,
		noDeleteButtonTill = 0,
		disabled = false,
		error = {},
		watch = () => {},
	} = props;

	const WATCH_VALUES = watch();
	const controlItems = getControls(WATCH_VALUES?.single_item[index]);
	const { controls } = controlItems;

	return (
		<div className={styles.content}>
			{controls.map((controlItem) => {
				if (!controlItem.type) return null;
				const Element = getFieldController(controlItem.type);

				return (
					<div className={styles.list} key={controlItem.name}>
						<div className={styles.label}>{controlItem.label}</div>

						<div className={styles.controller}>
							<Element
								key={`${name}.${index}.${controlItem.name}`}
								control={control}
								id={`create_form_${controlItem.name}_field`}
								{...controlItem}
								name={`${name}.${index}.${controlItem.name}`}
							/>
						</div>

						<div className={styles.error_message}>
							{error?.[controlItem?.name]?.message}
						</div>
					</div>
				);
			})}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<IcMDelete
					className={`form-fieldArray-${name}-remove`}
					onClick={() => remove(index, REMOVE_CHILD_INDEX)}
					style={{
						height    : '60px',
						width     : '60px',
						marginTop : '24px',
						cursor    : 'pointer',
					}}
				/>
			) : null}
		</div>
	);
}
export default Child;
