import { IcMArrowRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function RoutePort({ isFirst, isLast, port, diffInDays }) {
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
            < (name?.indexOf('(') < 0 ? 10000 : name?.indexOf('('))
            	? name?.indexOf(',')
            	: name?.indexOf('(');

		return name?.substring(0, splitIndex - 1);
	};

	return (
		<div className={styles.route_port}>
			<div className={styles.left}>
				<div className={styles.eta_etd}>
					<div className={styles.eta}>
						ETA :
						{' '}
						{dayChoices[port?.eta_day - 1]}
						{' '}
						( Day &nbsp;
						{port?.eta_day_count}
						)
					</div>
					<div className={styles.etd}>
						ETD :
						{' '}
						{dayChoices[port?.etd_day - 1]}
						{' '}
						( Day &nbsp;
						{port?.etd_day_count}
						)
					</div>
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
					<IcMArrowRight width={24} height={30} />
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
