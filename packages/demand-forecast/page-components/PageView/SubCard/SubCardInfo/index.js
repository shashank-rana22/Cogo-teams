import { Button } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SubCardInfo({ portInfo = {} }) {
	const {
		orgin_port = '', destination_port = '', high_demand_port_pairs = 'NA',
		rates_added = '', forecasted_demand = '',
	} = portInfo;

	return (

		<div className={styles.row}>
			<dv className={styles.orgin_port}>
				{orgin_port}
			</dv>
			<div className={styles.arrow_logo}>
				<IcMPortArrow />
			</div>

			<div className={styles.destination_port}>
				{destination_port}
			</div>

			<div className={styles.high_demand_port_pairs}>
				{high_demand_port_pairs}
			</div>

			<div className={styles.rated_acquired}>
				{rates_added}
			</div>

			<div className={styles.forecasted_demand}>
				{forecasted_demand}
			</div>

			<Button size="md" themeType="secondary">View</Button>
		</div>
	);
}
export default SubCardInfo;
