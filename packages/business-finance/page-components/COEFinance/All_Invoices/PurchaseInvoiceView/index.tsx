import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import { GenericObject } from '../../../commons/Interfaces/index';
import List from '../../../commons/List/index';
import PURCHASE_VIEW_CONFIG from '../../configurations/PURCHASE_VIEW_LIST';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';

import { FieldProps } from './interfaces/index';
import FieldPair from './RenderData/FiledPair/index';
import FormatedDate from './RenderData/FormatedDate/index';
import RenderCustomer from './RenderData/RenderCustomer/index';
import RenderRemarks from './RenderData/RenderRemarks/index';
import RenderStatus from './RenderData/RenderStatus/index';
import RenderUrgencyTag from './RenderData/RenderUrgencyTag/index';
import RenderViewMoreButton from './RenderData/RenderViewMoreButton/index';
import SegmentedFilters from './SegmentedFilters/index';

interface ItemProps {
	createdDate: Date;
	billDate: Date;
	dueDate: Date;
	billCurrency: string;
	subTotal: number;
	grandTotal: number;
	status: string;
	billType: string;
	billDocumentUrl: string;
	serviceType: string;
	billNumber: string;
	isProforma: boolean;
	jobNumber: string;
	organizationName: string;
	urgencyTag: Array<string>;
	remarksTimeline?: Array<{
		billStatus: string;
		remark: string;
		createdAt: Date;
	}>;
}
interface Props {
	filters: GenericObject;
	setFilters: (p: object) => void;
	subActiveTab: string;
	statsData?:object
}

function PurchaseInvoice({ filters, setFilters, subActiveTab, statsData }: Props) {
	const { query } = useRouter();
	const { jobNumber } = query || {};

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
	} = useGetPurchaseViewList({ filters, setFilters, sort, jobNumber });

	const functions = {
		renderStatus    : (itemData: ItemProps) => <RenderStatus item={itemData} />,
		renderFieldPair : (itemData: ItemProps, field: FieldProps) => (
			<FieldPair itemData={itemData} field={field} />
		),
		renderCustomer: (itemData: ItemProps, field: FieldProps) => (
			<RenderCustomer itemData={itemData} field={field} />
		),
		renderFormate: (itemData: ItemProps, field: FieldProps) => (
			<FormatedDate item={itemData} field={field} />
		),
		renderRemarks  : (itemData: ItemProps) => <RenderRemarks item={itemData} />,
		renderViewMore : (itemData: ItemProps) => (
			<RenderViewMoreButton itemData={itemData} />
		),
		renderUrgencyTag: (itemData: ItemProps, field: FieldProps) => (
			<RenderUrgencyTag item={itemData} field={field} />
		),
	};

	return (
		<div>
			<SegmentedFilters
				filters={filters}
				statsData={statsData}
				setFilters={setFilters}
				setSearchValue={setSearchValue}
				searchValue={searchValue}
				tab={tab}
				setTab={setTab}
				currentTab={currentTab}
				setCurrentTab={setCurrentTab}
			/>
			<List
				config={PURCHASE_VIEW_CONFIG}
				itemData={data}
				functions={functions}
				loading={loading}
				sort={sort}
				setSort={setSort}
				page={filters.pageIndex || 1}
				handlePageChange={(pageValue: number) => {
					setFilters((p: GenericObject) => ({ ...p, pageIndex: pageValue }));
				}}
				subActiveTab={subActiveTab}
				showPagination
			/>
		</div>
	);
}

export default PurchaseInvoice;
