import { Placeholder } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function Middle({ sailingSchedule, loading }) {
	return (
		<div className={styles.middle}>
			<div className={styles.port}>
				{!loading ? (
					<div className={styles.port_name}>
						{sailingSchedule?.origin_location?.name}
					</div>
				) : <Placeholder width="100px" />}
				{!loading ? (
					<div className={styles.date}>
						{format(sailingSchedule?.departure, 'dd MMM yyyy hh:mm')}
					</div>
				) : <Placeholder width="60px" />}
				{!loading ? (
					<div className={styles.service_name}>
						{sailingSchedule?.service_name}
					</div>
				) : <Placeholder width="60px" />}
			</div>
			<div className={styles.hr_line_box}>
				<hr width="200px" className={styles.hr_line} />
			</div>
			<div className={styles.port}>
				{!loading ? (
					<div className={styles.port_name}>
						{sailingSchedule?.destination_location?.name}
					</div>
				) : <Placeholder width="100px" />}
				{!loading ? (
					<div className={styles.date}>
						{format(sailingSchedule?.arrival, 'dd MMM yyyy hh:mm')}
					</div>
				) : <Placeholder width="60px" /> }
				{!loading ? (
					<div className={styles.service_name}>
						{sailingSchedule?.service_name}
					</div>
				) : <Placeholder width="60px" />}
			</div>
		</div>
	);
}
export default Middle;
