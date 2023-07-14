import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CardItem from './CardItem';
import CargoDetails from './CargoDetails';
import ResolveModal from './ResolveModal';
import ShipmentTimline from './ShipmentTimeline';
import styles from './styles.module.css';

const COMMODITY_CATEGORIES_VALUE = {
	general    : '#C4DC91',
	hazardous  : '#F37166',
	perishable : '#ed3736',
	pharma     : '#FBD1A6',
};
function CardList({ itemData = {}, getDashboardData = () => {}, getDahboardStatsData = () => {} }) {
	const { trade_type, cargo_details = [], importer_exporter, commodity_category } = itemData;
	const { business_name } = importer_exporter || {};
	const [isAccordionActive, setIsAccordionActive] = useState(false);
	const [showResolveModal, setShowResolveModal] = useState(false);

	return (
		<div className={styles.main_div}>
			<div className={styles.div_container}>
				<div className={styles.trade_container}>
					<div className={styles.trade}>
						{startCase(trade_type)}
					</div>
					{commodity_category ? (
						<div
							className={styles.commodity}
							style={{ background: COMMODITY_CATEGORIES_VALUE[commodity_category] }}
						>
							{startCase(commodity_category) }

						</div>
					) : null}
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
				{showResolveModal ? (
					<ResolveModal
						showResolveModal={showResolveModal}
						setShowResolveModal={setShowResolveModal}
						itemData={itemData}
						getDashboardData={getDashboardData}
						getDahboardStatsData={getDahboardStatsData}
					/>
				) : null}
				<div className={styles.hr} />

				<div className={isAccordionActive ? styles.active_accordian_style : styles.accordian_style}>
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

			<div className={styles.footer}>
				<div
					className={styles.footer_text}
					onClick={() => { setIsAccordionActive((prev) => !prev); }}
					role="presentation"
				>
					{isAccordionActive ?	'Show Less' : 'Show more' }

				</div>
			</div>

		</div>
	);
}

export default CardList;
