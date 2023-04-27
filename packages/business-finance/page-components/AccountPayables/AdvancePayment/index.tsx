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

interface ItemProps {
	activeEntity:string;
}

function AdvancePayment({ activeEntity }:ItemProps) {
	const [sort, setSort] = useState({});
	const { filters, setFilters, data, loading } = useGetAdvancePaymentList({ activeEntity, sort });
	const { pageIndex, list } = data || {};
	const functions = {
		renderAmountWithCurrency: (itemData) => (
			<AmountWithCurrency itemData={itemData} />
		),
		renderIncidentNumber: (itemData) => (
			<IncidentNumber itemData={itemData} />
		),
		renderSIDnumber: (itemData) => (
			<SIDnumber itemData={itemData} />
		),
		renderOrganization: (itemData) => (
			<OrganizationName itemData={itemData} />
		),
		renderRequestedBy: (itemData) => (
			<RequestedBy itemData={itemData} />
		),
		renderApprovedBy: (itemData) => (
			<ApprovedBy itemData={itemData} />
		),
		renderEntityCode: (itemData) => (
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
