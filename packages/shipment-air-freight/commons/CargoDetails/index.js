import { cl } from '@cogoport/components';

import CONSTANTS from '../../constants/CONSTANTS';

import MultiServiceDetailsPopover from './MultiServiceDetailsPopover';
import RenderCargoPills from './RenderCargoPills';
import styles from './styles.module.css';

const { ZEROTH_INDEX } = CONSTANTS;
const CARGO_DETAILS_MIN_LENGTH = 1;
const CARGO_DETAILS_LENGTH_CHECK = 1;

function CargoDetails({ primary_service = {} }) {
	return (
		<div className={cl`${styles.container} ${styles.shipment_cargo_details_root}`}>
			{primary_service?.cargo_details?.length > CARGO_DETAILS_MIN_LENGTH ? (
				<>
					<RenderCargoPills detail={{
						...primary_service,
						...primary_service.cargo_details?.[ZEROTH_INDEX],
					} || {}}
					/>

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
				</>
			) : (
				<RenderCargoPills detail={{
					...primary_service,
					...primary_service.cargo_details?.[ZEROTH_INDEX],
				} || {}}
				/>
			)}
		</div>
	);
}

export default CargoDetails;
