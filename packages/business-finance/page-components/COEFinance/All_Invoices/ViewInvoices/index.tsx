import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetBill from '../../hook/useGetBill';

import Header from './Header/index';
import InvoiceDetails from './InvoiceDetails/index';
import ShipmentDetails from './ShipmentDetails/index';
import SupplierDetails from './SupplierDetails/index';

function ViewInvoices() {
	const { query } = useRouter();
	const { billId, orgId, jobNumber, status } = query;
	const [remarksVal, setRemarksVal] = useState({
		collectionPartyRemark : '',
		billingPartyRemark    : '',
		invoiceDetailsRemark  : '',
		overallRemark         : '',
	});
	const [lineItemsRemarks, setLineItemsRemarks] = useState({});
	const [lineItem, setLineItem] = useState(false);
	const {
		list: { fullResponse },
		refetch: getBillRefetch,
		accPaymentLoading,
		paymentsData,
	} = useGetBill({ billId, orgId });

	return (
		<div>
			<Header
				data={fullResponse}
				remarksVal={remarksVal}
				lineItemsRemarks={lineItemsRemarks}
				lineItem={lineItem}
				status={status}
				setRemarksVal={setRemarksVal}
			/>

			<SupplierDetails
				data={fullResponse}
				paymentsData={paymentsData}
				accPaymentLoading={accPaymentLoading}
			/>

			<InvoiceDetails data={fullResponse} getBillRefetch={getBillRefetch} />

			<ShipmentDetails
				data={fullResponse}
				orgId={query?.orgId || ''}
				jobNumber={jobNumber}
				remarksVal={remarksVal}
				setRemarksVal={setRemarksVal}
				lineItemsRemarks={lineItemsRemarks}
				setLineItemsRemarks={setLineItemsRemarks}
				setLineItem={setLineItem}
				lineItem={lineItem}
				status={status}
			/>
		</div>
	);
}

export default ViewInvoices;
