import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { getCountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';
import { useState } from 'react';

import useCreateOrgTradeParty from '../../../../../../../../../hooks/useCreateOrgTradeParty';
import AddressForm from '../AddressForm';

import CompanyDetails from './CompanyDetails';
import ProgressStrip from './ProgressStrip';
import styles from './styles.module.css';

const TRADE_PARTY_TYPE = {
	key   : 'paying_party',
	label : 'PAYING PARTY',
	value : 'paying_party',
};

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

const COMPONENT_MAPPING = {
	company_details : CompanyDetails,
	billing_address : AddressForm,
};

function CreateNewInvoicingParty({
	organization = {},
	setActiveState = () => {},
	source = '',
	setShowModal = () => {},
}) {
	const [savedDetails, setSavedDetails] = useState({});
	const [currentStep, setCurrentStep] = useState('company_details');

	const {
		company_details: companyDetails = {},
		billing_address: billingAddress = {},
	} = savedDetails || {};

	const { country_id } = companyDetails;
	const { isAddressRegisteredUnderGst = false } = billingAddress;
	const { registration_number: registrationNumber } = companyDetails;

	const { onSubmit = () => {}, loading = false } = useCreateOrgTradeParty({
		organization,
		setActiveState,
		tradePartyType: TRADE_PARTY_TYPE,
		setShowModal,
		savedDetails,
		setSavedDetails,
		source,
	});

	const countrySpecificData = getCountrySpecificData({
		country_id,
		accessorType  : 'navigations',
		accessor      : 'partner',
		isDefaultData : false,
	});

	const { common } = countrySpecificData || {};

	const { validate_registration_number = false } = common || {};

	const onClickAddressFormForTradeParty = (addressValues = {}) => {
		setSavedDetails({
			...savedDetails,
			billing_address: { ...addressValues },
		});

		if (TRADE_PARTY_TYPE.value === 'paying_party') {
			setCurrentStep('billing_address');
			onSubmit(addressValues);
		}

		if (TRADE_PARTY_TYPE.value === 'collection_party') {
			setCurrentStep('bank_details');
		}
	};

	const componentProps = {
		company_details: {
			tradePartyType : TRADE_PARTY_TYPE,
			savedDetails,
			setSavedDetails,
			setCurrentStep,
			onClickBack    : () => {
				if (setActiveState) {
					setActiveState('view_billing_addresses');
				}
			},
			showBackButton: true,
		},
		billing_address: {
			organizationId              : organization.id,
			tradePartyId                : organization.organization_trade_party_id,
			addressData                 : {},
			isAddressRegisteredUnderGst : false,
			addressType                 : isAddressRegisteredUnderGst ? 'otherAddress' : 'billingAddress',
			showInvoiceTradeParty       : false,
			onSuccess                   : ({ values }) => {
				onClickAddressFormForTradeParty(values);
			},
			onFailure: ({ error }) => {
				Toast.error(getApiErrorString(error.response?.data));
			},
			saveAddressData   : false,
			showSavedPOC      : true,
			formState         : billingAddress,
			submitButtonLabel : TRADE_PARTY_TYPE.value === 'paying_party' ? 'Submit' : 'Proceed',
			optionalButtons   : [
				{
					className : 'secondary',
					label     : 'Back',
					onClick   : ({ values }) => {
						setCurrentStep('company_details');

						setSavedDetails((prev) => ({ ...prev, billing_address: { ...values } }));
					},
				},
			],
			loading,
			registrationNumber,
			validateGst           : validate_registration_number,
			organizationCountryId : country_id,
			source,
		},
	};

	const ActiveComponent = COMPONENT_MAPPING[currentStep];

	const activeComponentProps = componentProps[currentStep];

	return (
		<div className={styles.container}>
			<div className={styles.stepper_container}>
				<ProgressStrip
					progressSteps={Object.values(
						stepperContent[TRADE_PARTY_TYPE.value] || [],
					)}
					currentStep={currentStep}
				/>
			</div>

			<ActiveComponent {...activeComponentProps} />
		</div>
	);
}

export default CreateNewInvoicingParty;
