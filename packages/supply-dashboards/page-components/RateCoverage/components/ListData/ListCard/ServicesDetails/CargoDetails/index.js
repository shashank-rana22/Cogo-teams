import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import RenderCargoPills from '../RenderCargoPills';

import styles from './styles.module.css';

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
	'bl_category',
];

function CargoDetails({ primary_service = {} }) {
	return (
		<div className={cl`${styles.container} ${styles.shipment_cargo_details_root}`}>
			<RenderCargoPills
				detail={{
					...primary_service,
					...primary_service.cargo_details?.[GLOBAL_CONSTANTS.zeroth_index],
				} || {}}
				labels={LABELS}
			/>
		</div>
	);
}

export default CargoDetails;
