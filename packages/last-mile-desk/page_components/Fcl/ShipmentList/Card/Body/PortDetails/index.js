import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function PortDetails({ item = {} }) {
	const { destination_port = {}, origin_port = {}, estimated_arrival = '', estimated_departure = '' } = item || {};

	function Port({ est_key, port, est_label = '' }) {
		return (
			<div className={styles.port}>
				<div className={styles.port_code}>
					{`(${port?.port_code})`}
				</div>

				<div className={styles.port_name_container}>
					<Tooltip
						content={port?.name}
						interactive
						placement="bottom"
					>
						<div className={styles.port_name}>
							{port?.name}
						</div>
					</Tooltip>
				</div>

				<div className={styles.est_time}>{`${est_label}: ${format(est_key, 'dd MMM yyyy', null, true)}`}</div>
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.port_detail}>
				{Port({ est_key: estimated_departure, port: origin_port, est_label: 'ETD' })}
			</div>

			<div className={styles.port_icon}>
				<IcMPortArrow height={20} width={20} />
			</div>

			<div className={styles.port_detail}>
				{Port({ est_key: estimated_arrival, port: destination_port, est_label: 'ETA' })}
			</div>
		</div>
	);
}
export default PortDetails;
