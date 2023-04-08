import { Button } from '@cogoport/components';
import { useForm, SelectController } from '@cogoport/forms';
import { IcCFtick } from '@cogoport/icons-react';
import React from 'react';

import { networkBonusCriteria } from '../../../utils/constants';

import styles from './styles.module.css';

function GlobalRules() {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const handleSave = (values) => {
		console.log('values', values);
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<IcCFtick className={styles.tick_icon} />
				{' '}
				Global Rule
			</div>
			<form className={styles.flex} onSubmit={handleSubmit(handleSave)}>
				<div className={styles.content}>
					<div className={styles.bonus_criteria}>
						<div className={styles.subheading}>Network Bonus Criteria</div>
						<div className={styles.input_controller}>
							<SelectController
								control={control}
								name="bonus_criteria"
								className={styles.select_box}
								size="sm"
								rules={{ required: true }}
								options={networkBonusCriteria}
							/>
							{errors.bonus_criteria && (
								<span className={styles.error}>Required</span>
							)}
						</div>
					</div>
					<div className={styles.referree_reward}>
						<div className={styles.subheading}>Referree Reward</div>
						<div className={styles.input_controller}>
							<SelectController
								control={control}
								name="referree_reward"
								className={styles.select_box}
								size="sm"
								rules={{ required: true }}
								options={networkBonusCriteria}
							/>
							{errors.referree_reward && (
								<span className={styles.error}>Required</span>
							)}
						</div>
					</div>
				</div>
				<Button className={styles.submit_btn} type="submit">Save</Button>
			</form>
		</div>
	);
}

export default GlobalRules;
