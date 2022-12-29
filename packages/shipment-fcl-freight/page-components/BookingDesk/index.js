import {
	Tabs, TabPanel, Pagination, Loader,
} from '@cogoport/components';
import React, { useState } from 'react';

import Card from '../../commons/bookingsDeskcommon/Card';
import EmptyState from '../../commons/EmptyState';
import useListShipments from '../../hooks/bookingDeskHooks/useGetList';
import { getTabs } from '../../utils/bookingDeskUtils/tabs_mapping';

import ShipmentFilters from './Filters';
import styles from './styles.module.css';

function BookingDesk() {
	const [activeTab, setActiveTab] = useState('place_booking');
	const [currentShipment, setCurrentShipment] = useState('fcl_freight');

	const visibleTabs = getTabs(currentShipment);

	const {
		loading,
		filters,
		page,
		hookSetters,
		list: { total, data },
	} = useListShipments();

	const handleRender = () => {
		if (loading) {
			return (
				<div className={styles.loader_container}>
					<Loader />
				</div>
			);
		}
		if (!loading && data?.length === 0) {
			return (
				<EmptyState />
			);
		}
		return (
			<div className={styles.cards_container}>
				{(data || []).map((details) => (
					<Card data={details} />
				))}
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading_wrapper}>
				<div className={styles.heading}>Bookings Desk</div>
				<ShipmentFilters
					hookSetters={hookSetters}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					currentShipment={currentShipment}
					setCurrentShipment={setCurrentShipment}
					visibleTabs={visibleTabs}
				/>
			</div>
			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				className="horizontal four"
			>
				{(visibleTabs || []).map((tab) => (
					<TabPanel {...tab} className="horizontal four" />
				))}
			</Tabs>

			{total > 10 ? (
				<div className={styles.pagination_wrapper}>
					<Pagination
						type="compact"
						totalItems={total}
						currentPage={page}
						pageSize={10}
						handlePageChange={(val) => {
							hookSetters.setFilters({
								...filters,
								page: val,
							});
						}}
					/>
				</div>
			) : null}
			{handleRender()}
			{total > 10 ? (
				<div className={styles.pagination_wrapper}>
					<Pagination
						type="number"
						totalItems={total}
						currentPage={1}
						pageSize={10}
						handlePageChange={(number) => {
							hookSetters.setFilters({
								...filters,
								page: number,
							});
						}}
					/>
				</div>
			) : null}
		</div>
	);
}
export default BookingDesk;
