import React from 'react';

// import TrucksDetails from '@cogoport/bookings/ShipmentDetails/commons/TrucksDetails';
// import {
// 	formatValue,
// 	getTrucklistWithId,
// 	getEtaEtdList,
// } from '@cogoport/bookings/ShipmentDetails/commons/TrucksDetails/formatValue';
// import EditTruckNumberETA from '../../../TrucksDetails/UpdateTruckNumberETA';
import styles from '../styles.module.css';

function TruckDetailCards({
	primary_service,
	shipment_data,
	className,
	refetch = () => {},
}) {
	const { all_services = [], state, stakeholder_types = [] } = shipment_data;
	const truckCards = formatValue(all_services);
	const truckList = getTrucklistWithId(all_services);
	const etaEtdList = getEtaEtdList(all_services);

	const notAllowedStakeHolders = ['booking_agent'];

	const disableEdit = notAllowedStakeHolders.some((obj) => stakeholder_types.includes(obj));

	return (
		<>
			{Object.keys(truckCards).map((truckCard) => (
				<div className={`${styles.container} truckCard`}>
					<div className={styles.service - info - container}>
						<div className={styles.service}>
							<div className={styles.service}>FTL</div>
							{state !== 'completed' && !disableEdit && (
								<EditTruckNumberETA
									truckList={truckList}
									etaEtdList={etaEtdList}
									refetch={refetch}
								/>
							)}
						</div>
					</div>
					{/* <div className={styles.more-info-container}>
							<TrucksDetails
								truckData={truckCards[truckCard]}
								truckType={truckCard}
								primary_service={primary_service}
							/>
						</div> */}
				</div>
			))}
		</>
	);
}

export default TruckDetailCards;
