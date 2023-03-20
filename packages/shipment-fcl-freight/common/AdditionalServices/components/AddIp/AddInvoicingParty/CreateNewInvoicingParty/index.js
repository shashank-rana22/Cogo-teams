import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { useState } from 'react';

// import AddressForm from '../../AddressForm';
import useCreateOrgTradeParty from '../hooks/useCreateOrgTradeParty';

import AdditionalDocuments from './AdditionalDocument';
import BankAccount from './BankAccount';
import CompanyDetails from './CompanyDetails';
import ProgressStrip from './ProgressStrip';
import styles from './styles.module.css';

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const stepperContent = {
	paying_party: {
		company_details: {
			key   : 'company_details',
			label : 'COMPANY DETAILS',
		},
		billing_address: {
			key   : 'billing_address',
			label : 'BILLING ADDRESS',
		},
	},
	collection_party: {
		company_details: {
			key   : 'company_details',
			label : 'COMPANY DETAILS',
		},
		billing_address: {
			key   : 'billing_address',
			label : 'BILLING ADDRESS',
		},
		bank_details: {
			key   : 'bank_details',
			label : 'BANK DETAILS',
		},
		documents: {
			key   : 'documents',
			label : 'DOCUMENTS',
		},
	},
};

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
	const [currentStep, setCurrentStep] = useState('company_details');

	const { onSubmit = () => {}, loading = false } = useCreateOrgTradeParty({
		orgResponse,
		setShowComponent,
		tradePartyType,
		setShowModal,
		filledDetails,
		setFilledDetails,
		fetchOrganizationTradeParties,
		source,
	});

	const onClickAddressFormForTradeParty = (addressValues = {}) => {
		const { values = {} } = addressValues;

		setFilledDetails({
			...filledDetails,
			billing_address: { ...values },
		});

		if (tradePartyType.value === 'paying_party') {
			setCurrentStep('billing_address');
			onSubmit(values);
		}

		if (tradePartyType.value === 'collection_party') {
			setCurrentStep('bank_details');
		}
	};

	let renderCurrentStepControls = null;
	if (currentStep === 'company_details') {
		const showCompanyDetailsBackButton = ['from_checkout'].includes(viewType);
		const onClickCompanyDetailsBack = () => {
			if (showCompanyDetailsBackButton && setShowComponent) {
				setShowComponent('view_billing_addresses');
			}
		};
		renderCurrentStepControls = (
			<CompanyDetails
				tradePartyType={tradePartyType}
				filledDetails={filledDetails}
				setFilledDetails={setFilledDetails}
				setCurrentStep={setCurrentStep}
				onClickBack={onClickCompanyDetailsBack}
				showBackButton={showCompanyDetailsBackButton}
			/>
		);
	}

	if (currentStep === 'billing_address') {
		const optionalButtons = [
			{
				className : 'secondary',
				label     : 'Back',
				onClick   : ({ values }) => {
					setCurrentStep('company_details');
					setFilledDetails({
						...filledDetails,
						billing_address: { ...values },
					});
				},
			},
		];

		const {
			company_details: companyDetails = {},
			billing_address: billingAddress = {},
		} = filledDetails || {};
		const { country_id } = companyDetails;
		const { isAddressRegisteredUnderGst } = billingAddress;
		const { registration_number: registrationNumber } = companyDetails;

		renderCurrentStepControls = (
			<AddressForm
				organizationId={orgResponse.id}
				tradePartyId={orgResponse.organization_trade_party_id}
				isAddressRegisteredUnderGst={false}
				addressData={{}}
				addressType={
					isAddressRegisteredUnderGst ? 'otherAddress' : 'billingAddress'
				}
				showInvoiceTradeParty={false}
				onSuccess={(values) => {
					onClickAddressFormForTradeParty(values);
				}}
				onFailure={({ error }) => {
					Toast.error(error.data);
				}}
				saveAddressData={false}
				showSavedPOC
				formState={billingAddress}
				submitButtonLabel={
					tradePartyType.value === 'paying_party' ? 'Submit' : 'Proceed'
				}
				optionalButtons={optionalButtons}
				loading={loading}
				registrationNumber={registrationNumber}
				validateGst={country_id === INDIA_COUNTRY_ID}
			/>
		);
	}

	if (currentStep === 'bank_details') {
		renderCurrentStepControls = (
			<BankAccount
				setCurrentStep={setCurrentStep}
				filledDetails={filledDetails}
				setFilledDetails={setFilledDetails}
			/>
		);
	}

	if (currentStep === 'documents') {
		renderCurrentStepControls = (
			<AdditionalDocuments
				setCurrentStep={setCurrentStep}
				setShowModal={setShowModal}
				filledDetails={filledDetails}
				setFilledDetails={setFilledDetails}
				orgResponse={orgResponse}
				tradePartyType={tradePartyType}
				fetchOrganizationTradeParties={fetchOrganizationTradeParties}
				source={source}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.stepper_container}>
				<ProgressStrip
					progressSteps={Object.values(
						stepperContent[tradePartyType.value] || [],
					)}
					currentStep={currentStep}
				/>
			</div>

			{renderCurrentStepControls}
		</div>
	);
}

export default CreateNewInvoicingParty;
