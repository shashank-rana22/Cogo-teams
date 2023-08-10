import { Placeholder } from '@cogoport/components';

import LoaderPortsCard from '../LoaderPortsCard';

import styles from './styles.module.css';

function BreakdownLoading() {
	return (
		<div style={{ backgroundColor: '#F9F9F9', paddingLeft: '20px' }}>
			<div
				className={styles.title}
			>
				<Placeholder width="300px" height="20px" />
			</div>
			<div className={styles.flex_container}>
				<LoaderPortsCard />
			</div>
			<div className={styles.flex_container}>
				<LoaderPortsCard />
			</div>
			<div className={styles.flex_container}>
				<LoaderPortsCard />
			</div>
		</div>
	);
}
export default BreakdownLoading;
