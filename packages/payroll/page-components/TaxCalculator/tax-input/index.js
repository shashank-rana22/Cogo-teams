import { InputController, SelectController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

const salarytype = [
	{ label: 'Less Than 6 Lakh', value: GLOBAL_CONSTANTS.less_lpa },
	{ label: 'Greater Than 6 Lakh', value: GLOBAL_CONSTANTS.great_lpa },
];
const regimes = [
	{ label: 'old', value: GLOBAL_CONSTANTS.old_regime },
	{ label: 'new', value: GLOBAL_CONSTANTS.new_regime },
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
