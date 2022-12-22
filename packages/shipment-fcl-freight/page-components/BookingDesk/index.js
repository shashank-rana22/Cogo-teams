import React, { useState } from 'react';
import { Tabs, TabPanel, Pagination, Loader } from '@cogoport/components';
import EmptyState from '../../commons/EmptyState';
import ShipmentFilters from './Filters';
import Card from '../../commons/bookingsDeskcommon/Card'
import useListShipments from '../../hooks/bookingDeskHooks/useGetList.js';
import { getTabs } from '../../utils/bookingDeskUtils/tabs_mapping';
import styles from './styles.module.css';

const BookingDesk = () => {
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
    console.log(activeTab, 'activeTab');

	// const {list:data, total_count:total} = ListData;
	
	return (
		<div className={styles.container}>
			<div className={styles.headingWrapper}>
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
				<div className = {styles.paginationWrapper}>
					<Pagination
						type={'compact'}
						totalItems={total}
						currentPage={page}
						PageSize={10}
						handlePageChange={(val) =>{
							hookSetters.setFilters({
								...filters,
								page: val,
							})
						}}
					/>
				</div>
			) : null} 

			{loading ? (
				<div className={styles.loaderContainer}>
					<Loader></Loader>
		         </div>
			) : null}

			{!loading && data?.length === 0 ? <EmptyState /> : null} 

			{!loading && data?.length > 0 ? (
				<div className={styles.cardsContainer}>
					{(data || []).map((details) => (
						<Card data={details} />
					))}
				</div>
			) : null}

			{total > 10 ? (
				<div className = {styles.paginationWrapper}>
					<Pagination
						type={'number'}
						totalItems={total}
						currentPage={1}
						PageSize={10}
						handlePageChange={(number) =>{
							hookSetters.setFilters({
								...filters,
								page: number,
							})
						}}
					/>
				</div>
			) : null} 
		</div>
	);
};
export default BookingDesk;