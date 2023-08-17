import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

const TWO = 2;
const ONE = 1;
function Lower({ vessel, loading }) {
	const route_length = parseFloat(vessel?.route?.length);
	const displayText = `${(route_length)?.toFixed(TWO) || '-'} km`;
	return (
		<div className={styles.lower}>
			<div className={styles.left}>
				<div>
					<div className={styles.port_heading}>Origin</div>
					{loading ? <Placeholder width="160px" /> : (
						<div className={styles.port_name}>
							{vessel
								?.vessel_schedule_link?.
									[GLOBAL_CONSTANTS.zeroth_index]
								?.display_name.split('(')?.[[GLOBAL_CONSTANTS.zeroth_index]]}
							,
							{vessel?.vessel_schedule_link?.[[GLOBAL_CONSTANTS.zeroth_index]].port_code
								? (
									<div style={{ color: '#f68b21' }}>
										{`(${vessel?.vessel_schedule_link?.
											[[GLOBAL_CONSTANTS.zeroth_index]].port_code})`}
									</div>
								) : null}
						</div>

					)}
					{loading ? <Placeholder width="100px" /> : (
						<div className={styles.time}>
							{format(
								vessel?.vessel_schedule_link?.[[GLOBAL_CONSTANTS.zeroth_index]]?.etd,
								`${GLOBAL_CONSTANTS.formats.time['HH:mm']} |
								${GLOBAL_CONSTANTS.formats.date['dd MMM yyyy']}`,
							)}
						</div>
					)}
				</div>
				<IcMPortArrow style={{ height: '100px' }} />
				<div>
					<div className={styles.port_heading}>Destination</div>
					{loading ? <Placeholder width="160px" /> : (
						<div className={styles.port_name}>
							{
							vessel?.vessel_schedule_link?.[
								Number(vessel?.vessel_schedule_link?.length) - ONE
							]?.display_name.split('(')?.[[GLOBAL_CONSTANTS.zeroth_index]]
}
							,
							{vessel?.vessel_schedule_link?.
								[Number(vessel?.vessel_schedule_link?.length) - ONE].port_code
								? (
									<div style={{ color: '#f68b21' }}>
										{`(${vessel?.vessel_schedule_link?.
											[Number(vessel?.vessel_schedule_link?.length) - ONE].port_code})`}
									</div>
								) : null}
						</div>
					)}
					{loading ? <Placeholder width="100px" /> : (
						<div className={styles.time}>
							{format(
								vessel?.vessel_schedule_link?.[
									Number(vessel?.vessel_schedule_link?.length) - ONE
								]?.eta,
								`${GLOBAL_CONSTANTS.formats.date['dd MMM yyyy']} 
								${GLOBAL_CONSTANTS.formats.time['HH:mm']}`,
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
							{vessel?.vessel_schedule_link?.[[GLOBAL_CONSTANTS.zeroth_index]]?.arrival_voyage_number}
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
							<span className={styles.key}>Distance </span>
							{' '}
							{displayText}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
export default Lower;
