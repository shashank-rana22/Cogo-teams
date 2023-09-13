import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { getCountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';

import AddressForm from '../AddressForm';

function CreateBillingAddress({
	organization = {},
	setActiveState = () => {},
	invoiceToTradePartyDetails = {},
	setInvoiceToTradePartyDetails = () => {},
	source = '',
	trigger = () => {},
}) {
	const {
		id = '',
		registration_number: organizationRegistrationNumber = '',
		country_id: organizationCountryId = '',
	} = organization;

	const {
		registrationNumber = '',
		countryId = '',
		tradePartyId = '',
	} = invoiceToTradePartyDetails;

	const countryIdForAddressForm = countryId || organizationCountryId;

	const countrySpecificData = getCountrySpecificData({
		country_id    : countryIdForAddressForm,
		accessorType  : 'navigations',
		accessor      : 'partner',
		isDefaultData : false,
	});

	const onSuccess = async () => {
		await trigger();
		setActiveState('view_billing_addresses');
		setInvoiceToTradePartyDetails({});
	};

	const { common } = countrySpecificData || {};

	const { validate_registration_number = false } = common || {};

	return (
		<AddressForm
			organizationId={id}
			tradePartyId={tradePartyId}
			isAddressRegisteredUnderGst={false}
			addressData={{}}
			addressType="billingAddress"
			showInvoiceTradeParty={false}
			onSuccess={onSuccess}
			onFailure={({ error }) => {
				Toast.error(getApiErrorString(error.response?.data));
			}}
			saveAddressData
			showSavedPOC={false}
			formState={{}}
			submitButtonLabel="Submit"
			optionalButtons={[
				{
					className : 'secondary',
					label     : 'Back',
					onClick   : () => {
						setActiveState('view_billing_addresses');
						setInvoiceToTradePartyDetails({});
					},
				},
			]}
			loading={false}
			validateGst={validate_registration_number}
			registrationNumber={
					registrationNumber || organizationRegistrationNumber
				}
			organizationCountryId={organizationCountryId}
			source={source}
		/>
	);
}

export default CreateBillingAddress;
