import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import {
	BasicDetails,
	AssignedStakeholder,
	ShipmentIcon,
	DualLocation,
	Header,
	TruckDetails,
} from '../../../common/ShipmentCard';
import UpdateSellQuotationModal from '../UpdateSellQuotationModal';

import styles from './styles.module.css';

function Card({ data = {}, activeTab = '' }) {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);

	const handleCardClick = (e) => {
		if (e.target?.type === 'checkbox') { return; }
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${data?.id}`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	const handleSellQuotation = (event) => {
		event.stopPropagation(); // Prevent the event from reaching the parent
		setShowModal(true);
	};

	return (
		<>
			<div
				className={styles.container}
				onClick={handleCardClick}
				role="button"
				tabIndex={0}
			>
				<div className={styles.header}>
					<Header data={data} activeTab={activeTab} />
				</div>

				<div className={styles.body_container}>
					<div className={styles.details_container}>
						<div>
							<BasicDetails data={data} />
							<AssignedStakeholder data={data} />
						</div>
					</div>

					<div className={styles.divider} />

					<div className={styles.icon_container}>
						<ShipmentIcon shipment_type={data?.shipment_type} />
					</div>

					<div className={styles.location_container}>
						<DualLocation data={data} />
					</div>

					<div className={styles.divider} />

					<div className={styles.truck_details}>
						<TruckDetails data={data} />
					</div>

					<div className={styles.divider} />

					<div className={styles.update_sell_quotation}>
						<Button
							style={{ marginLeft: '2rem' }}
							onClick={handleSellQuotation}
							themeType="secondary"
						>
							Update Sell Quotaion
						</Button>
					</div>
				</div>
			</div>

			{showModal
				? <UpdateSellQuotationModal showModal={showModal} setShowModal={setShowModal} data={data} /> : null }
		</>

	);
}

export default Card;
