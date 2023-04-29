import { useState } from 'react';

import List from '../../commons/List';

import { ADVANCE_CONFIG } from './Columns/advanceConfig';
import EmptyState from './common/EmptyState';
import useGetAdvancePaymentList from './hooks/useGetAdvancePaymentList';
import AmountWithCurrency from './renderFunction/AmountWithCurrency';
import ApprovedBy from './renderFunction/ApprovedBy';
import Entity from './renderFunction/Entity';
import IncidentNumber from './renderFunction/IncidentNumber';
import OrganizationName from './renderFunction/OrganizationName';
import RequestedBy from './renderFunction/RequestedBy';
import SIDnumber from './renderFunction/SIDnumber';
import SelectFilters from './SelectFilters';
import styles from './styles.module.css';

interface EntityType {
	entityCode:string
}
interface ItemProps {
	activeEntity:string;
}
interface OrganizationTypes {
	organizationName:string,
}
interface NameType {
	name:string,
}
interface ByProps {
	name:string
}

interface PropsType {
	advanceDocumentBuyerAddress:EntityType,
	advanceDocumentSellerAddress:OrganizationTypes,
	advanceDocumentId?:string,
	approvedAt:Date,
	approvedBy:NameType,
	organizationName:string,
	id:string,
	requestedAt:Date,
	requestedBy:ByProps,
	jobNumber:string,
	sid:string,
	serviceType:string,
	payableAmount:number,
	currency:string,
	incidentRefNo:string,
}

function AdvancePayment({ activeEntity }:ItemProps) {
	const [sort, setSort] = useState({});
	const { filters, setFilters, data, loading } = useGetAdvancePaymentList({ activeEntity, sort });
	const { pageIndex, list } = data || {};
	const functions = {
		renderAmountWithCurrency: (itemData:PropsType) => (
			<AmountWithCurrency itemData={itemData} />
		),
		renderIncidentNumber: (itemData:PropsType) => (
			<IncidentNumber itemData={itemData} />
		),
		renderSIDnumber: (itemData:PropsType) => (
			<SIDnumber itemData={itemData} />
		),
		renderOrganization: (itemData:PropsType) => (
			<OrganizationName itemData={itemData} />
		),
		renderRequestedBy: (itemData:PropsType) => (
			<RequestedBy itemData={itemData} />
		),
		renderApprovedBy: (itemData:PropsType) => (
			<ApprovedBy itemData={itemData} />
		),
		renderEntityCode: (itemData:PropsType) => (
			<Entity itemData={itemData} />
		),
	};

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<SelectFilters
					filters={filters}
					setFilters={setFilters}
					activeEntity={activeEntity}
					createButton="createButton"
				/>
			</div>
			<div className={styles.list}>
				{loading || list?.length > 0
					? (
						<List
							itemData={data}
							config={ADVANCE_CONFIG}
							functions={functions}
							loading={loading}
							sort={sort}
							setSort={setSort}
							page={pageIndex}
							pageSize={10}
							handlePageChange={(val: number) => setFilters({
								...filters,
								pageIndex: val,
							})}
							showPagination
						/>
					)
					:				<EmptyState />}
			</div>
		</div>
	);
}
export default AdvancePayment;
