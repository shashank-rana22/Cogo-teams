import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import React, { useState, useContext } from 'react';

import useGetInsuranceDraftDetails from '../../../../../hooks/useGetInsuranceDraftDetails';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import getDefaultValues from './utils/getDefaultValues';

const DEFAULT_STEP = 1;
const FIRST_STEP = 1;
const SECOND_STEP = 2;

function CargoInsurance({
	onCancel = () => {},
	refetch = () => {},
	task = {},
}) {
	const [step, setStep] = useState(DEFAULT_STEP);
	const [addressId, setAddressId] = useState('');

	const { shipment_data, primary_service, servicesList } = useContext(
		ShipmentDetailContext,
	);

	const policyId = shipment_data?.all_services?.find(
		(item) => item?.service_type === 'cargo_insurance_service',
	)?.cargo_insurance_policy_id ?? '2b98befa-0f6f-4a70-ad02-90e1bf6bf9eb';

	const { insuranceDetails } = useGetInsuranceDraftDetails({
		step,
		policyId,
		setAddressId,
	});

	const [billingData, setBillingData] = useState({
		address_type: '',
		billingId:
			insuranceDetails?.organizationBillingAddressId
			|| insuranceDetails?.organizationAddressId,
		gstin          : insuranceDetails?.gstin,
		billingAddress : insuranceDetails?.billingAddress,
		billingCity    : insuranceDetails?.billingCity,
		billingPincode : insuranceDetails?.billingPincode,
		billingState   : insuranceDetails?.billingState,
		partyName      : insuranceDetails?.partyName,
	});

	const defaultValues = getDefaultValues({ insuranceDetails, shipment_data, primary_service, servicesList });

	const formProps = useForm({ values: defaultValues });

	if (step === FIRST_STEP) {
		return (
			<Step1
				setStep={setStep}
				step={step}
				insuranceDetails={insuranceDetails}
				shipmentData={shipment_data}
				policyId={policyId}
				// key={JSON.stringify(insuranceDetails)}
				addressId={addressId}
				setAddressId={setAddressId}
				billingData={billingData}
				setBillingData={setBillingData}
				formProps={formProps}
			/>
		);
	}

	if (step === SECOND_STEP) {
		return (
			<Step2
				setStep={setStep}
				step={step}
				insuranceDetails={insuranceDetails}
				shipmentData={shipment_data}
				policyId={policyId}
				// key={`${JSON.stringify(insuranceDetails)} ${step}`}
				addressId={addressId}
				billingData={billingData}
				formProps={formProps}
			/>
		);
	}

	return (
		<Step3
			setStep={setStep}
			step={step}
			insuranceDetails={insuranceDetails}
			shipmentData={shipment_data}
			policyId={policyId}
			onCancel={onCancel}
			refetch={refetch}
			primary_service={primary_service}
			task={task}
			// key={JSON.stringify(insuranceDetails)}
			addressId={addressId}
			billingData={billingData}
			formProps={formProps}
		/>
	);
}

export default CargoInsurance;
