import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useShipmentIdView from '../../hook/useShipmentIdView';

import AccordianCards from './AccordianCards/index';
import Filters from './Filters';
import LoadingState from './LoadingState/index';
import styles from './styles.module.css';

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
	} = useShipmentIdView({
		invoicesRequired : pendingApproval,
		shipmentId       : serialId,
	});
	const { totalRecords } = shipmentData || {};

	function HandleShipmentView() {
		if (loading) {
			return (
				<div style={{ marginTop: '10px' }}>
					{[1, 2, 3, 4, 5].map((val) => (
						<LoadingState key={val} />
					))}
				</div>
			);
		}
		if (isEmpty(data)) {
			return <div className={styles.no_data}>No data Available</div>;
		}
		return (
			<div>
				{data?.map((item) => (
					<AccordianCards
						itemData={item}
						currentOpenSID={currentOpenSID}
						setCurrentOpenSID={setCurrentOpenSID}
						key={item?.jobId}
					/>
				))}
			</div>
		);
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
				{HandleShipmentView()}
				{!isEmpty(data) ? (
					<div className={styles.pagination}>
						<Pagination
							currentPage={pageNo}
							onPageChange={(val) => hookSetters.setFilters({
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
