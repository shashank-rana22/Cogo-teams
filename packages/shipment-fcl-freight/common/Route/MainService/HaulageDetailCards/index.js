import React from 'react';
import styles from '../styles.module.css';
// import TrailerDetails from '../../../TrailerDetails';
// import { formatTrailerValue } from '../../../TrailerDetails/formatTrailerValue';
import EditServiceOptions from './EditServiceOptions';

const HaulageDetailCards = ({
	primary_service,
	shipment_data,
	className,
	refetch = () => {},
}) => {
	const subServiceName = primary_service?.transport_mode;
	let subServiceCards = {};
	const { all_services = [], state = '' } = shipment_data;
	// if (subServiceName === 'trailer') {
	// 	const trailerCards = formatTrailerValue(all_services);
	// 	subServiceCards = trailerCards;
	// }
	return (
		<>
			{Object.keys(subServiceCards).map((subServiceCard) => (
				<div className={styles.container}>
					<div className={styles.service-info-container}>
						<div className={styles.service}>
							<div className={styles.service}>{subServiceName?.toUpperCase()}</div>
							{state !== 'completed' && (
								<EditServiceOptions
									refetch={refetch}
									subServiceName={subServiceName}
									trailerData={subServiceCards[subServiceCard]}
									trailerType={subServiceCard}
								/>
							)}
						</div>
					</div>
					{/* <div className={styles.more-info-container}>
						{subServiceName === 'trailer' && (
							<TrailerDetails
								trailerData={subServiceCards[subServiceCard]}
								trailerType={subServiceCard}
								primary_service={primary_service}
							/>
						)}
					</div> */}
				</div>
			))}
		</>
	);
};

export default HaulageDetailCards;
