import { Button, Toggle, Toast, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useMemo, useState } from 'react';

import useGetStateFromPincode from '../../../../../hooks/useGetStateFromPincode';
import useSaveDraft from '../../../../../hooks/useSaveDraft';

import BillingAddressDetails from './BillingAddressDetails';
import styles from './styles.module.css';
import { bilingAddressControl } from './utils/bilingAddressControl';
import { bilingAddressControlForSelf } from './utils/bilingAddressControlForSelf';
import { personalDetailsControl } from './utils/personalDetailsControl';

const LAST_STEP = 3;
const INCREMENT_FACTOR = 1;

function Step1({
	setStep = () => {},
	step,
	formData = {},
	setFormData = () => {},
	insuranceDetails = {},
	shipmentData = {},
	policyId = '',
	addressId = '',
	setAddressId = () => {},
	billingData = {},
	setBillingData = () => {},
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
		policyId,
		step,
		insuranceDetails: { ...insuranceDetails, ...formData },
		billingData,
		policyForSelf,
		addressId,
		refetch,
	});

	const formProps = useForm([
		...personalDetailsControl({ insuranceDetails }),
		...bilingAddressControl({ insuranceDetails }),
		...bilingAddressControlForSelf({ insuranceDetails }),
	]);

	const {
		handleSubmit = () => {},
		watch,
		setValue,
		control,
		formState: { errors },
	} = useForm();

	const formValues = watch();
	const pincode = watch('billingPincode');

	const { cityState } = useGetStateFromPincode({ pincode, policyForSelf });
	const { list } = cityState || {};
	const { region, city } = list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	useMemo(() => {
		if (isEmpty(list)) {
			Toast.error('Invalid Pincode');
		}
		if (city || region?.name) {
			setValue('city', city?.name);
			setValue('state', region?.name);
		}
	}, [list, city, region?.name, setValue]);

	useEffect(() => {
		setFormData({ ...formData, ...formValues });
	}, [JSON.stringify(formValues)]);

	const handleNextStep = () => {
		saveData('next_step');
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
	}, [billingData, prosporerAddress]);

	return (
		<div className={styles.container}>
			<Layout
				fields={personalDetailsControl({ insuranceDetails })}
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
				formData={formData}
				setFormData={setFormData}
				insuranceDetails={insuranceDetails}
				shipmentData={shipmentData}
				prosporerAddress={prosporerAddress}
				setProsporerAddress={setProsporerAddress}
				checked={checked}
				setChecked={setChecked}
			/>

			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(saveData)}
					disabled={loading}
				>
					Save As Draft
				</Button>
				<Button
					size="md"
					themeType="primary"
					onClick={
						handleSubmit(handleNextStep)
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
