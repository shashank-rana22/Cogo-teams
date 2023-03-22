import { Checkbox } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { useState } from 'react';

import AddressForm from './AddressForm';
import AsyncGstListController from './AsyncGstListController';

// const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

function CreateNewBillingAddress({
	// setShowComponent = () => {},
	// organizationDetails = {},
	// refetch = () => {},
	// invoiceToTradePartyDetails,
	// setInvoiceToTradePartyDetails,
}) {
	const [isUnderGst, setIsUnderGst] = useState(false);
	const [gstNumber, setGstNumber] = useState('');
	// const {
	// 	id = '',
	// 	registration_number: organizationRegistrationNumber = '',
	// 	country_id: organizationCountryId = '',
	// } = organizationDetails;

	// const {
	// 	registrationNumber = '',
	// 	countryId = '',
	// 	tradePartyId = '',
	// } = invoiceToTradePartyDetails;

	// const countryIdForAddressForm = countryId || organizationCountryId;

	const {
		fields,
		handleSubmit,
		control,
		register,
		formState: { errors },
	} = useForm();

	return (
		<div>
			<Checkbox
				label="Not Registered Under GST Law"
				value="isAddressRegisteredUnderGst"
				checked={isUnderGst}
				onChange={() => setIsUnderGst(!isUnderGst)}
			/>

			{isUnderGst ? (
				<AddressForm isUnderGst={isUnderGst} />
			)
				: (
					<div>
						<label>Billing Address</label>

						<AsyncGstListController
							gstNumber={gstNumber}
							setGstNumber={setGstNumber}
						/>

						<AddressForm isUnderGst={isUnderGst} />
					</div>
				)}

			{/* <AddressForm
				organizationId={id}
				tradePartyId={tradePartyId}
				isAddressRegisteredUnderGst={false}
				addressData={{}}
				addressType="billingAddress"
				showInvoiceTradeParty={false}
				onSuccess={() => {
					setShowComponent('view_billing_addresses');
					refetch?.();
					setInvoiceToTradePartyDetails({});
				}}
				onFailure={({ error }) => {
					Toast.error(error.data);
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
							setShowComponent('view_billing_addresses');
							setInvoiceToTradePartyDetails({});
						},
					},
				]}
				loading={false}
				validateGst={countryIdForAddressForm === INDIA_COUNTRY_ID}
				registrationNumber={
					registrationNumber || organizationRegistrationNumber
				}
			/> */}
		</div>
	);
}

export default CreateNewBillingAddress;
