import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useState, useContext, useMemo } from 'react';

import useGetInsuranceDraftDetails from '../../../../../hooks/useGetInsuranceDraftDetails';

import StepOne from './step1';
import StepTwo from './step2';
import StepThree from './step3';
import getDefaultValues from './utils/getDefaultValues';

const FIRST_STEP = 1;
const SECOND_STEP = 2;

function CargoInsurance({
	onCancel = () => {},
	refetch = () => {},
	task = {},
}) {
	console.log(task, 'task');
	const { shipment_data, primary_service, servicesList } = useContext(
		ShipmentDetailContext,
	);

	const [step, setStep] = useState(FIRST_STEP);
	const [addressId, setAddressId] = useState('');
	const [premiumData, setPremiumData] = useState({});

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
			<StepOne
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
			<StepTwo
				setStep={setStep}
				step={step}
				insuranceDetails={insuranceDetails}
				shipmentData={shipment_data}
				policyDetails={policyDetails}
				primary_service={primary_service}
				addressId={addressId}
				billingData={billingData}
				formProps={formProps}
				premiumData={premiumData}
				setPremiumData={setPremiumData}
			/>
		);
	}

	return (
		<StepThree
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
			premiumData={premiumData}
		/>
	);
}

export default CargoInsurance;
