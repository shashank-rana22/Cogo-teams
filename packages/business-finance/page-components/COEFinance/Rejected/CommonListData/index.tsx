import { useState } from 'react';

import { GenericObject } from '../../../commons/Interfaces';
import List from '../../../commons/List';
import { FieldProps } from '../../All_Invoices/PurchaseInvoiceView/interfaces';
import FieldPair from '../../All_Invoices/PurchaseInvoiceView/RenderData/FiledPair';
import FormatedDate from '../../All_Invoices/PurchaseInvoiceView/RenderData/FormatedDate';
import RenderCustomer from '../../All_Invoices/PurchaseInvoiceView/RenderData/RenderCustomer/index';
import RenderRemarks from '../../All_Invoices/PurchaseInvoiceView/RenderData/RenderRemarks';
import RenderStatus from '../../All_Invoices/PurchaseInvoiceView/RenderData/RenderStatus';
import RenderUrgencyTag from '../../All_Invoices/PurchaseInvoiceView/RenderData/RenderUrgencyTag';
import RenderViewMoreButton from '../../All_Invoices/PurchaseInvoiceView/RenderData/RenderViewMoreButton';
import PURCHASE_VIEW_CONFIG from '../../configurations/PURCHASE_VIEW_LIST';
import useGetPurchaseViewList from '../../hook/usePurchaseViewList';

import SegmentedFilters from './SegmentedFilters';

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
	subActiveTabReject: string;
}

function CommonListData({ filters, setFilters, subActiveTabReject }: Props) {
	const [sort, setSort] = useState({});

	const {
		data,
		loading,
		setSearchValue,
		searchValue,
	} = useGetPurchaseViewList({ filters, setFilters, sort, subActiveTabReject });

	const functions: any = {
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
				setFilters={setFilters}
				setSearchValue={setSearchValue}
				searchValue={searchValue}
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
				subActiveTab={subActiveTabReject}
				showPagination
			/>
		</div>
	);
}
export default CommonListData;
