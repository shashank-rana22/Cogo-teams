import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../getFieldController';

import styles from './styles.module.css';

function Child(props) {
	const {
		controls,
		control,
		index,
		name,
		remove,
		showDeleteButton = true,
		noDeleteButtonTill = 0,
		disabled = false,
		error = {},
	} = props;

	return (
		<div className={styles.whole_container}>
			<div className={styles.container}>
				{controls.map((controlItem) => {
					const Element = getFieldController(controlItem.type);

					if (!Element) return null;

					return (
						<div key={`${name}.${index}.${controlItem.name}`} className={styles.control_container}>
							<div className={styles.label}>
								{controlItem.label}
								<sup className={styles.sup}>*</sup>
							</div>

							<div className={styles.control}>
								<Element
									key={`${name}.${index}.${controlItem.name}`}
									control={control}
									id={`create_form_${controlItem.name}_field`}
									{...controlItem}
									name={`${name}.${index}.${controlItem.name}`}
									className={styles[`element_${controlItem.name}`]}
								/>

								<div className={styles.error_message}>
									{error?.[controlItem?.name]?.message}
								</div>
							</div>
						</div>
					);
				})}

				{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
					<IcMDelete
						className={`form-fieldArray-${name}-remove`}
						onClick={() => remove(index, 1)}
						style={{
							height    : '20px',
							width     : '20px',
							marginTop : '24px',
							cursor    : 'pointer',
						}}
					/>
				) : null}
			</div>
		</div>
	);
}
export default Child;
