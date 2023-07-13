import { Placeholder } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

const ZERO = 0;
const ONE = 1;
function Lower({ vessel, loading }) {
	return (
		<div className={styles.lower}>
			<div className={styles.left}>
				<div>
					<div className={styles.port_heading}>Origin</div>
					{loading ? <Placeholder width="160px" /> : (
						<div className={styles.port_name}>
							{vessel?.vessel_schedule_link?.[ZERO]?.display_name}
						</div>
					)}
					{loading ? <Placeholder width="100px" /> : (
						<div className={styles.time}>
							{format(
								vessel?.vessel_schedule_link?.[ZERO]?.etd,
								'hh:mm | dd MMM yyyy',
							)}
						</div>
					)}
				</div>
				<div>
					<div className={styles.port_heading}>Destination</div>
					{loading ? <Placeholder width="160px" /> : (
						<div className={styles.port_name}>
							{
                vessel?.vessel_schedule_link?.[
                	Number(vessel?.vessel_schedule_link?.length) - ONE
                ]?.display_name
              }
						</div>
					)}
					{loading ? <Placeholder width="100px" /> : (
						<div className={styles.time}>
							{format(
								vessel?.vessel_schedule_link?.[
									Number(vessel?.vessel_schedule_link?.length) - ONE
								]?.eta,
								'dd MMM yyyy hh:mm',
							)}
						</div>
					)}
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.details}>
					{loading ? <Placeholder width="100px" /> : (
						<div>
							<span className={styles.key}>Voyage No:</span>
							{' '}
							{vessel?.vessel_schedule_link?.[ZERO]?.arrival_voyage_number}
						</div>
					)}
					{loading ? <Placeholder width="100px" /> : (
						<div>
							<span className={styles.key}>Service Lane :</span>
							{' '}
							{vessel?.service_lane?.name || '-'}
						</div>
					)}
					{loading ? <Placeholder width="100px" /> : (
						<div>
							<span className={styles.key}>Length </span>
							{' '}
							{vessel?.route?.length}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
export default Lower;
