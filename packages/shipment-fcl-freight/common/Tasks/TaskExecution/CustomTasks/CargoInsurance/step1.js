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
		insuranceDetails?.policyForSelf,
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
		getValues,
		formState: { errors },
	} = formProps;

	const handleNextStep = (key) => {
		const newFormValues = { ...insuranceDetails, ...getValues() };
		const payload = getPayload({
			policyId,
			step,
			insuranceDetails: newFormValues,
			billingData,
			policyForSelf,
			addressId,
		});
		saveData({ key, payload });
	};

	useEffect(() => {
		if (policyForSelf) {
			setAddressId(
				prosporerAddress?.address_type === 'billing'
					? { organizationBillingAddressId: prosporerAddress?.id }
					: { organizationAddressId: prosporerAddress?.id },
			);
		} else {
			setAddressId(
				billingData?.address_type === 'billing'
					? { organizationBillingAddressId: billingData?.billingId }
					: { organizationAddressId: billingData?.billingId },
			);
		}
	}, [billingData, prosporerAddress, policyForSelf, setAddressId]);

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
					themeType="primary"
					onClick={handleSubmit(handleNextStep)}
					disabled={loading}
				>
					Save As Draft
				</Button>
				<Button
					size="md"
					themeType="primary"
					onClick={
						() => handleSubmit(handleNextStep('next_step'))
					}
					disabled={
						policyForSelf || loading
							? isEmpty(prosporerAddress)
							: isEmpty(billingData.billingId)
					}
					style={{ marginLeft: '16px' }}
				>
					Next Step
				</Button>
			</div>
		</div>
	);
}
export default Step1;
