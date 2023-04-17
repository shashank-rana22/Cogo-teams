import { Button } from '@cogoport/components';
import { useForm, SelectController } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncListPromotions } from '@cogoport/forms/utils/getAsyncFields';
import { IcMEdit } from '@cogoport/icons-react';
import { merge } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useCreateRule from '../../../../hooks/useCreateRule';
import useGetRules from '../../../../hooks/useGetRules';

import styles from './styles.module.css';

function Reward() {
	const promotions = useGetAsyncOptions(merge(asyncListPromotions()));
	const [apiState, setApiState] = useState('Created');
	const { data, loading : getDataLoading, isEdit, setIsEdit } = useGetRules('kyc_verified');
	const { createRule, loading } = useCreateRule(apiState, setApiState, setIsEdit);

	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm();

	const handleReward = (values) => {
		createRule({
			...values,
			referee_reward : { ...values },
			event          : 'kyc_verified',
		});
	};

	const handleEdit = () => {
		setIsEdit(false);
	};

	useEffect(() => {
		const { referee_reward } = data?.data || {};
		if (referee_reward) {
			setValue('promotion_id', referee_reward?.promotion_id);
			setApiState('Updated');
		}
	}, [data, setValue]);

	return (
		<div className={styles.flex}>
			<div className={styles.content}>
				<div className={styles.referree_reward}>
					<div className={styles.subheading}>Referree Reward</div>
					<div className={styles.input_controller}>
						<SelectController
							control={control}
							name="promotion_id"
							className={styles.select_box}
							size="sm"
							disabled={isEdit}
							rules={{ required: true }}
							{...promotions}
						/>
						{errors.promotion_id && (
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
						onClick={handleSubmit(handleReward)}
						type="submit"
						disabled={loading || getDataLoading}
					>
						Save
					</Button>
				)}
		</div>
	);
}

export default Reward;
