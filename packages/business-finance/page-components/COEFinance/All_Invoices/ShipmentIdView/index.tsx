import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useShipmentIdView from '../../hook/useShipmentIdView';

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
	expenseTotalAmount: string,
	sellQuoteCount?: number,
	sellQuoteTotalAmount?: string,
	buyQuoteCount?: number,
	buyQuoteTotalAmount?: string,
	serviceType: string,
	discountAppliedKam: number,
	discountAppliedRevenueDesk: number,
	pendingApprovalCount: number,
	urgentCount: number,
	urgentTotalAmount: number,
	creditNoteCount: number,
	creditNoteTotalAmount: number,
	buyQuotationCount?: number,
	buyQuotationTotalAmount?: number,
	sellQuotationCount?: number,
	sellQuotationTotalAmount?: number,
	amountCurrency?: string,
}

function ShipmentIdView() {
	const [currentOpenSID, setCurrentOpenSID] = useState('');
	const [pendingApproval, setPendingApproval] = useState('all');
	const [serialId, setSerialId] = useState('');
	const {
		hookSetters,
		pageNo,
		filters,
		loading,
		shipmentData,
		list: { data },
	} = useShipmentIdView({ invoicesRequired: pendingApproval, shipmentId: serialId });
	const { totalRecords } = shipmentData || {};

	function HandleShipmentView() {
		if (loading) {
			return (
				<div style={{ marginTop: '10px' }}>
					{[1, 2, 3, 4, 5].map((val) => <LoadingState key={val} />)}
				</div>
			);
		}
		if (isEmpty(data)) {
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
	}

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
				<HandleShipmentView />
				{!isEmpty(data) ? (
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
