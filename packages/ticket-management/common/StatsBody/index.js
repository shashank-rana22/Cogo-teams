import { Placeholder } from '@cogoport/components';

import DisplayTime from '../DisplayTime';

import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	time: DisplayTime,
};

function StatsCount({ count = '', type = '', statsLoading = false }) {
	const CountComponent = COMPONENT_MAPPING[type] || null;

	if (statsLoading) {
		return <Placeholder width="70px" height="24px" className={styles.loading_skeleton} />;
	}

	if (CountComponent) {
		return <CountComponent sec={count} />;
	}

	return <div className={styles.stats_count}>{count}</div>;
}

function StatsBody({ label = '', count = 0, icon = {}, type = '', statsLoading = false }) {
	return (
		<div className={styles.container}>
			<div className={styles.stats_icon}>{icon}</div>
			<StatsCount count={count} statsLoading={statsLoading} type={type} />
			<div className={styles.stats_label}>{label}</div>
		</div>
	);
}

export default StatsBody;
