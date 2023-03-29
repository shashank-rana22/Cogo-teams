import { Stepper } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { useState } from 'react';

import AddressForm from '../CreateNewBillingAddress/AddressForm';

// import AddressForm from '../../AddressForm';
import useCreateOrgTradeParty from '../hooks/useCreateOrgTradeParty';

import CompanyDetails from './CompanyDetails';
import styles from './styles.module.css';

function CreateNewInvoicingParty({
	orgResponse = {},
	tradePartyType = {},
	setShowComponent = () => {},
	setShowModal = () => {},
	fetchOrganizationTradeParties = () => {},
	viewType = 'from_profile',
	source = '',
}) {
	const [filledDetails, setFilledDetails] = useState({});
	const [isAddressRegisteredUnderGst, setIsAddressRegisteredUnderGst] = useState(false);
	const [currentStep, setCurrentStep] = useState('company_details');

	// console.log('orgResponse', orgResponse);

	const items = [
		{ title: 'COMPANY DETAILS', key: 'company_details' },
		{ title: 'BILLING ADDRESS', key: 'billing_address' },
	];

	const { control, errors, handleSubmit, register, onSubmit } = useCreateOrgTradeParty({
		filledDetails,
		setFilledDetails,
		orgResponse,
		isAddressRegisteredUnderGst,
	});

	let renderCurrentStepControls = null;

	if (currentStep === 'company_details') {
		renderCurrentStepControls = (
			<CompanyDetails
				tradePartyType={tradePartyType}
				filledDetails={filledDetails}
				setFilledDetails={setFilledDetails}
				setCurrentStep={setCurrentStep}
				// onClickBack={onClickCompanyDetailsBack}
				// showBackButton={showCompanyDetailsBackButton}
			/>
		);
	}

	if (currentStep === 'billing_address') {
		renderCurrentStepControls = (
			<AddressForm
				handleSubmit={handleSubmit}
				errors={errors}
				useFieldArray={useFieldArray}
				control={control}
				register={register}
				companyDetails={filledDetails}
				setCurrentStep={setCurrentStep}
				onSubmit={onSubmit}
				isAddressRegisteredUnderGst={isAddressRegisteredUnderGst}
				setIsAddressRegisteredUnderGst={setIsAddressRegisteredUnderGst}
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

export default CreateNewInvoicingParty;
