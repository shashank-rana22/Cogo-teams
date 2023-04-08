import { InputController, SelectController, CheckboxController } from '@cogoport/forms';
import { IcCCogoCoin } from '@cogoport/icons-react';
import React from 'react';

import { incentiveOptions, totalIncentive } from '../../../../utils/constants';

import styles from './styles.module.css';

function NetworkBonus({ errors, control, formValues, isEdit }) {
	const {
		network_bonus_max_incentive_type,
		network_bonus_total_incentive_type, network_bonus_min_incentive_type, exceed_limit,
	} = formValues || {};

	return (
		<>
			<div className={styles.content}>
				<div className={styles.text}>
					Total incentive
				</div>
				<div className={styles.input_controller}>
					<SelectController
						control={control}
						name="network_bonus_total_incentive_type"
						className={styles.select_box}
						size="sm"
						disabled={isEdit}
						value="percentage"
						placeholder="Enter value"
						rules={{ required: true }}
						options={totalIncentive}
					/>
					{errors.network_bonus_total_incentive_type && (
						<span className={styles.error}>Required</span>
					)}
				</div>
				{network_bonus_total_incentive_type !== 'none' && (
					<>
						<div className={styles.input_controller}>
							<InputController
								control={control}
								name="exceed_allowed"
								className={styles.input_box}
								size="sm"
								type="number"
								disabled={isEdit}
								max={exceed_limit ? 100 : 8}
								min={0}
								placeholder="Enter value"
								rules={{ required: true }}
							/>
							{errors.exceed_allowed && (
								<span className={styles.error}>Required</span>
							)}
						</div>
						<CheckboxController
							control={control}
							name="exceed_limit"
							disabled={isEdit}
							type="checkbox"
							label="exceed % allowed"
						/>
					</>
				)}
			</div>
			<div className={`${styles.content} ${styles.mt_12}`}>
				<div className={styles.text}>
					minimum incentive value
				</div>
				<div className={styles.input_controller}>
					<SelectController
						control={control}
						disabled={isEdit}
						name="network_bonus_min_incentive_type"
						className={styles.select_box}
						size="sm"
						value="fixed"
						rules={{ required: true }}
						options={incentiveOptions}
					/>
					{errors.network_bonus_min_incentive_type && (
						<span className={styles.error}>Required</span>
					)}
				</div>
				{network_bonus_min_incentive_type !== 'none' && (
					<div className={styles.input_controller}>
						<InputController
							control={control}
							name="network_bonus_min_incentive_value"
							className={styles.input_box}
							size="sm"
							disabled={isEdit}
							type="number"
							placeholder="Enter Cogopoints"
							rules={{ required: true }}
							prefix={<IcCCogoCoin />}
						/>
						{errors.network_bonus_min_incentive_value && (
							<span className={styles.error}>Required</span>
						)}
					</div>
				)}
				<div className={styles.text}>
					maximum incentive value
				</div>
				<div className={styles.input_controller}>
					<SelectController
						control={control}
						name="network_bonus_max_incentive_type"
						className={styles.select_box}
						size="sm"
						disabled={isEdit}
						value="fixed"
						rules={{ required: true }}
						options={incentiveOptions}
					/>
					{errors.network_bonus_max_incentive_type && (
						<span className={styles.error}>Required</span>
					)}
				</div>
				{network_bonus_max_incentive_type !== 'none' && (
					<div className={styles.input_controller}>
						<InputController
							control={control}
							name="network_bonus_max_incentive_value"
							className={styles.input_box}
							size="sm"
							type="number"
							disabled={isEdit}
							placeholder="Enter Cogopoints"
							rules={{ required: true }}
							prefix={<IcCCogoCoin />}
						/>
						{errors.network_bonus_max_incentive_value && (
							<span className={styles.error}>Required</span>
						)}
					</div>
				)}
			</div>
		</>
	);
}

export default NetworkBonus;
