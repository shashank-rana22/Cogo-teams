import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import MultiServiceDetailsPopover from './MultiServiceDetailsPopover';
import RenderCargoPills from './RenderCargoPills';
import styles from './styles.module.css';

function CargoDetails({ primary_service = {} }) {
	return (
		<div className={cl`${styles.container} ${styles.shipment_cargo_details_root}`}>
			{primary_service?.cargo_details?.length > GLOBAL_CONSTANTS.one ? (
				<>
					<RenderCargoPills detail={
						{ ...primary_service, ...primary_service?.cargo_details?.[GLOBAL_CONSTANTS.zeroth_index] } || {}
						}
					/>

					<div className={styles.multi_service}>

						<MultiServiceDetailsPopover mainServices={primary_service?.cargo_details}>
							<div className={styles.more_details_popover_text}>
								+
								{(primary_service?.cargo_details?.length
									|| GLOBAL_CONSTANTS.one) - GLOBAL_CONSTANTS.one}
								{' '}
								Details
							</div>
						</MultiServiceDetailsPopover>
					</div>
				</>
			) : (
				<RenderCargoPills
					detail={{ ...primary_service, ...primary_service?.cargo_details?.[GLOBAL_CONSTANTS.zeroth_index] }
					|| {}}
				/>
			)}
		</div>
	);
}

export default CargoDetails;
