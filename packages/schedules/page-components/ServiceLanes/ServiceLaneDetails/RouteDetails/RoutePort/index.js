import { Placeholder } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

const ZERO = 0;
const ONE = 1;
const THOUSAND = 1000;

function RoutePort({ isFirst, isLast, port, diffInDays, loading }) {
	const dayChoices = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	const getPortName = (name) => {
		const splitIndex = name?.indexOf(',')
            < (name?.indexOf('(') < ZERO ? THOUSAND : name?.indexOf('('))
			? name?.indexOf(',')
			: name?.indexOf('(');

		return name?.substring(ZERO, splitIndex - ONE);
	};

	return (
		<div className={styles.route_port}>
			<div className={styles.left}>
				<div className={styles.eta_etd}>
					{loading ? <Placeholder width="200px" /> : (
						<div className={styles.eta}>
							ETA :
							{' '}
							{dayChoices[Number(port?.eta_day) - ONE]}
							{' '}
							( Day &nbsp;
							{port?.eta_day_count}
							)
						</div>
					)}
					{loading ? <Placeholder width="200px" /> : (
						<div className={styles.etd}>
							ETD :
							{' '}
							{dayChoices[Number(port?.etd_day) - ONE]}
							{' '}
							( Day &nbsp;
							{port?.etd_day_count}
							)
						</div>
					)}
				</div>
			</div>
			<div style={{ margin: '7px' }} />
			<div className={styles.middle}>
				{!isFirst && <div className={styles.hr_line_up} />}
				<div className={styles.circle} />
				{!isLast && <div className={styles.hr_line_down} />}
			</div>
			<div className={styles.right}>
				<div className={styles.port_name}>
					{getPortName(port?.display_name)}
					{' '}
				</div>
				{!isLast && (
					<div className={styles.diff_in_days}>
						{diffInDays}
						{' '}
						Days
					</div>
				)}
			</div>
		</div>
	);
}
export default RoutePort;
