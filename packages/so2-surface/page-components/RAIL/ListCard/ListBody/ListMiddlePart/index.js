import { Tooltip } from '@cogoport/components';
import { IcMPortArrow, IcMFhaulage } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ListMiddlePart({ item = {} }) {
	return (
		<div className={styles.list_middle_part}>
			<div className={styles.service_icon}>
				<IcMFhaulage fill="#5936f0" />
				<div className={styles.service_name}>
					Domestic RAIL
				</div>
			</div>

			<div className={styles.port_container}>

				<div className={styles.port_details}>

					<Tooltip
						placement="bottom"
						theme="light"
						content={(
							<div>
								<div style={{ fontSize: '10px' }}>{item?.origin_location?.display_name }</div>
							</div>
						)}
					>
						<div>{item?.origin_location?.display_name || '-'}</div>
					</Tooltip>
					<div>
						<IcMPortArrow />
					</div>
					<Tooltip
						placement="bottom"
						theme="light"
						content={(
							<div>
								<div style={{ fontSize: '10px' }}>{item?.destination_location?.display_name}</div>
							</div>
						)}
					>
						<div>{item?.destination_location?.display_name || '-'}</div>
					</Tooltip>

				</div>

			</div>

			<div className={styles.line} />

		</div>
	);
}
export default ListMiddlePart;
