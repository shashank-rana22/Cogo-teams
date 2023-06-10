import { cl } from '@cogoport/components';

import MultiServiceDetailsPopover from './MultiServiceDetailsPopover';
import RenderCargoPills from './RenderCargoPills';
import styles from './styles.module.css';

const CARGO_DETAIL_LENGTH_GREATER_THAN = 1;
const CARGO_DETAIL_FIRST = 0;

function CargoDetails({ primary_service = {} }) {
	return (
		<div className={cl`${styles.container} ${styles.shipment_cargo_details_root}`}>
			{primary_service?.cargo_details?.length > CARGO_DETAIL_LENGTH_GREATER_THAN ? (
				<>
					<RenderCargoPills detail={{
						...primary_service,
						...primary_service?.cargo_details?.[CARGO_DETAIL_FIRST],
					} || {}}
					/>

					<div className={styles.multi_service}>

						<MultiServiceDetailsPopover mainServices={primary_service?.cargo_details}>
							<div className={styles.more_details_popover_text}>
								+
								{(primary_service?.cargo_details?.length || CARGO_DETAIL_LENGTH_GREATER_THAN)
								- CARGO_DETAIL_LENGTH_GREATER_THAN}
								&nbsp;
								Details
							</div>
						</MultiServiceDetailsPopover>
					</div>
				</>
			) : (
				<RenderCargoPills
					detail={{ ...primary_service, ...primary_service?.cargo_details?.[CARGO_DETAIL_FIRST] } || {}}
				/>
			)}
		</div>
	);
}

export default CargoDetails;
