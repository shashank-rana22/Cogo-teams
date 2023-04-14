import { Button } from '@cogoport/components';
import { useForm, InputController } from '@cogoport/forms';
import { IcCFtick, IcCCogoCoin, IcMEdit } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import useCreateRule from '../../../hooks/useCreateRule';
import useGetRules from '../../../hooks/useGetRules';

import styles from './styles.module.css';

function KYCRule() {
	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm();

	const [apiState, setApiState] = useState('Created');
	const { data, loading : getDataLoading, isEdit, setIsEdit } = useGetRules('kyc_registration');
	const { createRule, loading } = useCreateRule(apiState);

	useEffect(() => {
		const { overall_limit } = data?.data || {};
		if (overall_limit) {
			setValue('overall_limit', overall_limit);
			setApiState('Updated');
		}
	}, [data, setValue]);

	const handleSave = async (values, e) => {
		e.stopPropagation();
		await createRule({ ...values, total_cogopoints: Number(values.total_cogopoints), event: 'kyc_registration' });
		setIsEdit(true);
		setApiState('Updated');
	};

	const handleEdit = () => {
		setIsEdit(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<IcCFtick className={styles.tick_icon} />
				{' '}
				Kyc Registration rule
			</div>
			<div className={styles.flex}>
				<div className={styles.content}>
					<div className={styles.text}>
						Reward refree with
					</div>
					<div className={styles.input_controller}>
						<InputController
							control={control}
							name="total_cogopoints"
							className={styles.input_box}
							size="sm"
							type="number"
							disabled={isEdit}
							placeholder="Enter cogopoints"
							rules={{ required: true }}
							prefix={<IcCCogoCoin />}
						/>
						{errors.total_cogopoints && (
							<span className={styles.error}>Required</span>
						)}
					</div>
					<div className={styles.text}>
						Cogopoints on registering for KYC.
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
							disabled={loading || getDataLoading}
							className={styles.submit_btn}
							onClick={handleSubmit(handleSave)}
						>
							Save
						</Button>
					)}
			</div>
		</div>
	);
}

export default KYCRule;
