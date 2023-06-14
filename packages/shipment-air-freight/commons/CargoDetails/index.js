import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import MultiServiceDetailsPopover from './MultiServiceDetailsPopover';
import RenderCargoPills from './RenderCargoPills';
import styles from './styles.module.css';

const CARGO_DETAILS_MIN_LENGTH = 1;
const CARGO_DETAILS_LENGTH_CHECK = 1;

function CargoDetails({ primary_service = {} }) {
	return (
		<div className={cl`${styles.container} ${styles.shipment_cargo_details_root}`}>
			<RenderCargoPills detail={{
				...primary_service,
				...primary_service.cargo_details?.[GLOBAL_CONSTANTS.zeroth_index],
			} || {}}
			/>
			{primary_service?.cargo_details?.length > CARGO_DETAILS_MIN_LENGTH ? (
				<div className={styles.multi_service}>
					<MultiServiceDetailsPopover mainServices={primary_service.cargo_details}>
						<div className={styles.more_details_popover_text}>
							+
							{(primary_service.cargo_details?.length
									|| CARGO_DETAILS_MIN_LENGTH) - CARGO_DETAILS_LENGTH_CHECK}
							&nbsp;
							Details
						</div>
					</MultiServiceDetailsPopover>
				</div>
			) : null}
		</div>
	);
}

export default CargoDetails;
