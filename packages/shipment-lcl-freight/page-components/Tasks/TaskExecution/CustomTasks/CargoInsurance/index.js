import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import React, { useState, useContext, useMemo } from 'react';

import useGetInsuranceDraftDetails from '../../../../../hooks/useGetInsuranceDraftDetails';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import getDefaultValues from './utils/getDefaultValues';

const FIRST_STEP = 1;

const stepMapping = {
	1 : Step1,
	2 : Step2,
	3 : Step3,
};

function CargoInsurance({
	onCancel = () => {},
	refetch = () => {},
	task = {},
}) {
	const { shipment_data, primary_service, servicesList } = useContext(
		ShipmentDetailContext,
	);
	const [step, setStep] = useState(FIRST_STEP);
	const [addressId, setAddressId] = useState('');

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

	const RenderStep = stepMapping[step];

	if (RenderStep) {
		return (
			<RenderStep
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
				setAddressId={setAddressId}
				setBillingData={setBillingData}
			/>
		);
	}
	return null;
}

export default CargoInsurance;
