import { useFieldArray } from '@cogoport/forms';
import { useState } from 'react';

import useCreateOrganizationBillingAddress from '../../../../../../hooks/useCreateOrganizationBillingAddress';

import AddressForm from '../AddressForm';
import styles from './styles.module.css';

function CreateNewBillingAddress({
	setShowComponent = () => {},
	organizationDetails = {},
	refetch = () => {},
	invoiceToTradePartyDetails,
}) {
	const [isAddressRegisteredUnderGst, setIsAddressRegisteredUnderGst] = useState(false);
	const [gstNumber, setGstNumber] = useState('');
	const {
		id = '',
	} = organizationDetails;

	const {
		registrationNumber = '',
		tradePartyId = '',
	} = invoiceToTradePartyDetails;

	const {
		errors, handleSubmit, register,
		control, setValue, onSubmit,
	} = useCreateOrganizationBillingAddress({ id, tradePartyId, gstNumber, refetch, setShowComponent });

	return (
		<div className={styles.container}>
			<AddressForm
				control={control}
				useFieldArray={useFieldArray}
				register={register}
				handleSubmit={handleSubmit}
				errors={errors}
				setValue={setValue}
				onSubmit={onSubmit}
				gstNumber={gstNumber}
				setGstNumber={setGstNumber}
				setShowComponent={setShowComponent}
				registrationNumber={registrationNumber}
				isAddressRegisteredUnderGst={isAddressRegisteredUnderGst}
				setIsAddressRegisteredUnderGst={setIsAddressRegisteredUnderGst}
			/>
		</div>
	);
}

export default CreateNewBillingAddress;
