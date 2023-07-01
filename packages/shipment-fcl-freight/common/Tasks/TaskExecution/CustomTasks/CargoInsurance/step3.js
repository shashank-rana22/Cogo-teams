import { Button, FileSelect } from '@cogoport/components';
import { Layout } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useInsuranceCheckoutAndGenerate from '../../../../../hooks/useInsuranceCheckoutAndGenerate';
import useSaveDraft from '../../../../../hooks/useSaveDraft';
import useSendShipmentCargoInsuranceEmail from '../../../../../hooks/useSendShipmentCargoInsuranceEmail';

import { invoiceControls } from './controls/invoiceControls';
import styles from './styles.module.css';
import getPayload from './utils/getPayload';
import getPayloadForUpdateShipment from './utils/getPayloadForUpdateShipment';

const BACK_STEP = 2;

function Step3({
	setStep = () => {},
	step,
	policyId = '',
	formProps = {},
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

	const {
		handleSubmit = () => {},
		control,
		formState: { errors },
		getValues,
	} = formProps;

	const { loading, saveData } = useSaveDraft({
		shipmentData,
		step,
	});

	const refetchAfterApiCall = () => {
		refetch();
		onCancel();
	};

	const { loading: sendCustomerEmailLoading, sendCustomerEmail } = useSendShipmentCargoInsuranceEmail({
		shipmentData,
	});

	const { loading: policyGenerationLoading, generateInsurance } =	useInsuranceCheckoutAndGenerate({
		policyId,
		uploadProof,
		insuranceDetails,
		refetch: refetchAfterApiCall,
		shipmentData,
		primary_service,
		task,
	});

	const formData = getValues();
	const showLoading =	loading || sendCustomerEmailLoading || policyGenerationLoading;

	const isDisableForCustomerConfirmation = () => (
		showLoading
			|| isEmpty(formData.invoiceNo)
			|| !formData.invoiceDate
			|| isEmpty(formData.gstDoc)
			|| isEmpty(formData.invoiceDoc)
			|| isEmpty(formData.panDoc)
	);

	const handleNextStep = ({ submit = false }) => {
		handleSubmit((values) => {
			const newFormValues = { ...insuranceDetails, ...values };
			const payload = getPayload({
				policyId,
				insuranceDetails : newFormValues,
				billingData,
				policyForSelf    : insuranceDetails?.policyForSelf,
				addressId,
				billingType      : insuranceDetails?.billingType ? 'INDIVIDUAL' : 'CORPORATE',
			});
			const payloadForUpdateShipment = getPayloadForUpdateShipment({ insuranceDetails, primary_service, task });

		if (submit) {
			generateInsurance({ payload, payloadForUpdateShipment });
		} else {
			saveData({ payload });
		}
		})();
	};

	return (
		<div className={styles.container}>
			<Layout
				control={control}
				fields={invoiceControls}
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
					onClick={sendCustomerEmail}
					disabled={isDisableForCustomerConfirmation()}
					className={styles.btn_div}
				>
					Send email for Customer confirmation
				</Button>

				<Button
					size="md"
					onClick={handleNextStep}
					disabled={showLoading}
					className={styles.btn_div}
				>
					Save As Draft
				</Button>

				<Button
					size="md"
					onClick={() => handleNextStep({ submit: true })}
					disabled={showLoading || isEmpty(uploadProof)}
					className={styles.btn_div}
				>
					Generate Policy
				</Button>
			</div>
		</div>
	);
}

export default Step3;
