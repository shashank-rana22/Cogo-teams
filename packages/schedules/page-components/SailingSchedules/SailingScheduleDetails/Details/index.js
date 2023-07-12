import ScheduleMap from '../../../common/ScheduleMaps';
import useGetSeaRoute from '../../hooks/useGetSeaRoute';

import SailingDetails from './SailingDetails';
import styles from './styles.module.css';

function Details({ data, loading }) {
	const { data:route_data } = useGetSeaRoute(
		{ origin_port_id: data?.origin_port_id, destination_port_id: data?.destination_port_id },
	);
	return (
		<div className={styles.flex}>
			<SailingDetails data={data} loading={loading} />
			<div style={{ borderRadius: '8px' }}>
				<ScheduleMap data={{ ...data, route_cordinates: route_data }} />
			</div>
		</div>
	);
}

export default Details;
