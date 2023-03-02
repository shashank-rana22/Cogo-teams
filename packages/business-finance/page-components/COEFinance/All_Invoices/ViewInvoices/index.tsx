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
	});
	const [overAllRemark, setOverAllRemark] = useState('');
	const [lineItemsRemarks, setLineItemsRemarks] = useState({});
	const [lineItem, setLineItem] = useState(false);
	const {
		data:  fullResponse,
		refetch: getBillRefetch,
		accPaymentLoading,
		paymentsData,
	} = useGetBill({ billId, orgId });

	return (
		<div>
			<Header
				data={fullResponse}
				remarksVal={remarksVal}
				overAllRemark={overAllRemark}
				setOverAllRemark={setOverAllRemark}
				lineItemsRemarks={lineItemsRemarks}
				lineItem={lineItem}
				status={status}
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
