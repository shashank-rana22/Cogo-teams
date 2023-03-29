import { useForm, useFieldArray } from '@cogoport/forms';
import { useState } from 'react';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';

import AddressForm from './AddressForm';
import styles from './styles.module.css';

// const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

function CreateNewBillingAddress({
	setShowComponent = () => {},
	organizationDetails = {},
	refetch = () => {},
	invoiceToTradePartyDetails,
	setInvoiceToTradePartyDetails,
}) {
	const [isAddressRegisteredUnderGst, setIsAddressRegisteredUnderGst] = useState(false);
	const {
		id = '',
		registration_number: organizationRegistrationNumber = '',
		country_id: organizationCountryId = '',
	} = organizationDetails;

	const {
		registrationNumber = '',
		countryId = '',
		tradePartyId = '',
	} = invoiceToTradePartyDetails;

	const countryIdForAddressForm = countryId || organizationCountryId;

	const {
		handleSubmit,
		control,
		register,
		setValue,
		formState: { errors },
	} = useForm();

	return (
		<div className={styles.container}>
			<AddressForm
				control={control}
				useFieldArray={useFieldArray}
				register={register}
				handleSubmit={handleSubmit}
				errors={errors}
				setValue={setValue}
				setShowComponent={setShowComponent}
				registrationNumber={registrationNumber}
				isAddressRegisteredUnderGst={isAddressRegisteredUnderGst}
				setIsAddressRegisteredUnderGst={setIsAddressRegisteredUnderGst}
			/>
		</div>
	);
}

export default CreateNewBillingAddress;
