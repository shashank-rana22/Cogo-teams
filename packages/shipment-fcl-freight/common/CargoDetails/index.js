import { cl } from '@cogoport/components';

import MultiServiceDetailsPopover from './MultiServiceDetailsPopover';
import RenderCargoPills from './RenderCargoPills';
import styles from './styles.module.css';

function CargoDetails({ primary_service }) {
	return (
		<div className={cl`${styles.container} ${styles.shipment_cargo_details_root}`}>
			<RenderCargoPills detail={primary_service || {}} />
			{primary_service?.cargo_details?.length > 1 ? (
				<div className={styles.multi_service}>
					<CargoDetails
						detail={{ ...primary_service, ...primary_service?.cargo_details?.[0] } || {}}
					/>
					<MultiServiceDetailsPopover mainServices={primary_service?.cargo_details}>
						+
						{(primary_service?.cargo_details?.length || 1) - 1}
						&nbsp;
						Details
					</MultiServiceDetailsPopover>
				</div>
			) : (
				<RenderCargoPills
					detail={{ ...primary_service, ...primary_service?.cargo_details?.[0] } || {}}
				/>
			)}
		</div>
	);
}

export default CargoDetails;
