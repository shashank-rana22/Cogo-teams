import RenderPills from '@cogoport/air-modules/components/RenderPills';
import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const MAIN_SERVICES_MIN_LENGTH = 1;
const CHECK_FIRST_ITEM_OF_PACKAGE = 0;
const LABELS = [
	'airline',
	'commodity',
	'inco_term',
	'trade_type',
	'packages',
	'volume',
	'weight',
	'source',
	'price_type',
	'cargo_readiness_date',
	'is_minimum_price_shipment',
	'master_airway_bill_number',
	'house_airway_bill_number',
];

function MultiServiceDetailsPopover({
	children = null,
	mainServices = [],

}) {
	if (mainServices?.length <= MAIN_SERVICES_MIN_LENGTH) {
		return null;
	}

	const renderBody = () => (
		mainServices.map((item, idx) => (idx !== CHECK_FIRST_ITEM_OF_PACKAGE ? (
			<div className={styles.container} key={item.id}>
				<RenderPills detail={item} labels={LABELS} />
			</div>
		) : null)));

	return (
		<Tooltip
			theme="light"
			placement="bottom"
			interactive
			content={renderBody()}
		>
			<div className={styles.tooltip_customise}>
				{children}
			</div>
		</Tooltip>
	);
}
export default MultiServiceDetailsPopover;
