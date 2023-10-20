import { InputController, SelectController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

const salarytype = [
	{ label: 'Less Than 6 Lakh', value: 'e6a12dd0-7a4c-4dce-8ba8-e7375903fe38' },
	{ label: 'Greater Than 6 Lakh', value: '9f120839-0c61-45e9-828f-365e62ab80a8' },
];
const regimes = [
	{ label: 'old', value: '88902852-7534-4e02-bbb0-b49603f325a0' },
	{ label: 'new', value: '5087c6fa-1b10-4c22-acc8-b300c5350e6a' },
];
export default function TaxInput({ control = {}, errors = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.input_cont}>
				<div className={styles.header}> Base (CTC) : </div>
				<div className={styles.input_error}>
					<InputController
						control={control}
						placeholder="Type your base CTC here"
						className={styles.input}
						name="base"
						type="number"
						size="md"
						rules={{ required: { value: true, message: '*This Field is required' } }}
					/>
					{errors?.base ? <div className={styles.error}>*required</div> : null}
				</div>
			</div>
			<div className={styles.input_cont}>
				<div className={styles.header}> Salary Config : </div>
				<div className={styles.input_error}>

					<SelectController
						control={control}
						placeholder="Select Salary Configuration"
						className={styles.input}
						name="salaryConfig"
						value=""
						size="md"
						options={salarytype}
						rules={{ required: '*required' }}
					/>
					{errors?.salaryConfig ? (
						<div className={styles.error}>*required</div>
					) : null}
				</div>
			</div>
			<div className={styles.input_cont}>
				<div className={styles.header}> Tax Regime : </div>
				<div className={styles.input_error}>
					<SelectController
						control={control}
						placeholder="Select Tax Regime"
						className={styles.input}
						name="taxRegime"
						value=""
						size="md"
						options={regimes}
						rules={{ required: '*required' }}
					/>
					{errors?.taxRegime ? <div className={styles.error}>*required</div> : null}
				</div>
			</div>
		</div>
	);
}
