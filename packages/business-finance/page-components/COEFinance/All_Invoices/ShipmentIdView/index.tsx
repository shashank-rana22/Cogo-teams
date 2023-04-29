import { Pagination } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useShipmentIdView from '../../hook/useShipmentIdView';

// eslint-disable-next-line import/no-cycle
import AccordianCards from './AccordianCards/index';
import Filters from './Filters';
import LoadingState from './LoadingState/index';
import styles from './styles.module.css';

export interface ItemDataProps {
	jobId: string,
	jobNumber: string,
	jobStatus: string,
	quotationProfitability: number,
	tentativeProfitability: number,
	incomeCount: number,
	incomeTotalAmount: number,
	expenseCount: number,
	expenseTotalAmount: number,
	serviceType: string,
	discountAppliedKam: number,
	discountAppliedRevenueDesk: number,
	pendingApprovalCount: number,
	urgentCount: number,
	urgentTotalAmount: number,
	creditNoteCount: number,
	creditNoteTotalAmount: number
}

function ShipmentIdView() {
	const { query } = useRouter();
	const { jobNumber } = query || {};
	const [currentOpenSID, setCurrentOpenSID] = useState('');
	const [pendingApproval, setPendingApproval] = useState('all');
	const [serialId, setSerialId] = useState(jobNumber || '');
	const {
		hookSetters,
		pageNo,
		filters,
		loading,
		shipmentData,
		list: { data },
	} = useShipmentIdView({ invoicesRequired: pendingApproval, shipmentId: serialId });
	const { totalRecords } = shipmentData || {};

	const handleShipmentView = () => {
		if (loading) {
			return (
				<div style={{ marginTop: '10px' }}>
					{[1, 2, 3, 4, 5].map(() => <LoadingState />)}
				</div>
			);
		}
		if (data.length === 0) {
			return (
				<div className={styles.no_data}>
					No data Available
				</div>
			);
		}
		return data?.map((item: ItemDataProps) => (
			<AccordianCards
				itemData={item}
				currentOpenSID={currentOpenSID}
				setCurrentOpenSID={setCurrentOpenSID}
				key={item?.jobId}
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
							currentPage={pageNo}
							onPageChange={(val: number) => hookSetters.setFilters({
								...filters,
								page: val,
							})}
							totalItems={totalRecords}
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
