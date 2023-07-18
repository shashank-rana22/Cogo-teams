import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function RoutePort({
	isFirst, isLast, port, diffInDays,
	handleMouseEnter,
	handleMouseLeave,
	index,
}) {
	return (
		<div className={styles.route_port}>
			<div className={styles.left}>
				<div className={styles.eta_etd}>
					<div className={styles.eta}>
						ETA :
						{' '}
						{format(port?.eta, 'dd MMM yyyy HH:mm')}
					</div>
					<div className={styles.etd}>
						ETD :
						{' '}
						{format(port?.etd, 'dd MMM yyyy HH:mm')}
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
				<div
					className={styles.port_name}
					onMouseEnter={() => { handleMouseEnter(index); }}
					onMouseLeave={() => { handleMouseLeave(index); }}
				>
					{port?.display_name.split(',')[0]}

					<span className={styles.port_terminal} />
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
