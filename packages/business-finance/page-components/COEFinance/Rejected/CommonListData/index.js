import Modals from '@cogoport/ticket-management/common/Modals';
import React, { useState } from 'react';

import List from '../../../commons/List';
import FieldPair from '../../All_Invoices/PurchaseInvoiceView/RenderData/FiledPair';
import FormatedDate from '../../All_Invoices/PurchaseInvoiceView/RenderData/FormatedDate';
import RenderCustomer from '../../All_Invoices/PurchaseInvoiceView/RenderData/RenderCustomer/index';
import RenderRemarks from '../../All_Invoices/PurchaseInvoiceView/RenderData/RenderRemarks';
import RenderStatus from '../../All_Invoices/PurchaseInvoiceView/RenderData/RenderStatus';
import RenderUrgencyTag from '../../All_Invoices/PurchaseInvoiceView/RenderData/RenderUrgencyTag';
import RenderViewMoreButton from '../../All_Invoices/PurchaseInvoiceView/RenderData/RenderViewMoreButton';
import constAdvocateConfig from '../../configurations/COST_ADVOCATE_LIST';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';

import RejectedCharts from './RejectedChart/index';
import RenderActionButton from './RenderActionButton';
import RenderApprovalStatus from './RenderApprovalStatus';
import RenderTicket from './RenderTicket';
import SegmentedFilters from './SegmentedFilters';

const CHART_INCLUDED_TABS = ['coe_rejected', 'coe_on_hold'];

function CommonListData({ filters, setFilters, subActiveTabReject }) {
	const [sort, setSort] = useState({});
	const [showReassign, setShowReassign] = useState(false);
	const [modalData, setModalData] = useState({});

	const { data, loading, setSearchValue, searchValue, refetch } =	useGetPurchaseViewList({
		filters,
		setFilters,
		sort,
		subActiveTabReject,
	});

	const config = constAdvocateConfig(subActiveTabReject);

	const functions = {
		renderStatus    : (itemData) => <RenderStatus item={itemData} />,
		renderFieldPair : (itemData, field) => (
			<FieldPair itemData={itemData} field={field} />
		),
		renderCustomer: (itemData, field) => (
			<RenderCustomer itemData={itemData} field={field} />
		),
		renderFormate: (itemData, field) => (
			<FormatedDate item={itemData} field={field} />
		),
		renderRemarks: (itemData) => (
			<RenderRemarks item={itemData} />
		),
		renderViewMore: (itemData) => (
			<RenderViewMoreButton itemData={itemData} />
		),
		renderAction: (itemData) => (
			<RenderActionButton itemData={itemData} refetch={refetch} />
		),
		renderUrgencyTag: (itemData, field) => (
			<RenderUrgencyTag item={itemData} field={field} />
		),
		renderTicket: (itemData) => (
			<RenderTicket
				itemData={itemData}
				setModalData={setModalData}
			/>
		),
		renderApprovalStatus: (itemData) => (
			<RenderApprovalStatus itemData={itemData} />
		),
	};

	return (
		<div>
			{
			(CHART_INCLUDED_TABS.includes(subActiveTabReject)) ? (
				<RejectedCharts
					subActiveTabReject={subActiveTabReject}
					setFilters={setFilters}
				/>
			) : null
			}

			<SegmentedFilters
				filters={filters}
				setFilters={setFilters}
				setSearchValue={setSearchValue}
				searchValue={searchValue}
			/>
			<List
				config={config}
				itemData={data}
				functions={functions}
				loading={loading}
				sort={sort}
				setSort={setSort}
				page={filters.pageIndex || 1}
				handlePageChange={(pageValue) => {
					setFilters((p) => ({
						...p,
						pageIndex: pageValue,
					}));
				}}
				subActiveTab={subActiveTabReject}
				showPagination
			/>
			<Modals
				modalData={modalData}
				setModalData={setModalData}
				showReassign={showReassign}
				setShowReassign={setShowReassign}
			/>
		</div>
	);
}
export default CommonListData;
