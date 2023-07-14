import { Tooltip } from '@cogoport/components';
import { IcMPortArrow, IcCHaulage } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ListMiddlePart({ item = {} }) {
	const { shipment_type = '', origin_location = {}, destination_location = {} } = item;
	const originLocationName = origin_location?.display_name;
	const destinationLocationName = destination_location?.display_name;

	return (
		<div className={styles.list_middle_part}>
			<div className={styles.service_icon}>
				<IcCHaulage />
				<div className={styles.service_name}>
					{startCase(shipment_type)}
				</div>
			</div>

			<div className={styles.port_details}>
				<Tooltip
					content={(
						<div>
							<div style={{ fontSize: '10px' }}>{originLocationName}</div>
						</div>
					)}
				>
					<div>{originLocationName || '-'}</div>
				</Tooltip>
				<div className={styles.arrow}>
					<IcMPortArrow />
				</div>
				<Tooltip
					content={(
						<div>
							<div style={{ fontSize: '10px' }}>{destinationLocationName}</div>
						</div>
					)}
				>
					<div>{destinationLocationName || '-'}</div>
				</Tooltip>
			</div>

			<div className={styles.line} />

		</div>
	);
}
export default ListMiddlePart;
