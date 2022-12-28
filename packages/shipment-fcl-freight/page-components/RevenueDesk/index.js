import React, { useState } from 'react';

import useListShipments from '../../hooks/revenueDeskHooks/useGetList';

import BookingOption from './BookingOption';
import RevenueList from './RevenueList';
import ShipmentDetails from './ShipmentDetails';
import styles from './styles.module.css';

function RevenueDesk() {
	const [activeTab, setActiveTab] = useState('pending');
	const [clickedCard, setClickedCard] = useState(null);
	const [showBookingOption, setShowBookingOption] = useState(false);

	const {
		loading,
		filters,
		page,
		hookSetters,
		list: { total, data },
		refetch,
	} = useListShipments({ status: activeTab });

	return (
		<div className={styles.container}>
			{!clickedCard ? (
				<div>
					<RevenueList
						hookSetters={hookSetters}
						loading={loading}
						total={total}
						page={page}
						filters={filters}
						refetch={refetch}
						listData={data}
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
						showBookingOption={clickedCard}
						refetch={refetch}
					/>

				</div>
			) : null}

		</div>
	);
}
export default RevenueDesk;
