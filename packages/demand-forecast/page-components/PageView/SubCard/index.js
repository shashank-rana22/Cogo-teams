import { cl, Popover } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
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

function PopOverContent({ remaining_port_pairs = [] }) {
	return (
		<div className={styles.popover}>
			<div className={styles.popover_header}>
				<div className={cl`${styles.head} ${styles.origin_header}`}>Origin</div>
				<div className={cl`${styles.head} ${styles.destination_header}`}>Destination</div>
			</div>
			{
			remaining_port_pairs.map((port_pair) => {
				const { origin_location = {}, destination_location = {} } = port_pair;
				return (
					<div key={port_pair} className={styles.popover_body}>
						<div className={styles.name}>
							<div className={styles.port_code}>
								(
								{origin_location?.port_code}
								)
							</div>
							<div>
								{origin_location?.name}
							</div>
						</div>
						<div className={styles.arrow}>
							<IcMPortArrow width={16} />
						</div>
						<div className={styles.name}>
							<div className={styles.port_code}>
								(
								{destination_location?.port_code}
								)
							</div>
							<div>
								{destination_location?.name}
							</div>
						</div>
					</div>
				);
			})
			}
		</div>
	);
}

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
					marginTop="10px"
					marginBottom="10px"
				/>
			</div>
		);
	}

	return (
		<div className={styles.sub_card}>
			{	loading ? <ListLoading /> : Object.keys(KEYS_MAPPING).map((key) => (
				!isEmpty(portPairData[key]) && (
					<div key={key} className={styles.card}>
						<div className={styles.title}>
							{
								key === 'remaining_clusters' ? (
									<Popover
										placement="right"
										content={(
											<PopOverContent
												remaining_port_pairs={portPairData?.remaining_port_pairs}
											/>
										)}
										trigger="mouseenter"
									>
										<span className={styles.popover_txt}>
											{KEYS_MAPPING[key]}
											{' '}
											:
										</span>
									</Popover>
								) : (
									<span>
										{KEYS_MAPPING[key]}
										{' '}
										:
									</span>
								)
							}
						</div>
						{key === 'high_demanding_port_pairs' && (
							<div>
								{portPairData[key].map((port_info) => (
									<SubCardInfo portInfo={port_info} key="123" info_key={key} />
								))}
							</div>
						)}
						{key === 'remaining_clusters' && (
							<div>
								<SubCardInfo portInfo={portPairData[key]} info_key={key} />
							</div>
						)}
					</div>
				)
			))}
		</div>
	);
}

export default SubCard;
