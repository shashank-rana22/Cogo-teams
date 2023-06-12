import CONSTANTS from '@cogoport/air-modules/constants/CONSTANTS';
import { cl } from '@cogoport/components';

import MultiServiceDetailsPopover from './MultiServiceDetailsPopover';
import RenderCargoPills from './RenderCargoPills';
import styles from './styles.module.css';

const { ZEROTH_INDEX, NON_EMPTY_LIST_LENGTH } = CONSTANTS;

function CargoDetails({ primary_service = {} }) {
	return (
		<div className={cl`${styles.container} ${styles.shipment_cargo_details_root}`}>
			{primary_service?.cargo_details?.length > NON_EMPTY_LIST_LENGTH ? (
				<>
					<RenderCargoPills detail={{
						...primary_service,
						...primary_service?.cargo_details?.[ZEROTH_INDEX],
					} || {}}
					/>

					<div className={styles.multi_service}>

						<MultiServiceDetailsPopover mainServices={primary_service?.cargo_details}>
							<div className={styles.more_details_popover_text}>
								+
								{(primary_service?.cargo_details?.length
									|| NON_EMPTY_LIST_LENGTH) - NON_EMPTY_LIST_LENGTH}
								&nbsp;
								Details
							</div>
						</MultiServiceDetailsPopover>
					</div>
				</>
			) : (
				<RenderCargoPills detail={{
					...primary_service,
					...primary_service?.cargo_details?.[ZEROTH_INDEX],
				} || {}}
				/>
			)}
		</div>
	);
}

export default CargoDetails;
