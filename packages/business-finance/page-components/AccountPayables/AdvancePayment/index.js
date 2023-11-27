import { useState } from 'react';

import List from '../../commons/List';
import EmptyState from '../../commons/StyledTable/EmptyState';

import { ADVANCE_CONFIG } from './Columns/advanceConfig';
import useGetAdvancePaymentList from './hooks/useGetAdvancePaymentList';
import AmountWithCurrency from './renderFunction/AmountWithCurrency';
import ApprovedBy from './renderFunction/ApprovedBy';
import Entity from './renderFunction/Entity';
import IncidentNumber from './renderFunction/IncidentNumber';
import OrganizationName from './renderFunction/OrganizationName';
import PaymentStatus from './renderFunction/PaymentStatus';
import RequestedBy from './renderFunction/RequestedBy';
import SIDnumber from './renderFunction/SIDnumber';
import SelectFilters from './SelectFilters';
import styles from './styles.module.css';

function AdvancePayment({ activeEntity = '' }) {
	const [sort, setSort] = useState({});
	const { filters, setFilters, data, loading } = useGetAdvancePaymentList({ activeEntity, sort });
	const { pageIndex, list = [] } = data || {};
	const listLength = list.length;
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
		renderPaymentStatus: (itemData) => (
			<PaymentStatus itemData={itemData} />
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
				{listLength > 0
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
							handlePageChange={(val) => setFilters({
								...filters,
								pageIndex: val,
							})}
							showPagination
						/>
					)
					:				<EmptyState imageFind="NoInoiceFound" imgHeight="imageHeight" />}
			</div>
		</div>
	);
}
export default AdvancePayment;
