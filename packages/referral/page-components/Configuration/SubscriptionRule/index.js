import { Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcCFtick, IcMEdit } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import useCreateReferralConfig from '../../../hooks/useCreateReferralConfig';
import { payloadFormat } from '../../../utils/payLoadFormat';
import { setFormValues } from '../../../utils/setFormValueFormat';

import GlobalRule from './GlobalRule';
import NetworkBonus from './NetworkBonus';
import NetworkBonusCriteria from './NetworkBonusCriteria';
import ReferralBonus from './ReferralBonus';
import RemainingBonus from './RemainingBonus';
import styles from './styles.module.css';

const DEFAULT_VALUE = 0;
const DEFAULT_PERCENTAGE_VALUE = 100;

function SubscriptionRule({ subscriptionData = {}, dataLoading = false }) {
	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		trigger,
		setValue,
	} = useForm({
		defaultValues: {
			remaining_bonus: [{ type: 'fixed' }],
		},
	});

	const [apiState, setApiState] = useState('Created');
	const [isEdit, setIsEdit] = useState(false);

	const { createRule = () => {}, loading = false } = useCreateReferralConfig({ apiState, setApiState, setIsEdit });

	useEffect(() => {
		if (subscriptionData && subscriptionData?.data !== null) {
			setFormValues(subscriptionData, setValue);
			setIsEdit(true);
			setApiState('Updated');
		}
	}, [subscriptionData, setValue]);

	const handleSave = async (values) => {
		const { remaining_bonus } = values;
		const totalPercentage = remaining_bonus.reduce((acc, curr) => acc + Number(curr.percentage), DEFAULT_VALUE);
		if (totalPercentage > DEFAULT_PERCENTAGE_VALUE) {
			Toast.error('Total Percentage should not exceed 100');
		} else {
			const payload = payloadFormat('subscription', values);
			createRule(payload);
		}
	};

	const handleEdit = () => {
		setIsEdit(false);
	};

	const formValues = watch();

	const commonProps = {
		isEdit,
		control,
		formValues,
		errors,
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.heading}>
					<IcCFtick className={styles.tick_icon} />
					Subscription Rule
				</div>
				{isEdit && (
					<Button
						disabled={loading || dataLoading}
						className={styles.submit_btn}
						onClick={handleEdit}
					>
						<IcMEdit className={styles.edit_icon} />
						Edit
					</Button>
				)}
			</div>
			<form className={styles.flex} onSubmit={handleSubmit(handleSave)}>
				<GlobalRule {...commonProps} />
				<div className={styles.referral_bonus}>
					<div className={styles.subheading}>Referral Bonus (for N-1)</div>
					<ReferralBonus {...commonProps} />
				</div>
				<div className={styles.referral_bonus}>
					<div className={styles.subheading}>Network Bonus (for N-2 to Master parent Node)</div>
					<NetworkBonus {...commonProps} />
				</div>
				<div className={styles.remaining_bonus}>
					<div className={styles.subheading}>Remaining Network Bonus</div>
					<RemainingBonus {...commonProps} trigger={trigger} />
				</div>
				<div className={styles.network_bonus}>
					<div className={styles.subheading}>Network Bonus Criteria</div>
					<NetworkBonusCriteria
						{...commonProps}
						trigger={trigger}
						setValue={setValue}
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

export default SubscriptionRule;
