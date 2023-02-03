import { Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import useShipmentIdView from '../../hook/useShipmentIdView';

// eslint-disable-next-line import/no-cycle
import AccordianCards from './AccordianCards/index';
import Filters from './Filters';
import LoadingState from './LoadingState/index';
import styles from './styles.module.css';

export interface ItemDataProps {
	organizationId?: string;
	jobType?: string;
	jobSource?: string;
	jobNumber?: string;
	expense_total_price?: number;
	serial_id?: string;
	pending_approvals?: number;
	shipment_type?: string;
	expense_count?: number;
	expense_total_currency?: string;
	urgency_expense_count?: number;
	urgency_total_price?: number;
	urgency_total_currency?: string;
	income_count?: number;
	credit_expense_count?: number;
	credit_total_price?: number;
	quotation_profit?: string;
	tentative_profit?: string;
	income_total_price?: number;
	income_total_currency?: string;
	id?: string;
	is_job_closed?: boolean;
}

function ShipmentIdView() {
	const [currentOpenSID, setCurrentOpenSID] = useState('');
	const [pendingApproval, setPendingApproval] = useState('all');
	const [serialId, setSerialId] = useState('');
	const {
		hookSetters,
		page,
		filters,
		loading,
		list: { total, data },
	} = useShipmentIdView({ pendingApproval, serial_id: serialId });

	const handleShipmentView = () => {
		if (loading) {
			return (
				<div style={{ marginTop: '10px' }}>
					{[1, 2, 3, 4, 5].map(() => <LoadingState />)}
				</div>
			);
		}
		return data?.map((item: ItemDataProps) => (
			<AccordianCards
				itemData={item}
				currentOpenSID={currentOpenSID}
				setCurrentOpenSID={setCurrentOpenSID}
				key={item?.id}
			/>
		));
	};

	return (
		<div>
			<Filters
				hookSetters={hookSetters}
				filters={filters}
				pendingApproval={pendingApproval}
				setPendingApproval={setPendingApproval}
				serialId={serialId}
				setSerialId={setSerialId}
			/>

			<div>
				{handleShipmentView()}
				{data.length > 0 ? (
					<div className={styles.pagination}>
						<Pagination
							currentPage={page}
							onPageChange={(val: number) => hookSetters.setFilters({
								...filters,
								page: val,
							})}
							totalItems={total}
							pageSize={10}
							type="table"
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default ShipmentIdView;
