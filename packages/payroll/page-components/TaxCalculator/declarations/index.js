import { Button } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

export default function TaxDeclarations({
	control = () => {},
	handleSubmit = () => {},
	onSubmit = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.declarations_heading}>Declarations : </div>
			<div className={styles.input_cont}>
				<div className={styles.header}>Professional Tax :</div>
				<InputController
					control={control}
					placeholder="Professional Tax"
					className={styles.input}
					name="professionalTax"
					value="2400"
					size="md"
					disabled
				/>
			</div>

			<div className={styles.input_cont}>
				<div className={styles.header}>80C : </div>
				<InputController
					control={control}
					placeholder="Type 80C here"
					className={styles.input}
					name="EightyC"
					type="number"
					size="md"
				/>
			</div>
			<div className={styles.input_cont}>
				<div className={styles.header}>HRA : </div>
				<InputController
					control={control}
					placeholder="Type HRA here"
					className={styles.input}
					name="hra"
					type="number"
					size="md"
				/>
			</div>
			<div className={styles.input_cont}>
				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(onSubmit)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}
