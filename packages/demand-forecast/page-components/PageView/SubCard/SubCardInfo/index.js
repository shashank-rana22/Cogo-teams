import { Button, Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function SubCardInfo({ portInfo = {}, info_key = 'remaining_clusters' }) {
	const router = useRouter();

	const {
		origin_location = {}, destination_location = {}, high_demand_port_pairs = 'NA',
		rates_added = '-', total_estimated_demand = '-', origin_cluster = {}, destination_cluster = {},
	} = portInfo;

	const onView = () => {
		let route = '/demand-forecast/view?';

		if (info_key === 'remaining_clusters') {
			route += 'type=remaining_clusters';

			if (origin_cluster?.id) {
				route += `&origin_id=${origin_cluster.id}`;
			}

			if (destination_cluster?.id) {
				route += `&destination_id=${destination_cluster.id}`;
			}
		} else {
			if (origin_location?.id) {
				route += `&origin_id=${origin_location.id}`;
			}

			if (destination_location?.id) {
				route += `&destination_id=${destination_location.id}`;
			}
		}

		router.push(route);
	};

	return (

		<div className={styles.row}>
			<div className={styles.origin_port}>
				<Tooltip
					content={info_key === 'remaining_clusters' ? origin_cluster?.name : origin_location?.display_name}
					placement="top"
				>
					<div className={styles.origin_port_name}>
						{info_key === 'remaining_clusters' ? origin_cluster?.name : origin_location?.display_name }
					</div>
				</Tooltip>
			</div>

			<div className={styles.arrow_logo}>
				<IcMPortArrow />
			</div>

			<div className={styles.destination_port}>
				<Tooltip
					content={info_key === 'remaining_clusters'
						? destination_cluster?.name : destination_location?.display_name}
					placement="top"
				>
					<div className={styles.destination_port_name}>
						{info_key === 'remaining_clusters'
							? destination_cluster?.name : destination_location?.display_name}
					</div>
				</Tooltip>
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
