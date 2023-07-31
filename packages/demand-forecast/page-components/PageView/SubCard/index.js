import getSubTableConfig from '../../../configurations/sub-table-config';

import styles from './styles.module.css';
import SubCardInfo from './SubCardInfo';

const KEYS_MAPPING = {
	port_pairs    : 'High Demand Port Pairs',
	mini_clusters : 'Remining Clusters',

};

function SubCard({ showDetails = false }) {
	if (!showDetails) {
		return null;
	}

	const subConfig = getSubTableConfig();

	return (
		<div className={styles.sub_card}>
			{
				Object.keys(subConfig).map((key) => (
					<div key="123" className={styles.card}>
						<div className={styles.title}>
							{KEYS_MAPPING[key]}
							{' '}
							:
						</div>
						<div>
							{(subConfig[key] || []).map((port_info) => (
								<SubCardInfo portInfo={port_info} key="1234" />
							))}
						</div>
					</div>
				))
			}
		</div>

	);
}

export default SubCard;
