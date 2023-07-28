import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

const ONE = 1;
const TWO = 2;

function Middle({ vessel_schedule_link, loading }) {
	return (
		<div className={styles.middle}>
			<div className={styles.port}>
				{loading ? <Placeholder width="100px" /> : (
					<div className={styles.port_name}>
						{vessel_schedule_link?.[GLOBAL_CONSTANTS.zeroth_index]?.display_name}
					</div>
				)}
				{loading ? <Placeholder width="100px" /> : (
					<div className={styles.date}>
						{format(vessel_schedule_link?.[GLOBAL_CONSTANTS.zeroth_index]?.etd, 'dd MMM yyyy hh:mm')}
					</div>
				)}
				{loading ? <Placeholder width="100px" /> : (
					<div className={styles.voyage_number}>
						{
                            vessel_schedule_link?.[GLOBAL_CONSTANTS.zeroth_index].departure_voyage_number
                            && (
	<>
		Voyage No :
		{vessel_schedule_link?.[GLOBAL_CONSTANTS.zeroth_index].departure_voyage_number}
	</>
                            )
                    }

					</div>
				)}
			</div>
			<div className={styles.hr_line_box}>
				<hr width="200px" className={styles.hr_line} />
				{loading ? <Placeholder width="100px" /> : (
					<div className={styles.port_count}>
						+
						{Number(vessel_schedule_link?.length) - TWO}
						{' '}
						Port
					</div>
				)}
				<hr width="200px" className={styles.hr_line} />
			</div>
			<div className={styles.port}>
				{loading ? <Placeholder width="100px" /> : (
					<div className={styles.port_name}>
						{vessel_schedule_link?.[Number(vessel_schedule_link?.length) - ONE]?.display_name}
					</div>
				)}
				{loading ? <Placeholder width="100px" /> : (
					<div className={styles.date}>
						{format(
							vessel_schedule_link?.[Number(vessel_schedule_link?.length) - ONE]?.eta,
							'dd MMM yyyy hh:mm',
						)}
					</div>
				)}
				{loading ? <Placeholder width="100px" /> : (
					<div className={styles.voyage_number}>
						{
                            vessel_schedule_link?.[Number(vessel_schedule_link?.length) - ONE].arrival_voyage_number
                            && (
	<>
		Voyage No :
		{vessel_schedule_link?.[Number(vessel_schedule_link?.length) - ONE].arrival_voyage_number}
	</>
                            )
                        }
					</div>
				)}
			</div>
		</div>
	);
}
export default Middle;
