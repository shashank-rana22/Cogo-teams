import { Button } from '@cogoport/components';
import { useForm, SelectController } from '@cogoport/forms';
import { IcCFtick, IcMEdit } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import useCreateRule from '../../../hooks/useCreateRule';
import useGetRules from '../../../hooks/useGetRules';
import { networkBonusCriteria } from '../../../utils/constants';

import Reward from './Reward';
import styles from './styles.module.css';

function GlobalRules() {
	const [apiState, setApiState] = useState('Created');
	const { data, loading : getDataLoading, isEdit, setIsEdit } = useGetRules('shipment');
	const { createRule, loading } = useCreateRule(apiState, setApiState, setIsEdit);
	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm();

	const handleBonusCriteria = (values) => {
		createRule({
			...values,
			event: 'shipment',
		});
	};

	const handleEdit = () => {
		setIsEdit(false);
	};

	useEffect(() => {
		const { threshold_transacting_user } = data?.data || {};
		if (threshold_transacting_user) {
			setValue('threshold_transacting_user', threshold_transacting_user);
			setApiState('Updated');
		}
	}, [data, setValue]);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<IcCFtick className={styles.tick_icon} />
				{' '}
				Global Rule
			</div>
			<div className={styles.flex}>
				<div className={styles.content}>
					<div className={styles.bonus_criteria}>
						<div className={styles.subheading}>Network Bonus Criteria</div>
						<div className={styles.input_controller}>
							<SelectController
								control={control}
								name="threshold_transacting_user"
								className={styles.select_box}
								size="sm"
								disabled={isEdit}
								rules={{ required: true }}
								options={networkBonusCriteria}
							/>
							{errors.threshold_transacting_user && (
								<span className={styles.error}>Required</span>
							)}
						</div>
					</div>
				</div>
				{isEdit
					? (
						<Button
							disabled={loading || getDataLoading}
							className={styles.submit_btn}
							onClick={handleEdit}
						>
							<IcMEdit className={styles.edit_icon} />
							Edit
						</Button>
					)
					: (
						<Button
							className={styles.submit_btn}
							disabled={loading || getDataLoading}
							onClick={handleSubmit(handleBonusCriteria)}
						>
							Save
						</Button>
					)}
			</div>
			<Reward />
		</div>
	);
}

export default GlobalRules;
