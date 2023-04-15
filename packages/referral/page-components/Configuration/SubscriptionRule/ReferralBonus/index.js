import { InputController, SelectController } from '@cogoport/forms';
import { IcCCogoCoin } from '@cogoport/icons-react';
import React from 'react';

import { incentiveOptions, totalIncentive } from '../../../../utils/constants';

import styles from './styles.module.css';

function ReferralBonus({ control, errors, formValues, isEdit }) {
	const {
		referral_bonus_total_incentive_type,
		referral_bonus_min_incentive_type, referral_bonus_max_incentive_type,
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
						name="referral_bonus_total_incentive_type"
						className={styles.select_box}
						size="sm"
						disabled
						value="percentage"
						placeholder="Enter value"
						rules={{ required: true }}
						options={totalIncentive}
					/>
					{errors.referral_bonus_total_incentive_type && (
						<span className={styles.error}>Required</span>
					)}
				</div>
				{referral_bonus_total_incentive_type !== 'none' && (
					<div className={styles.input_controller}>
						<InputController
							control={control}
							name="referral_bonus_total_incentive_value"
							className={styles.input_box}
							size="sm"
							disabled={isEdit}
							type="number"
							placeholder="Enter value"
							rules={{ required: true }}
						/>
						{errors.referral_bonus_total_incentive_value && (
							<span className={styles.error}>Required</span>
						)}
					</div>
				)}
			</div>
			<div className={`${styles.content} ${styles.mt_12}`}>
				<div className={styles.text}>
					minimum incentive value
				</div>
				<div className={styles.input_controller}>
					<SelectController
						control={control}
						name="referral_bonus_min_incentive_type"
						className={styles.select_box}
						size="sm"
						disabled
						value="fixed"
						rules={{ required: true }}
						options={incentiveOptions}
					/>
					{errors.referral_bonus_min_incentive_type && (
						<span className={styles.error}>Required</span>
					)}
				</div>
				{referral_bonus_min_incentive_type !== 'none' && (
					<div className={styles.input_controller}>
						<InputController
							control={control}
							name="referral_bonus_min_incentive_value"
							className={styles.input_box}
							size="sm"
							disabled={isEdit}
							type="number"
							placeholder="Enter Cogopoints"
							rules={{ required: true }}
							prefix={<IcCCogoCoin />}
						/>
						{errors.referral_bonus_min_incentive_value && (
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
						name="referral_bonus_max_incentive_type"
						className={styles.select_box}
						size="sm"
						disabled
						value="fixed"
						rules={{ required: true }}
						options={incentiveOptions}
					/>
					{errors.referral_bonus_max_incentive_type && (
						<span className={styles.error}>Required</span>
					)}
				</div>
				{referral_bonus_max_incentive_type !== 'none' && (
					<div className={styles.input_controller}>
						<InputController
							control={control}
							name="referral_bonus_max_incentive_value"
							className={styles.input_box}
							size="sm"
							disabled={isEdit}
							type="number"
							placeholder="Enter Cogopoints"
							rules={{ required: true }}
							prefix={<IcCCogoCoin />}
						/>
						{errors.referral_bonus_max_incentive_value && (
							<span className={styles.error}>Required</span>
						)}
					</div>
				)}
			</div>
		</>
	);
}

export default ReferralBonus;
