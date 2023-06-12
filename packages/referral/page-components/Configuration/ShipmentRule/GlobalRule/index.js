import { InputController, SelectController, MultiselectController } from '@cogoport/forms';
import { IcCCogoCoin } from '@cogoport/icons-react';
import React from 'react';

import { OVERALL_LIMIT, SHIPMENT_TYPE } from '../../../../constants/configuration-constant';

import styles from './styles.module.css';

function GlobalRule({ control, errors, formValues, isEdit }) {
	const { overall_limit_type } = formValues || {};

	return (
		<div className={styles.form_content}>
			<div className={styles.content}>
				<div className={styles.text}>
					Overall Limit
				</div>
				<div className={styles.input_controller}>
					<SelectController
						control={control}
						name="overall_limit_type"
						className={styles.select_box}
						size="sm"
						value="percentage"
						disabled={isEdit}
						placeholder="Enter cogopoints"
						rules={{ required: true }}
						options={OVERALL_LIMIT}
					/>
					{errors?.overall_limit_type && (
						<span className={styles.error}>Required</span>
					)}
				</div>
				{overall_limit_type !== 'none' && (
					<div className={styles.input_controller}>
						<InputController
							control={control}
							name="overall_limit"
							className={styles.input_box}
							size="sm"
							disabled={isEdit}
							type="number"
							placeholder={`Enter ${overall_limit_type === 'fixed' ? 'Cogopoints' : 'Value'}`}
							rules={{ required: true }}
							prefix={overall_limit_type === 'fixed' && <IcCCogoCoin />}
						/>
						{errors?.overall_limit && (
							<span className={styles.error}>Required</span>
						)}
					</div>
				)}
				<div className={styles.text}>
					shipment type
				</div>
				<div className={styles.input_controller}>
					<MultiselectController
						control={control}
						name="event_types"
						className={styles.input_box}
						size="sm"
						disabled={isEdit}
						rules={{ required: true }}
						options={SHIPMENT_TYPE}
					/>
					{errors?.event_types && (
						<span className={styles.error}>Required</span>
					)}
				</div>
				<div className={styles.text}>
					minimum shipment value
				</div>
				<div className={styles.input_controller}>
					<InputController
						control={control}
						name="event_threshold_limit"
						className={styles.input_box}
						size="sm"
						disabled={isEdit}
						type="number"
						placeholder="Enter value"
					/>
					{errors?.event_threshold_limit && (
						<span className={styles.error}>Required</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default GlobalRule;
