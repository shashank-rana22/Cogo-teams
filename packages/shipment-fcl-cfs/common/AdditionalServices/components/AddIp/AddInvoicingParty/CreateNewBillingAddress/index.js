import { Toast } from '@cogoport/components';
import { useForm, useFieldArray } from '@cogoport/forms';
import { useState } from 'react';

import useCreateOrganizationAddress from '../../../../../../../shipment-fcl-freight/hooks/useCreateOrganizationAddress';
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
		handleSubmit,
		control,
		register,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			poc_details: [{ name: '', email: '', mobile_country_code: '', mobile_number: '' }],
		},
	});

	const afterCreateBillingAddress = () => {
		refetch();
		setShowComponent('view_billing_addresses');
	};

	const { apiTrigger } = useCreateOrganizationAddress({
		refetch        : afterCreateBillingAddress,
		successMessage : 'Billing address created successfully',
	});

	const onSubmit = (values) => {
		if (values?.poc_details?.length === 0) {
			Toast.info('Please create at-least one POC before proceeding ');
			return;
		}
		const payload = {
			...values,
			organization_id             : id,
			organization_trade_party_id : tradePartyId,
			tax_number                  : gstNumber,
		};

		apiTrigger(payload);
	};

	return (
		<div className={styles.container}>
			<AddressForm
				control={control}
				useFieldArray={useFieldArray}
				register={register}
				handleSubmit={handleSubmit}
				refetch={refetch}
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
