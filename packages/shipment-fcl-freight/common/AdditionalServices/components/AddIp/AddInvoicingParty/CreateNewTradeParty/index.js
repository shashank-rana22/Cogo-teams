import { Stepper } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { useState } from 'react';

import useCreateOrgTradeParty from '../../../../../../hooks/useCreateOrgTradeParty';
import AddressForm from '../CreateNewBillingAddress/AddressForm';

import CompanyDetails from './CompanyDetails';
import styles from './styles.module.css';

function CreateNewTradeParty({
	orgResponse = {},
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

	const { control, errors, handleSubmit, register, onSubmit } = useCreateOrgTradeParty({
		filledDetails,
		setFilledDetails,
		orgResponse,
		setShowComponent,
		isAddressRegisteredUnderGst,
		fetchOrganizationTradeParties,
	});

	let renderCurrentStepControls = null;

	if (currentStep === 'company_details') {
		renderCurrentStepControls = (
			<CompanyDetails
				filledDetails={filledDetails}
				setFilledDetails={setFilledDetails}
				setCurrentStep={setCurrentStep}
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
