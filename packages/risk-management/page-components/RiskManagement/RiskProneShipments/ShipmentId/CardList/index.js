import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CardItem from './CardItem';
import CargoDetails from './CargoDetails';
import ResolveModal from './ResolveModal';
import ShipmentTimline from './ShipmentTimeline';
import styles from './styles.module.css';

function CardList({ itemData, getDashboardData, getDahboardStatsData }) {
	const { trade_type, cargo_details = [], importer_exporter } = itemData || {};
	const { business_name } = importer_exporter || {};
	const [isAccordionActive, setIsAccordionActive] = useState(false);
	const [showResolveModal, setShowResolveModal] = useState(false);

	const handleClick = () => {
		setIsAccordionActive(!isAccordionActive);
	};
	return (
		<div className={styles.main_div}>
			<div className={styles.div_container}>
				<div className={styles.trade}>
					{startCase(trade_type)}
				</div>
				<CardItem itemData={itemData} />
				<div>
					<div className={styles.hr} />
					<div className={styles.cargo_container}>
						<div className={styles.bottom_header}>
							{business_name}
						</div>
						<div className={styles.bottom_vr} />
						<div className={styles.resolve}>
							<CargoDetails cargo_details={cargo_details} />
							<Button
								size="sm"
								themeType="primary"
								onClick={() => { setShowResolveModal(true); }}
							>
								Resolve

							</Button>
						</div>
					</div>
				</div>
				{showResolveModal && (
					<ResolveModal
						showResolveModal={showResolveModal}
						setShowResolveModal={setShowResolveModal}
						itemData={itemData}
						getDashboardData={getDashboardData}
						getDahboardStatsData={getDahboardStatsData}
					/>
				)}
				<div className={styles.hr} />

				<div>
					<div style={{
						transition : 'max-height 0.3s ease-in-out',
						maxHeight  : isAccordionActive ? '430px' : '0px',
						overflow   : 'hidden',
					}}
					>
						<div>
							<div className={styles.text}>
								Shipment Timeline
							</div>
							<div>
								<ShipmentTimline itemData={itemData} isAccordionActive={isAccordionActive} />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.footer}>
				<div
					className={styles.footer_text}
					onClick={handleClick}
					role="presentation"
				>
					{isAccordionActive ?	'Show Less' : 'Show more' }

				</div>
			</div>

		</div>
	);
}

export default CardList;
