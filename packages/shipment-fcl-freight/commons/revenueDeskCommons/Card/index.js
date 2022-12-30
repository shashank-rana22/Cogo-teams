import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useListBookingPreference from '../../../hooks/revenueDeskHooks/useListBookingPreference';

import Body from './Body';
import BookingPreference from './BookingPreference';
import Footer from './Footer';
import Header from './Header';
import Services from './Services';
import styles from './styles.module.css';

function Card({
	data = {},
	handleCardClick = () => {},
	activeTab = '',
	shipment_type,
	clickedCard = {},
}) {
	const services = (data[`${shipment_type}_services`] || []).map((item) => ({
		...item,
		service_type: `${shipment_type}_service`,
	}));
	const initialService = services[0];
	const [selectedService, setSelectedService] = useState(initialService);

	const {
		bookingData = {},
		bookingLoading = false,
		setView,
		view,
	} = useListBookingPreference({ data, selectedService });

	const activeService = activeTab === 'completed' ? selectedService.id : clickedCard?.service?.id;

	return (
		<div className={styles.container}>
			<div
				className={styles.card_Container}
				onClick={
					services.length === 1
						? () => handleCardClick({ shipment: data, service: services[0] })
						: null
				}
			>
				<Header data={data} activeTab={activeTab} />
				<p className={styles.line} />

				<Body data={data} />
				<p className={(`${styles.line} ${styles.grey_line}`)} />

				<Footer data={data} />
				{services.length > 1 ? (
					<>
						<p className={styles.line} />
						<Services
							services={services}
							onClick={(service) => {
								if (activeTab === 'completed') {
									setSelectedService(service);
								} else {
									handleCardClick({ shipment: data, service });
									setView(true);
								}
							}}
							activeService={activeService}
						/>
					</>
				) : null}
			</div>
			{activeTab === 'completed' ? (
				<>
					{view ? (
						<BookingPreference
							loading={bookingLoading}
							bookingData={bookingData.list}
						/>
					) : null}

					<Button
						onClick={(service) => {
							setView(!view);
							setSelectedService(service);
						}}
						className={styles.sub_info}
					>

						{view ? (
							<div className={styles.icon_wrapper}>
								<IcMArrowRotateUp height={20} width={20} />
							</div>
						) : (
							<div className={styles.icon_wrapper}>
								<IcMArrowRotateDown height={20} width={20} />
							</div>
						)}
					</Button>
				</>
			) : null}
		</div>
	);
}

export default Card;
