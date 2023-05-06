import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CargoDetails from '../../../../commons/CargoDetails';
import PortDetails from '../../../../commons/PortDetails';
import ShipmentBreif from '../../../../commons/ShipmentBreif';

import AdditionalShipmentInfo from './AdditionalShipmentInfo';
import Footer from './Footer';
import ShipmentExtraDetails from './ShipmentExtraDetails';
import styles from './styles.module.css';

function ListCard({
	item = {},
	role = '',
	tabsState = {},
	filters = {},
	setFilters = () => {},
}) {
	const [showDetails, setShowDetails] = useState(false);

	const { freight_service = {}, local_service = {} } = item;

	const primary_service = isEmpty(freight_service) ? local_service : freight_service;

	return (
		<div className={styles.container}>
			<div className={styles.status}>
					&nbsp; Status: &nbsp;
				{startCase(freight_service?.state)}
			</div>

			<div className={styles.detail_container}>
				<div className={styles.shipment_details}>
					<ShipmentBreif item={item} />
					<PortDetails primary_service={primary_service} trade_type={item?.trade_type} />
					<CargoDetails primary_service={primary_service} />
				</div>

			</div>

			<ShipmentExtraDetails item={item} />
			<Footer item={item} role={role} tabsState={tabsState} />

			{showDetails ? (
				<div className={styles.additional_audits}>
					<AdditionalShipmentInfo item={item} filters={filters} setFilters={setFilters} />
				</div>
			) : null}

			<div className={styles.less_more_details}>
				<span
					className={styles.additional_text}
					role="presentation"
					onClick={() => setShowDetails(!showDetails)}
				>
						&nbsp;
					{showDetails ? 'View Less' : 'View More'}
						&nbsp;
				</span>
			</div>
		</div>
	);
}

export default ListCard;
