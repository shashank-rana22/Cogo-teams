import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import React, { useState, useContext, useMemo } from 'react';

import useGetInsuranceDraftDetails from '../../../../../hooks/useGetInsuranceDraftDetails';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import getDefaultValues from './utils/getDefaultValues';

const FIRST_STEP = 1;
const SECOND_STEP = 2;

function CargoInsurance({
	onCancel = () => {},
	refetch = () => {},
	task = {},
}) {
	const [step, setStep] = useState(FIRST_STEP);
	const [addressId, setAddressId] = useState('');

	const { shipment_data, primary_service, servicesList } = useContext(
		ShipmentDetailContext,
	);

	const policyDetails = (servicesList || []).find(
		(item) => item?.service_type === 'cargo_insurance_service',
	);

	const { insuranceDetails } = useGetInsuranceDraftDetails({
		step,
		policyId: policyDetails?.cargo_insurance_policy_id,
		setAddressId,
	});

	const {
		organizationBillingAddressId, organizationAddressId, billingAddress, billingCity,
		billingPincode, billingState, gstin, partyName,
	} = insuranceDetails || {};

	const [billingData, setBillingData] = useState({
		address_type : '',
		billingId    : organizationBillingAddressId	|| organizationAddressId,
		gstin,
		billingAddress,
		billingCity,
		billingPincode,
		billingState,
		partyName,
	});

	const defaultValues = useMemo(() => getDefaultValues({
		insuranceDetails, shipment_data, policyDetails,
	}), [insuranceDetails, shipment_data, policyDetails]);

	const formProps = useForm({ values: defaultValues });

	if (step === FIRST_STEP) {
		return (
			<Step1
				setStep={setStep}
				step={step}
				insuranceDetails={insuranceDetails}
				shipmentData={shipment_data}
				policyId={policyDetails?.cargo_insurance_policy_id}
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
				policyId={policyDetails?.cargo_insurance_policy_id}
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
			policyId={policyDetails?.cargo_insurance_policy_id}
			onCancel={onCancel}
			refetch={refetch}
			primary_service={primary_service}
			task={task}
			addressId={addressId}
			billingData={billingData}
			formProps={formProps}
		/>
	);
}

export default CargoInsurance;
