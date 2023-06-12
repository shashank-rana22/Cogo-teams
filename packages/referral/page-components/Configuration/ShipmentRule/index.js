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

function ShipmentRule({ shipmentData = {}, dataLoading = false }) {
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
			remaining_bonus: [{ type: 'fixed' }],
		},
	});

	const [apiState, setApiState] = useState('Created');
	const [isEdit, setIsEdit] = useState(false);

	const { createRule = () => {}, loading = false } = useCreateReferralConfig({ apiState, setApiState, setIsEdit });

	useEffect(() => {
		if (shipmentData !== null) {
			setIsEdit(true);
			setFormValues(shipmentData, setValue);
			setApiState('Updated');
		}
	}, [shipmentData, setValue]);

	const handleSave = (values) => {
		const { remaining_bonus } = values;
		const totalPercentage = remaining_bonus.reduce(
			(acc, curr) => acc + Number(curr.percentage),
			DEFAULT_VALUE,
		);
		if (totalPercentage > DEFAULT_PERCENTAGE_VALUE) {
			Toast.error('Total Percentage should not exceed 100');
		} else {
			const payload = payloadFormat('shipment', values);
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
		errors,
		formValues,
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.heading}>
					<IcCFtick className={styles.tick_icon} />
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
				<GlobalRule {...commonProps} />
				<div className={styles.referral_bonus}>
					<div className={styles.subheading}>Referral Bonus (for N-1)</div>
					<ReferralBonus {...commonProps} />
				</div>
				<div className={styles.referral_bonus}>
					<div className={styles.subheading}>Network Bonus (for N-2 to Master parent Node)</div>
					<NetworkBonus {...commonProps} setError={setError} />
				</div>
				<div className={styles.remaining_bonus}>
					<div className={styles.subheading}>Remaining Network Bonus</div>
					<RemainingBonus {...commonProps} trigger={trigger} />
				</div>
				<div className={styles.network_bonus}>
					<div className={styles.subheading}>Network Bonus Criteria</div>
					<NetworkBonusCriteria {...commonProps} />
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
