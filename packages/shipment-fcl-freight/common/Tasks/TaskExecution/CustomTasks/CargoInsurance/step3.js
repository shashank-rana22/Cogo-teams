import { Button, FileSelect } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useInsuranceCheckoutAndGenerate from '../../../../../hooks/useInsuranceCheckoutAndGenerate';
import useSaveDraft from '../../../../../hooks/useSaveDraft';
import useSendShipmentCargoInsuranceEmail from '../../../../../hooks/useSendShipmentCargoInsuranceEmail';
import { getDate } from '../../../../TimeLine/utils/getDate';

import styles from './styles.module.css';
import { invoiceControls } from './utils/invoiceControls';

const BACK_STEP = 2;

function Step3({
	setStep = () => {},
	step,
	policyId = '',
	formData = {},
	setFormData = () => {},
	insuranceDetails = {},
	shipmentData = {},
	onCancel = () => {},
	refetch = () => {},
	primary_service = {},
	task = {},
	addressId = '',
	billingData = {},
}) {
	const [uploadProof, setUploadProof] = useState(null);

	const policyDetails = shipmentData?.all_services?.find(
		(item) => item?.service_type === 'cargo_insurance_service',
	);

	const {
		handleSubmit = () => {},
		watch,
		control,
		formState: { errors },
	} = useForm();

	const formValues = watch();
	const INVOICE_DATE = getDate(insuranceDetails?.invoiceDate);

	const { loading, saveData } = useSaveDraft({
		shipmentData,
		policyId,
		setStep,
		step,
		insuranceDetails : { ...insuranceDetails, ...formData },
		addressId,
		policyForSelf    : insuranceDetails?.policyForSelf,
		billingType      : insuranceDetails?.billingType ? 'INDIVIDUAL' : 'CORPORATE',
		billingData,
	});

	const { loading: sendCustomerEmailLoading, sendCustomerEmail } = useSendShipmentCargoInsuranceEmail({
		shipmentData,
	});

	const { loading: policyGenerationLoading, generateInsurance } =	useInsuranceCheckoutAndGenerate({
		policyId,
		uploadProof,
		insuranceDetails,
		onCancel,
		refetch,
		formData,
		shipmentData,
		primary_service,
		task,
	});

	const showLoading =	loading || sendCustomerEmailLoading || policyGenerationLoading;

	const isDisableForCustomerConfirmation = () => (
		showLoading
			|| isEmpty(formData.invoiceNo)
			|| !formData.invoiceDate
			|| isEmpty(formData.gstDoc)
			|| isEmpty(formData.invoiceDoc)
			|| isEmpty(formData.panDoc)
	);
	// console.log(
	// 	showLoading,
	// 	' : ',
	// 	formValues,
	// 	' : ',
	// 	policyGenerationLoading,
	// );

	useEffect(() => {
		setFormData({ ...formData, ...formValues });
	}, [JSON.stringify(formValues)]);

	return (
		<div className={styles.container}>
			<Layout
				control={control}
				fields={invoiceControls({ insuranceDetails, policyDetails, INVOICE_DATE })}
				errors={errors}
			/>

			<div>
				<div className={styles.title}>Customer Confirmation Proof</div>

				<FileSelect
					value={uploadProof}
					onChange={setUploadProof}
					label="Customer Confirmation Proof"
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setStep(BACK_STEP)}
					disabled={showLoading}
				>
					Back
				</Button>

				<Button
					size="md"
					themeType="primary"
					onClick={sendCustomerEmail}
					disabled={isDisableForCustomerConfirmation()}
					style={{ marginLeft: '16px' }}
				>
					Send email for Customer confirmation
				</Button>

				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(saveData)}
					disabled={showLoading}
					style={{ marginLeft: '16px' }}
				>
					Save As Draft
				</Button>

				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(generateInsurance)}
					disabled={showLoading || isEmpty(uploadProof)}
					style={{ marginLeft: '16px' }}
				>
					Generate Policy
				</Button>
			</div>
		</div>
	);
}

export default Step3;
