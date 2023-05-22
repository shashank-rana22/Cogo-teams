import { useForm } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import getElementController from '../../../configs/getElementController';

import styles from './styles.module.css';

function Child(props) {
	const { formState: { errors } } = useForm();

	const {
		controls, control, index, remove = () => {},
	} = props;

	return (

		<div className={styles.whole_container}>
			<div className={styles.container}>
				{controls?.map((controlItem) => {
					const { type, label, name: controlName } = controlItem || {};
					const Element = getElementController(type);

					return (
						<div key={controlName} className={styles.control_container}>
							<div className={styles.label}>
								{label}
								<sup className={styles.sup}>*</sup>
							</div>

							<div className={styles.control}>
								<Element
									control={control}
									{...controlItem}
									className={styles[`element_${controlName}`]}
								/>

								{errors[controlName]?.message
									? <div className={styles.error_msg}>{errors[controlName]?.message}</div> : null}
							</div>
						</div>
					);
				})}
			</div>

			<IcMDelete
				className={styles.remove}
				onClick={() => remove(index, 1)}
				style={{ cursor: 'pointer' }}
			/>

		</div>

	);
}

export default Child;
