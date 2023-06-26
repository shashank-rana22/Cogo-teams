import { Button, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/ocean-modules';
import React, { useEffect } from 'react';

import useGetInsuranceRate from '../../../../../hooks/useGetInsuranceRate';
import useSaveDraft from '../../../../../hooks/useSaveDraft';

import mutatedFields from './mutateFields';
import PremiumRate from './PremiumRate';
import styles from './styles.module.css';
import { cargoControls } from './utils/cargoControls';

const BACK_STEP = 1;
const LAST_STEP = 3;
const INCREMENT_FACTOR = 1;

function Step2({
	setStep = () => {},
	step,
	formData = {},
	setFormData = () => {},
	insuranceDetails = {},
	shipmentData = {},
	policyId = '',
	addressId = '',
	billingData = {},
}) {
	const policyDetails = shipmentData?.all_services?.find(
		(item) => item?.service_type === 'cargo_insurance_service',
	);

	const {
		handleSubmit = () => {},
		watch,
		setValue,
		control,
		formState: { errors },
	} = useForm();

	const formValues = watch();

	const refetch = (key) => {
		if (key === 'next_step') {
			setStep(() => (step !== LAST_STEP ? step + INCREMENT_FACTOR : step));
		}
	};

	const { premiumData, premiumLoading } = useGetInsuranceRate({
		insuranceDetails,
		formValues,
	});

	const { loading, saveData } = useSaveDraft({
		shipmentData,
		policyId,
		step,
		premiumData,
		insuranceDetails : { ...insuranceDetails, ...formData },
		addressId,
		policyForSelf    : insuranceDetails?.policyForSelf,
		billingType      : insuranceDetails?.billingType ? 'INDIVIDUAL' : 'CORPORATE',
		billingData,
		refetch,
	});

	const newControls = mutatedFields({
		fields: cargoControls({ insuranceDetails }),
		setValue,
		formValues,
		watch,
	});

	const handleNextStep = () => {
		saveData('next_step');
	};

	useEffect(() => {
		setFormData({ ...formData, ...formValues });
	}, [JSON.stringify(formValues)]);

	return (
		<div className={styles.container}>
			<div className={styles.label_val}>Cargo Details</div>

			<div className={styles.flex_row}>
				<div className={cl`${styles.flex_row} ${styles.flex}`}>
					<Layout
						control={control}
						fields={newControls}
						errors={errors}
					/>
				</div>

				<PremiumRate
					premiumData={premiumData}
					premiumLoading={premiumLoading}
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setStep(BACK_STEP)}
					disabled={loading}
				>
					Back
				</Button>

				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(saveData)}
					disabled={loading}
					style={{ marginLeft: '16px' }}
				>
					Save As Draft
				</Button>

				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(handleNextStep)}
					disabled={loading}
					style={{ marginLeft: '16px' }}
				>
					Next Step
				</Button>
			</div>
		</div>
	);
}

export default Step2;
