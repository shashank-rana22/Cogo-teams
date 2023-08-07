import { Stepper } from '@cogoport/components';
import { useState } from 'react';

import useCreateOrganizationTradeParty from '../../../../../../hooks/useCreateOrganizationTradeParty';
import AddressForm from '../AddressForm';

import CompanyDetails from './CompanyDetails';
import styles from './styles.module.css';
import formatPayload from './utils/formatPayload';

const STEPPER_ITEMS = [
	{ title: 'COMPANY DETAILS', key: 'company_details' },
	{ title: 'BILLING ADDRESS', key: 'billing_address' },
];

function CreateNewTradeParty({
	orgResponse = {},
	showComponent = '',
	setShowComponent = () => {},
	fetchOrganizationTradeParties = () => {},
}) {
	const [filledDetails, setFilledDetails] = useState({});
	const [isAddressNotRegisteredUnderGst, setIsAddressNotRegisteredUnderGst] = useState(false);
	const [gstNumber, setGstNumber] = useState('');
	const [currentStep, setCurrentStep] = useState('company_details');

	const afterCreateTradeParty = () => {
		setShowComponent('view_billing_addresses');
		fetchOrganizationTradeParties();
	};

	const { apiTrigger } = useCreateOrganizationTradeParty({
		refetch: afterCreateTradeParty,
	});

	const onSubmit = (values) => {
		const payload = formatPayload({
			values,
			filledDetails,
			orgResponse,
			isAddressNotRegisteredUnderGst,
			setFilledDetails,
			gstNumber,
		});

		apiTrigger(payload);
	};

	let renderCurrentStepControls = null;

	if (currentStep === 'company_details') {
		renderCurrentStepControls = (
			<CompanyDetails
				filledDetails={filledDetails}
				setFilledDetails={setFilledDetails}
				setCurrentStep={setCurrentStep}
				setShowComponent={setShowComponent}
			/>
		);
	}

	if (currentStep === 'billing_address') {
		renderCurrentStepControls = (
			<AddressForm
				companyDetails={filledDetails}
				setCurrentStep={setCurrentStep}
				showComponent={showComponent}
				onSubmit={onSubmit}
				gstNumber={gstNumber}
				setGstNumber={setGstNumber}
				isAddressNotRegisteredUnderGst={isAddressNotRegisteredUnderGst}
				setIsAddressNotRegisteredUnderGst={setIsAddressNotRegisteredUnderGst}
				source="create_trade_party"
			/>
		);
	}

	return (
		<div>
			<div className={styles.stepper_container}>
				<Stepper active={currentStep} setActive={setCurrentStep} items={STEPPER_ITEMS} />
			</div>

			{renderCurrentStepControls}
		</div>
	);
}

export default CreateNewTradeParty;
