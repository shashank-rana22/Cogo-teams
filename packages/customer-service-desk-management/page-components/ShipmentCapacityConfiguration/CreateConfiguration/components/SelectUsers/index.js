import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import getElementController from '../../../../../configurations/getElementController';

import controls from './controls';
import styles from './styles.module.css';

function SelectUsers({
	// setActiveItem = () => {},
	createCsdConfig = () => {},
}) {
	const { control, formState:{ errors }, handleSubmit } = useForm();

	return (
		<div className={styles.container}>
			<div className={styles.form_container}>
				{controls.map((controlItem) => {
					const { type, label, name, showAstrick } = controlItem || {};

					const Element = getElementController(type);

					return (
						<div className={styles.control_item} key={name}>
							<div className={styles.label}>
								{label}
								{showAstrick && <sup className={styles.sup}>*</sup>}
							</div>

							<div>
								<Element
									control={control}
									{...controlItem}
								/>
								{errors[name] && <div className={styles.error_msg}>This is required</div>}
							</div>
						</div>
					);
				})}

			</div>
			<Button
				size="md"
				themeType="primary"
				className={styles.btn}
				onClick={handleSubmit((values) => createCsdConfig({ values }))}
			>
				Save

			</Button>
		</div>

	);
}

export default SelectUsers;
