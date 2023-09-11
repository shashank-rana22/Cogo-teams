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
	const {
		data:  fullResponse,
	} = useGetBill({ billId, orgId });

	const [checkItem, setCheckItem] = useState({
		shipmentDetailsCheck : false,
		documentsCheck       : false,
		taggingCheck         : false,
		sidDataCheck         : false,
		collectionPartyCheck : false,
		billingPartyCheck    : false,
		invoiceDetailsCheck  : false,
		lineItemsCheck       : false,
	});

	return (
		<div>
			<Header
				data={fullResponse}
				remarksVal={remarksVal}
				overAllRemark={overAllRemark}
				setOverAllRemark={setOverAllRemark}
				lineItemsRemarks={lineItemsRemarks}
				jobNumber={jobNumber}
				status={status}
				checkItem={checkItem}
			/>

			<ShipmentDetails
				data={fullResponse}
				remarksVal={remarksVal}
				setRemarksVal={setRemarksVal}
				lineItemsRemarks={lineItemsRemarks}
				setLineItemsRemarks={setLineItemsRemarks}
				status={status}
				jobType={jobType}
				billId={billId}
				lineItemsCheck={checkItem?.lineItemsCheck}
				setCheckItem={setCheckItem}
			/>
		</div>
	);
}

export default ViewInvoices;
