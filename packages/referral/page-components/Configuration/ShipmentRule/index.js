import { Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcCFtick, IcMEdit } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import useCreateRule from '../../../hooks/useCreateRule';
import useGetRules from '../../../hooks/useGetRules';
import { payloadFormat, setFormValues } from '../../../utils/payloadFormat';

import GlobalRule from './GlobalRule';
import NetworkBonus from './NetworkBonus';
import ReferralBonus from './ReferralBonus';
import RemainingBonus from './RemainingBonus';
import styles from './styles.module.css';

function ShipmentRule() {
	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		trigger,
		setValue,
		setError,
	} = useForm({
		defaultValues: {
			remaining_bonus: [{ level_bonus_type: 'fixed' }],
		},
	});

	const [apiState, setApiState] = useState('Created');
	const { data, loading : dataLoading, isEdit, setIsEdit } = useGetRules('shipment');
	const { createRule, loading } = useCreateRule(apiState);

	useEffect(() => {
		if (data && data?.data !== null) {
			setFormValues(data, setValue);
			setApiState('Updated');
		}
	}, [data, setValue]);

	const handleSave = async (values) => {
		const { remaining_bonus } = values;
		const totalPercentage = remaining_bonus.reduce((acc, curr) => acc + Number(curr.percentage), 0);
		if (totalPercentage > 100) {
			Toast.error('Total Percentage should not exceed 100');
		} else {
			const payload = payloadFormat('shipment', values);
			await createRule(payload);
			setIsEdit(true);
			setApiState('Updated');
		}
	};

	const handleEdit = () => {
		setIsEdit(false);
	};

	const formValues = watch();

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.heading}>
					<IcCFtick className={styles.tick_icon} />
					{' '}
					Shipment Rule
				</div>
				{isEdit && (
					<Button
						disabled={loading || dataLoading}
						className={styles.submit_btn}
						type="button"
						onClick={handleEdit}
					>
						<IcMEdit className={styles.edit_icon} />
						Edit
					</Button>
				)}
			</div>
			<form className={styles.flex} onSubmit={handleSubmit(handleSave)}>
				<GlobalRule isEdit={isEdit} control={control} errors={errors} formValues={formValues} />
				<div className={styles.referral_bonus}>
					<div className={styles.subheading}>Referral Bonus (for N-1)</div>
					<ReferralBonus isEdit={isEdit} control={control} errors={errors} formValues={formValues} />
				</div>
				<div className={styles.referral_bonus}>
					<div className={styles.subheading}>Network Bonus (for N-2 to Master parent Node)</div>
					<NetworkBonus
						isEdit={isEdit}
						control={control}
						errors={errors}
						formValues={formValues}
						setError={setError}
					/>
				</div>
				<div className={styles.remaining_bonus}>
					<div className={styles.subheading}>Remaining Network Bonus</div>
					<RemainingBonus
						isEdit={isEdit}
						control={control}
						formValues={formValues}
						errors={errors}
						trigger={trigger}
					/>
				</div>
				{!isEdit && (
					<div className={styles.btn_container}>
						<Button
							disabled={loading || dataLoading}
							className={styles.submit_btn}
							type="submit"
						>
							Save
						</Button>
					</div>
				)}
			</form>
		</div>
	);
}

export default ShipmentRule;
