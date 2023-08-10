import { Button } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function SubCardInfo({ portInfo = {} }) {
	const router = useRouter();

	const {
		origin_location = {}, destination_location = {}, high_demand_port_pairs = 'NA',
		rates_added = '-', total_estimated_demand = '-',
	} = portInfo;

	const onView = () => {
		router.push(`/demand-forecast/${origin_location?.id}/${destination_location?.id}`);
	};

	return (

		<div className={styles.row}>
			<dv className={styles.orgin_port}>
				{origin_location?.display_name}
			</dv>
			<div className={styles.arrow_logo}>
				<IcMPortArrow />
			</div>

			<div className={styles.destination_port}>
				{destination_location?.display_name}
			</div>

			<div className={styles.high_demand_port_pairs}>
				{high_demand_port_pairs}
			</div>

			<div className={styles.rated_acquired}>
				{rates_added}
			</div>

			<div className={styles.forecasted_demand}>
				{total_estimated_demand}
			</div>

			<Button size="md" themeType="secondary" onClick={onView}>View</Button>
		</div>
	);
}
export default SubCardInfo;
