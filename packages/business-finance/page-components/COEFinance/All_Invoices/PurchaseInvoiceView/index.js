import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import List from '../../../commons/List/index';
import PURCHASE_VIEW_CONFIG from '../../configurations/PURCHASE_VIEW_LIST';
import useGetListStats from '../../hook/useGetListStats';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';

import FieldPair from './RenderData/FiledPair/index';
import FormatedDate from './RenderData/FormatedDate/index';
import RenderCustomer from './RenderData/RenderCustomer/index';
import RenderRemarks from './RenderData/RenderRemarks';
import RenderStatus from './RenderData/RenderStatus/index';
import RenderUrgencyTag from './RenderData/RenderUrgencyTag/index';
import RenderViewMoreButton from './RenderData/RenderViewMoreButton/index';
import SegmentedFilters from './SegmentedFilters/index';

function PurchaseInvoice({ filters, setFilters, subActiveTab }) {
	const { query } = useRouter();
	const { searchValue:previouslySearched } = query || {};

	const [sort, setSort] = useState({});

	const {
		data,
		loading,
		setSearchValue,
		searchValue,
		currentTab,
		tab,
		setTab,
		setCurrentTab,
	} = useGetPurchaseViewList({ filters, setFilters, sort, previouslySearched });

	const { data:statsData, loading:statsLoading } = useGetListStats({ filters, searchValue });

	const { stat = {} } = statsData || {};

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
		renderRemarks  : (itemData) => <RenderRemarks item={itemData} />,
		renderViewMore : (itemData) => (
			<RenderViewMoreButton itemData={itemData} searchValue={searchValue} />
		),
		renderUrgencyTag: (itemData, field) => (
			<RenderUrgencyTag item={itemData} field={field} />
		),
	};

	return (
		<div>
			<SegmentedFilters
				filters={filters}
				statsData={stat}
				setFilters={setFilters}
				setSearchValue={setSearchValue}
				searchValue={searchValue}
				tab={tab}
				setTab={setTab}
				currentTab={currentTab}
				itemData={data}
				setCurrentTab={setCurrentTab}
			/>

			<List
				config={PURCHASE_VIEW_CONFIG}
				itemData={data}
				functions={functions}
				loading={loading || statsLoading}
				sort={sort}
				setSort={setSort}
				page={filters.pageIndex || 1}
				handlePageChange={(pageValue) => {
					setFilters((p) => ({ ...p, pageIndex: pageValue }));
				}}
				subActiveTab={subActiveTab}
				paginationType="number"
				showPagination
			/>
		</div>
	);
}

export default PurchaseInvoice;
