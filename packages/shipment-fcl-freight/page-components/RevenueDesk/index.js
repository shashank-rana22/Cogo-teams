import React, { useState } from 'react';
import ListJson from '../../hooks/revenueDeskHooks/useGetList.json';
// import useListShipments from '../../hooks/revenueDeskHooks/useGetList'
import ShipmentDetails from './ShipmentDetails';
import BookingOption from './BookingOption';
import RevenueList from './RevenueList';
import styles from './styles.module.css';

function RevenueDesk() {
	const [activeTab, setActiveTab] = useState('pending');
	const [clickedCard, setClickedCard] = useState(null);
	const [showBookingOption, setShowBookingOption] = useState(false);

	// const {
	// 	loading,
	// 	filters,
	// 	page,
	// 	hookSetters,
	// 	list: { total, data },
	// 	refetch,
	// } = useListShipments({ status: activeTab });

	const { list: listData, total_count: count } = ListJson;
	

	return (
		<div className={styles.container}>
			{!clickedCard ? (
				<div>
					<RevenueList
						// hookSetters={hookSetters}
						// loading={loading}
						total={count}
						page={1}
						// filters={filters}
						// refetch={refetch}
						listData={listData}
						setShowBookingOption={setShowBookingOption}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						setClickedCard={setClickedCard}
						clickedCard={clickedCard}
						shipment_type="fcl_freight"
					/>
				</div>
			) : null}
			{clickedCard ? (
				<div>
					<ShipmentDetails
						data={clickedCard.shipment}
						service={clickedCard.service}
						setShowBookingOption={setClickedCard}
					/>

					<BookingOption
						activeTab={activeTab}
						currentShipmentData={clickedCard.shipment}
						service={clickedCard.service}
						setShowBookingOption={setClickedCard}
						showBookingOption= {clickedCard}
						// refetch={refetch}
					/>

				</div>
			) : null}

		</div>
	);
}
export default RevenueDesk;