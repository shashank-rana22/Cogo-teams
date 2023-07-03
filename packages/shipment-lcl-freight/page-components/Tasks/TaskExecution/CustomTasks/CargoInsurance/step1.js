import { Button, Toggle, cl } from '@cogoport/components';
import { Layout } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import useSaveDraft from '../../../../../hooks/useSaveDraft';

import BillingAddressDetails from './BillingAddressDetails';
import { personalDetailsControl } from './controls/personalDetailsControl';
import styles from './styles.module.css';
import getPayload from './utils/getPayload';

const LAST_STEP = 3;
const INCREMENT_FACTOR = 1;

function Step1({
	setStep = () => {},
	step,
	insuranceDetails = {},
	shipmentData = {},
	policyId = '',
	addressId = '',
	setAddressId = () => {},
	billingData = {},
	setBillingData = () => {},
	formProps = {},
}) {
	const [policyForSelf, setPolicyForSelf] = useState(
		!!insuranceDetails?.policyForSelf,
	);
	const [prosporerAddress, setProsporerAddress] = useState({});
	const [checked, setChecked] = useState([]);

	const refetch = (key) => {
		if (key === 'next_step') {
			setStep(() => (step !== LAST_STEP ? step + INCREMENT_FACTOR : step));
		}
	};
	const { loading, saveData } = useSaveDraft({
		shipmentData,
		refetch,
	});

	const {
		handleSubmit = () => {},
		control,
		formState: { errors },
	} = formProps;

	const handleNextStep = (key) => {
		handleSubmit((values) => {
			const newFormValues = { ...insuranceDetails, ...values };
			const payload = getPayload({
				policyId,
				step,
				insuranceDetails: newFormValues,
				billingData,
				policyForSelf,
				addressId,
			});

			saveData({ key, payload });
		})();
	};

	const { id: prosporerAddressId, address_type: prosporerAddressType } = prosporerAddress || {};
	const { billingId, address_type: billingDataAddressType } = billingData || {};

	useEffect(() => {
		if (policyForSelf) {
			setAddressId(
				prosporerAddressType === 'billing'
					? { organizationBillingAddressId: prosporerAddressId }
					: { organizationAddressId: prosporerAddressId },
			);
		} else {
			setAddressId(
				billingDataAddressType === 'billing'
					? { organizationBillingAddressId: billingId }
					: { organizationAddressId: billingId },
			);
		}
	}, [prosporerAddressId, prosporerAddressType, billingId,, billingDataAddressType, policyForSelf, setAddressId]);

	return (
		<div className={styles.container}>
			<Layout
				fields={personalDetailsControl}
				control={control}
				errors={errors}
			/>

			<div className={styles.sub_header}>
				<div className={cl`${styles.flex_row} ${styles.label}`}>
					<div className={styles.label_val}>Billing Address Details</div>
					<Toggle
						offLabel="Self"
						onLabel="Other"
						checked={policyForSelf}
						onChange={() => setPolicyForSelf((p) => !p)}
					/>
				</div>
			</div>

			<BillingAddressDetails
				policyForSelf={policyForSelf}
				formProps={formProps}
				billingData={billingData}
				setBillingData={setBillingData}
				prosporerAddress={prosporerAddress}
				setProsporerAddress={setProsporerAddress}
				checked={checked}
				setChecked={setChecked}
			/>

			<div className={styles.button_container}>
				<Button
					size="md"
					onClick={handleNextStep}
					disabled={loading}
				>
					Save As Draft
				</Button>
				<Button
					size="md"
					onClick={() => handleNextStep('next_step')}
					disabled={
						policyForSelf || loading
							? isEmpty(prosporerAddress)
							: isEmpty(billingData.billingId)
					}
					className={styles.btn_div}
				>
					Next Step
				</Button>
			</div>
		</div>
	);
}
export default Step1;
