import { Stepper } from '@cogoport/components';
import { useState } from 'react';

import useCreateOrganizationTradeParty from '../../../../../../hooks/useCreateOrganizationTradeParty';
import AddressForm from '../AddressForm';

import CompanyDetails from './CompanyDetails';
import styles from './styles.module.css';
import formatPayload from './utils/formatPayload';

function CreateNewTradeParty({
	orgResponse = {},
	showComponent,
	setShowComponent = () => {},
	fetchOrganizationTradeParties = () => {},
}) {
	const [filledDetails, setFilledDetails] = useState({});
	const [isAddressRegisteredUnderGst, setIsAddressRegisteredUnderGst] = useState(false);
	const [gstNumber, setGstNumber] = useState('');
	const [currentStep, setCurrentStep] = useState('company_details');

	const items = [
		{ title: 'COMPANY DETAILS', key: 'company_details' },
		{ title: 'BILLING ADDRESS', key: 'billing_address' },
	];

	const afterCreateTradeParty = () => {
		setShowComponent('view_billing_addresses');
		fetchOrganizationTradeParties();
	};

	const { apiTrigger } = useCreateOrganizationTradeParty({
		successMessage : 'Successfully Created',
		refech         : afterCreateTradeParty,
	});

	const onSubmit = (values) => {
		const payload = formatPayload({
			values,
			filledDetails,
			orgResponse,
			isAddressRegisteredUnderGst,
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
				isAddressRegisteredUnderGst={isAddressRegisteredUnderGst}
				setIsAddressRegisteredUnderGst={setIsAddressRegisteredUnderGst}
				source="create_trade_party"
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.stepper_container}>
				<Stepper active={currentStep} setActive={setCurrentStep} items={items} />
			</div>

			{renderCurrentStepControls}
		</div>
	);
}

export default CreateNewTradeParty;
