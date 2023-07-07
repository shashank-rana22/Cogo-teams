import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetBill from '../../hook/useGetBill';

import Header from './Header/index';
import InvoiceDetails from './InvoiceDetails/index';
import ShipmentDetails from './ShipmentDetails/index';
import SupplierDetails from './SupplierDetails/index';
import Tagging from './Taggings';
import VendorDetail from './VendorDetails';

function ViewInvoices() {
	const { query } = useRouter();
	const { billId, orgId, status, jobNumber, jobType } = query || {};
	const [remarksVal, setRemarksVal] = useState({
		collectionPartyRemark : null,
		billingPartyRemark    : null,
		invoiceDetailsRemark  : null,
		taggingRemark         : null,
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
				jobNumber={jobNumber}
				status={status}
			/>
			<Tagging billId={billId} setRemarksVal={setRemarksVal} status={status} />

			{fullResponse?.billAdditionalObject?.shipmentType === 'ftl_freight'
			&& (
				<VendorDetail
					data={fullResponse}
				/>
			)}

			<SupplierDetails
				data={fullResponse}
				paymentsData={paymentsData}
				accPaymentLoading={accPaymentLoading}
			/>
			<InvoiceDetails data={fullResponse} getBillRefetch={getBillRefetch} />
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
			/>
		</div>
	);
}

export default ViewInvoices;
