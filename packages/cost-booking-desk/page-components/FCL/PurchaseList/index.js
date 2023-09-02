import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
// import Loader from '../../../common/Loader';
// import useListPurchaseAdvanceDocument from '../../../hooks/useListPurchaseAdvanceDocument';

import getColumns from './getColumns';
import Header from './Header';
import styles from './styles.module.css';
import ViewRefundModal from './ViewRefundModal';
import ViewRequestModal from './ViewRequestedModal';

function PurchaseList() {
	const [searchValue, setSearchValue] = useState('');
	// const { loading, data, pagination, setPagination } = useListPurchaseAdvanceDocument(searchValue);
	// const { list = [], total_count, page_limit } = data || {};

	const [viewRequestModal, setViewRequestModal] = useState(false);
	const [viewRefundModal, setViewRefundModal] = useState(false);

	const columns = getColumns({ setViewRequestModal });

	const LIST = [];

	// const list = [
	// 	{
	// 		advanceDocumentId            : 20,
	// 		advanceDocumentNo            : 'ADV2324000000013',
	// 		type                         : 'CONTAINER_SECURITY_DEPOSIT',
	// 		details                      : { },
	// 		status                       : 'APPROVED',
	// 		currency                     : 'INR',
	// 		exchangeRate                 : 1.0,
	// 		tdsAmount                    : 0.0,
	// 		payableAmount                : 0.0,
	// 		jobId                        : 188486,
	// 		jobNumber                    : '189161',
	// 		jobSource                    : 'LOGISTICS',
	// 		jobType                      : 'SHIPMENT',
	// 		serviceType                  : 'testing',
	// 		refundable                   : true,
	// 		hasPayrun                    : false,
	// 		paymentStatus                : 'PENDING',
	// 		advanceDocumentSellerAddress : {
	// 			companyType          : 'SELLER',
	// 			entityCode           : 301,
	// 			organizationSerialId : 24918,
	// 			organizationId       : 'ab491d57-effb-4c93-8f9a-b06072048e10',
	// 			organizationName     : 'Cogoport Test',
	// 			taggedOrganizationId : '541d1232-58ce-4d64-83d6-556a42209eb7',
	// 			tradePartyMappingId  : 'b0e784f9-bb98-4f2f-93a9-5715304e3e1d',
	// 		},
	// 		advanceDocumentBuyerAddress: {
	// 			companyType          : 'BUYER',
	// 			entityCode           : 301,
	// 			organizationSerialId : 24918,
	// 			organizationId       : 'ab491d57-effb-4c93-8f9a-b06072048e10',
	// 			organizationName     : 'Cogoport Test',
	// 			taggedOrganizationId : '541d1232-58ce-4d64-83d6-556a42209eb7',
	// 			tradePartyMappingId  : 'b0e784f9-bb98-4f2f-93a9-5715304e3e1d',
	// 		},
	// 		advanceDocumentSellerBankDetail: {
	// 			bankName      : 'Cogoport',
	// 			ifscCode      : 'cogoport',
	// 			accountNumber : 'Test',
	// 		},
	// 		requestedAt         : 1693467194914,
	// 		tradeType           : 'export',
	// 		originLocation      : 'Jawaharlal Nehru (Nhava Sheva) (INNSA), Mumbai, India',
	// 		destinationLocation : 'Jebel Ali (AEJEA), Dubai, United Arab Emirates',
	// 		serviceProvider     : 'COGO LINE',
	// 		shipmentType        : 'fcl_freight',
	// 		reconciled          : false,
	// 		serialId            : '189161',
	// 	},
	// 	{
	// 		advanceDocumentId            : 20,
	// 		advanceDocumentNo            : 'ADV2324000000013',
	// 		type                         : 'CONTAINER_SECURITY_DEPOSIT',
	// 		details                      : { },
	// 		status                       : 'APPROVED',
	// 		currency                     : 'INR',
	// 		exchangeRate                 : 1.0,
	// 		tdsAmount                    : 0.0,
	// 		payableAmount                : 0.0,
	// 		jobId                        : 188486,
	// 		jobNumber                    : '189161',
	// 		jobSource                    : 'LOGISTICS',
	// 		jobType                      : 'SHIPMENT',
	// 		serviceType                  : 'testing',
	// 		refundable                   : true,
	// 		hasPayrun                    : false,
	// 		paymentStatus                : 'PENDING',
	// 		advanceDocumentSellerAddress : {
	// 		  companyType          : 'SELLER',
	// 		  entityCode           : 301,
	// 		  organizationSerialId : 24918,
	// 		  organizationId       : 'ab491d57-effb-4c93-8f9a-b06072048e10',
	// 		  organizationName     : 'Cogoport Test',
	// 		  taggedOrganizationId : '541d1232-58ce-4d64-83d6-556a42209eb7',
	// 		  tradePartyMappingId  : 'b0e784f9-bb98-4f2f-93a9-5715304e3e1d',
	// 		},
	// 		advanceDocumentBuyerAddress: {
	// 		  companyType          : 'BUYER',
	// 		  entityCode           : 301,
	// 		  organizationSerialId : 24918,
	// 		  organizationId       : 'ab491d57-effb-4c93-8f9a-b06072048e10',
	// 		  organizationName     : 'Cogoport Test',
	// 		  taggedOrganizationId : '541d1232-58ce-4d64-83d6-556a42209eb7',
	// 		  tradePartyMappingId  : 'b0e784f9-bb98-4f2f-93a9-5715304e3e1d',
	// 		},
	// 		advanceDocumentSellerBankDetail: {
	// 		  bankName      : 'Cogoport',
	// 		  ifscCode      : 'cogoport',
	// 		  accountNumber : 'Test',
	// 		},
	// 		requestedAt         : 1693467194914,
	// 		tradeType           : 'export',
	// 		originLocation      : 'Jawaharlal Nehru (Nhava Sheva) (INNSA), Mumbai, India',
	// 		destinationLocation : 'Jebel Ali (AEJEA), Dubai, United Arab Emirates',
	// 		serviceProvider     : 'COGO LINE',
	// 		shipmentType        : 'fcl_freight',
	// 		reconciled          : false,
	// 		serialId            : '189161',
	// 	},
	// 	{
	// 		advanceDocumentId            : 20,
	// 		advanceDocumentNo            : 'ADV2324000000013',
	// 		type                         : 'CONTAINER_SECURITY_DEPOSIT',
	// 		details                      : { },
	// 		status                       : 'APPROVED',
	// 		currency                     : 'INR',
	// 		exchangeRate                 : 1.0,
	// 		tdsAmount                    : 0.0,
	// 		payableAmount                : 0.0,
	// 		jobId                        : 188486,
	// 		jobNumber                    : '189161',
	// 		jobSource                    : 'LOGISTICS',
	// 		jobType                      : 'SHIPMENT',
	// 		serviceType                  : 'testing',
	// 		refundable                   : true,
	// 		hasPayrun                    : false,
	// 		paymentStatus                : 'PENDING',
	// 		advanceDocumentSellerAddress : {
	// 		  companyType          : 'SELLER',
	// 		  entityCode           : 301,
	// 		  organizationSerialId : 24918,
	// 		  organizationId       : 'ab491d57-effb-4c93-8f9a-b06072048e10',
	// 		  organizationName     : 'Cogoport Test',
	// 		  taggedOrganizationId : '541d1232-58ce-4d64-83d6-556a42209eb7',
	// 		  tradePartyMappingId  : 'b0e784f9-bb98-4f2f-93a9-5715304e3e1d',
	// 		},
	// 		advanceDocumentBuyerAddress: {
	// 		  companyType          : 'BUYER',
	// 		  entityCode           : 301,
	// 		  organizationSerialId : 24918,
	// 		  organizationId       : 'ab491d57-effb-4c93-8f9a-b06072048e10',
	// 		  organizationName     : 'Cogoport Test',
	// 		  taggedOrganizationId : '541d1232-58ce-4d64-83d6-556a42209eb7',
	// 		  tradePartyMappingId  : 'b0e784f9-bb98-4f2f-93a9-5715304e3e1d',
	// 		},
	// 		advanceDocumentSellerBankDetail: {
	// 		  bankName      : 'Cogoport',
	// 		  ifscCode      : 'cogoport',
	// 		  accountNumber : 'Test',
	// 		},
	// 		requestedAt         : 1693467194914,
	// 		tradeType           : 'export',
	// 		originLocation      : 'Jawaharlal Nehru (Nhava Sheva) (INNSA), Mumbai, India',
	// 		destinationLocation : 'Jebel Ali (AEJEA), Dubai, United Arab Emirates',
	// 		serviceProvider     : 'COGO LINE',
	// 		shipmentType        : 'fcl_freight',
	// 		reconciled          : false,
	// 		serialId            : '189161',
	// 	},
	// ];

	return (
		<div>
			<Header
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>
			{/* {loading ? <Loader /> : ( */}
			<div className={styles.table_container}>
				<Table
					columns={columns}
					data={LIST}
				/>
				{isEmpty(LIST) ? <EmptyState /> : null}
				{/* <div className={styles.footer}>
					<Pagination
						type="table"
						currentPage={pagination}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={setPagination}
					/>
				</div> */}
			</div>
			{/* )} */}
			{viewRequestModal ? (
				<ViewRequestModal
					viewRequestModal={viewRequestModal}
					setViewRequestModal={setViewRequestModal}
				/>
			) : null}
			{viewRefundModal ? (
				<ViewRefundModal
					viewRefundModal={viewRefundModal}
					setViewRefundModal={setViewRefundModal}
				/>
			) : null}
		</div>
	);
}

export default PurchaseList;
