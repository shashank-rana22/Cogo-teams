import { cl } from '@cogoport/components';

import MultiServiceDetailsPopover from './MultiServiceDetailsPopover';
import RenderCargoPills from './RenderCargoPills';
import styles from './styles.module.css';

function CargoDetails({ primary_service }) {
	return (
		<div className={cl`${styles.container} ${styles.shipment_cargo_details_root}`}>
			{primary_service?.cargo_details?.length > 1 ? (
				<>
					<RenderCargoPills detail={{ ...primary_service, ...primary_service?.cargo_details?.[0] } || {}} />

					<div className={styles.multi_service}>

						<MultiServiceDetailsPopover mainServices={primary_service?.cargo_details}>
							<div className={styles.more_details_popover_text}>
								+
								{(primary_service?.cargo_details?.length || 1) - 1}
								&nbsp;
								Details
							</div>
						</MultiServiceDetailsPopover>
					</div>
				</>
			) : (
				<RenderCargoPills
					detail={{ ...primary_service, ...primary_service?.cargo_details?.[0] } || {}}
				/>
			)}
		</div>
	);
}

export default CargoDetails;
