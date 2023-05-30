import { Stepper } from '@cogoport/components';
import { useState } from 'react';

import useCreateOrganizationTradeParty from '../../../../../../hooks/useCreateOrganizationTradeParty';
import AddressForm from '../common/AddressForm';

import CompanyDetails from './CompanyDetails';
import styles from './styles.module.css';
import formatPayload from './utils/formatPayload';

const STEPPER_ITEMS = [
	{ title: 'COMPANY DETAILS', key: 'company_details' },
	{ title: 'BILLING ADDRESS', key: 'billing_address' },
];

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

	return (
		<div className={styles.container}>
			<div className={styles.stepper_container}>
				<Stepper active={currentStep} setActive={setCurrentStep} items={STEPPER_ITEMS} />
			</div>

			{currentStep === 'company_details' ? (
				<CompanyDetails
					filledDetails={filledDetails}
					setFilledDetails={setFilledDetails}
					setCurrentStep={setCurrentStep}
					setShowComponent={setShowComponent}
				/>
			) : null}

			{currentStep === 'billing_address' ? (
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
			) : null}
		</div>
	);
}

export default CreateNewTradeParty;
