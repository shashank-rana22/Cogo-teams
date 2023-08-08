import RenderPills from '@cogoport/air-modules/components/RenderPills';
import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import MultiServiceDetailsPopover from './MultiServiceDetailsPopover';
import styles from './styles.module.css';

const CARGO_DETAILS_MIN_LENGTH = 1;
const CARGO_DETAILS_LENGTH_CHECK = 1;
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
			<RenderPills
				detail={{
					...primary_service,
					...primary_service.cargo_details?.[GLOBAL_CONSTANTS.zeroth_index],
				} || {}}
				labels={LABELS}
			/>
			{primary_service?.cargo_details?.length > CARGO_DETAILS_MIN_LENGTH ? (
				<div className={styles.multi_service}>
					<MultiServiceDetailsPopover mainServices={primary_service.cargo_details}>
						<div className={styles.more_details_popover_text}>
							{`+
							${(primary_service.cargo_details?.length
									|| CARGO_DETAILS_MIN_LENGTH) - CARGO_DETAILS_LENGTH_CHECK} 
							Details`}
						</div>
					</MultiServiceDetailsPopover>
				</div>
			) : null}
		</div>
	);
}

export default CargoDetails;
