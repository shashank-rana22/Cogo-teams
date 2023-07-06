import { Tooltip } from '@cogoport/components';
import { IcMPortArrow, IcCHaulage } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ListMiddlePart({ item = {} }) {
	return (
		<div className={styles.list_middle_part}>
			<div className={styles.service_icon}>
				<IcCHaulage />
				<div className={styles.service_name}>
					{startCase(item?.shipment_type)}
				</div>
			</div>

			<div className={styles.port_details}>
				<Tooltip
					content={(
						<div>
							<div style={{ fontSize: '10px' }}>{item?.origin_location?.display_name }</div>
						</div>
					)}
				>
					<div>{item?.origin_location?.display_name || '-'}</div>
				</Tooltip>
				<div className={styles.arrow}>
					<IcMPortArrow />
				</div>
				<Tooltip
					content={(
						<div>
							<div style={{ fontSize: '10px' }}>{item?.destination_location?.display_name}</div>
						</div>
					)}
				>
					<div>{item?.destination_location?.display_name || '-'}</div>
				</Tooltip>
			</div>

			<div className={styles.line} />

		</div>
	);
}
export default ListMiddlePart;
