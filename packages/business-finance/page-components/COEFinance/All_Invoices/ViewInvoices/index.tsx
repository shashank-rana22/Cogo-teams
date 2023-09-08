import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetBill from '../../hook/useGetBill';

import Header from './Header/index';
import ShipmentDetails from './ShipmentDetails/index';

function ViewInvoices() {
	const { query } = useRouter();
	const { billId, orgId, status, jobNumber, jobType } = query || {};
	const [remarksVal, setRemarksVal] = useState({
		collectionPartyRemark : [],
		billingPartyRemark    : [],
		invoiceDetailsRemark  : [],
		taggingRemark         : [],
	});
	const [overAllRemark, setOverAllRemark] = useState('');
	const [lineItemsRemarks, setLineItemsRemarks] = useState({});
	const [lineItem, setLineItem] = useState(false);
	const {
		data:  fullResponse,
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
				jobNumber={jobNumber}
				status={status}
			/>

			<ShipmentDetails
				data={fullResponse}
				remarksVal={remarksVal}
				setRemarksVal={setRemarksVal}
				lineItemsRemarks={lineItemsRemarks}
				setLineItemsRemarks={setLineItemsRemarks}
				setLineItem={setLineItem}
				lineItem={lineItem}
				status={status}
				jobType={jobType}
				billId={billId}
			/>
		</div>
	);
}

export default ViewInvoices;
