import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCrossInCircle, IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from 'next/router';

import StepsComponent from '../steps-component';

import styles from './styles.module.css';

function ScheduleCard({ schedule = {}, ...props }) {
	const { push } = useRouter();

	const stepsList = [
		{ title: schedule?.origin_airport?.port_code || 'Origin' },
		{ title: schedule?.destination_airport?.port_code || 'Destination' },
	];

	const routeList = {
		origin      : schedule?.origin_airport?.name || 'Origin',
		destination : schedule?.destination_airport?.name || 'Destination',
	};

	return (

		<div className={styles.card}>
			<div className={styles.card_upper}>
				<div className={styles.upper}>
					<span
						className={styles.text}
					>
						{routeList.origin.split(' - ')[GLOBAL_CONSTANTS.zeroth_index]}
					</span>
					<span
						className={styles.text}
						style={{ width: '40%', spanAlign: 'right', paddingLeft: '1rem' }}
					>
						{routeList.destination.split(' - ')[GLOBAL_CONSTANTS.zeroth_index]}
					</span>
					<IcMCrossInCircle
						style={{ marginTop: '-8px', marginRight: '-5px', cursor: 'pointer' }}
						width={15}
						height={15}
						onClick={() => props.events(schedule.id)}
					/>
				</div>
				<StepsComponent stepsList={stepsList} />
				<div
					onClick={() => push(
						'/saas/air-schedules/[schedule_id]',
						`/saas/air-schedules/${schedule.id}`,
					)}
					id={props.id}
					role="presentation"
				>
					<span size="12px" color="#4f4f4f">
						{schedule.schedules_count || GLOBAL_CONSTANTS.zeroth_index}
						{' '}
						Schedules available from
						{' '}
						{schedule.air_lines_count || GLOBAL_CONSTANTS.zeroth_index}
						{' '}
						Airlines
					</span>
					<IcMArrowRight style={{ height: 14, width: 14, marginLeft: 8 }} />
				</div>
			</div>
		</div>

	);
}
export default ScheduleCard;
