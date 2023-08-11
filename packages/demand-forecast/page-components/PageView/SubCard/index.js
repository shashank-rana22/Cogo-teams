import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import EmptyState from '../../../common/EmptyState/EmptyState';
import ListLoading from '../../../common/EmptyState/ListLoading';
import useGetRollingForecastPortPairs from '../../../hooks/useGetRollingForecastPortPairs';

import styles from './styles.module.css';
import SubCardInfo from './SubCardInfo';

const KEYS_MAPPING = {
	high_demanding_port_pairs : 'High Demand Port Pairs',
	remaining_clusters        : 'Remining Clusters',
};

function SubCard({ showDetails = false, origin_cluster_id = '', destination_cluster_id = '' }) {
	const { getRollingForecastPortPairs, data:portPairData, loading } = useGetRollingForecastPortPairs();

	useEffect(() => {
		getRollingForecastPortPairs({ origin_cluster_id, destination_cluster_id });
	}, [origin_cluster_id, destination_cluster_id, getRollingForecastPortPairs]);

	if (!showDetails) {
		return null;
	}

	if (isEmpty(portPairData) && !loading) {
		return (
			<div>
				<EmptyState
					height="250"
					width="400"
					flexDirection="column"
					alignItems="center"
					emptyText="Data Not Found"
					textSize="20"
					marginTop="100px"
				/>
			</div>
		);
	}

	return (
		<div className={styles.sub_card}>
			{	loading ? <ListLoading /> : Object.keys(portPairData).map((key) => (
				!isEmpty(portPairData[key]) && (
					<div key={key} className={styles.card}>
						<div className={styles.title}>
							{KEYS_MAPPING[key]}
							{' '}
							:
						</div>
						<div>
							{portPairData[key].map((port_info) => (
								<SubCardInfo portInfo={port_info} key="123" />
							))}
						</div>
					</div>
				)
			))}
		</div>

	);
}

export default SubCard;
