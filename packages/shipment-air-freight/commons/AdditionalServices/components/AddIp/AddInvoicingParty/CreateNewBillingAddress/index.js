import { Toast } from '@cogoport/components';
import { useState } from 'react';

import CONSTANTS from '../../../../../../constants/CONSTANTS';
import useCreateOrganizationAddress from '../../../../../../hooks/useCreateOrganizationAddress';
import AddressForm from '../common/AddressForm';

import styles from './styles.module.css';

function CreateNewBillingAddress({
	setShowComponent = () => {},
	organizationDetails = {},
	refetch = () => {},
	invoiceToTradePartyDetails,
}) {
	const [isAddressRegisteredUnderGst, setIsAddressRegisteredUnderGst] = useState(false);
	const [gstNumber, setGstNumber] = useState('');

	const { id = '' } = organizationDetails;

	const {
		registrationNumber = '',
		tradePartyId = '',
	} = invoiceToTradePartyDetails;

	const afterCreateBillingAddress = () => {
		refetch();
		setShowComponent('view_billing_addresses');
	};

	const { apiTrigger } = useCreateOrganizationAddress({
		refetch        : afterCreateBillingAddress,
		successMessage : 'Billing address created successfully',
	});

	const onSubmit = (values) => {
		if (values?.poc_details?.length === CONSTANTS.EMPTY_LIST_LENGTH) {
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
				refetch={refetch}
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
