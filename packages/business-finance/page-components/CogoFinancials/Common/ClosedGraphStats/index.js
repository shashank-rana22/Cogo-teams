import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import ClosedShipmentCard from '../../ClosedShipmentCard';
import { LABEL_MAPPING } from '../../constants';
import useGetServiceLevelStats from '../../hooks/useGetServiceLevelStats';
import RenderCardHeader from '../RenderCardHeader';
import SingleGraphCard from '../SingleGraphCard';

import SingleParentBarStats from './SingleParentBarStats';
import styles from './styles.module.css';

const GRAPH = ['Operational Profitability', 'Revenue', 'Expense'];

function ClosedGraphStats({
	title = '', setActiveShipmentCard = () => { },
	setShowShipmentList = () => { },
	entity = '',
	timeRange = '',
	statsType = '',
	filter = {},
	cardData = [],
	type = '',
	taxType = '',
	customDate = new Date(),
	activeBar = '',
	setActiveBar = () => {},
	defaultWidth = '400',
}) {
	const { serviceLevelApi, serviceLevelData, serviceLevelLoading } = useGetServiceLevelStats({
		entity,
		timeRange,
		statsType,
		filter,
		activeBar,
		customDate,
	});

	return (
		<div className={styles.container}>
			{isEmpty(activeBar) ? (
				<div>
					<div className={styles.header_combine}>
						<RenderCardHeader
							title={`${title} Shipments`}
							showInfo
							showBack
							onBack={() => setActiveShipmentCard('')}
						/>
						<div className={styles.graph_label_container}>
							<div
								className={styles.dot}
								style={{ background: '#cfeaed' }}
							/>
							<div className={styles.graph_label}>
								Estimated
							</div>
							<div
								className={styles.dot}
								style={{ background: '#6fa5ab' }}
							/>
							<div className={styles.graph_label}>
								{startCase(LABEL_MAPPING[type])}
							</div>
						</div>
					</div>

					<div style={{ display: 'flex' }}>
						<div style={{ width: '28%' }}>
							<ClosedShipmentCard
								showHeading={false}
								isAdditonalView
								wrapElement
								isDeviationVisible={false}
								cardData={cardData}
								type={type}
								taxType={taxType}
							/>
						</div>

						<div className={styles.graphs}>
							{GRAPH.map((cardTitle) => (
								<SingleGraphCard
									heading={cardTitle}
									key={cardTitle}
									setActiveBar={setActiveBar}
									taxType={taxType}
									type={type}
									serviceLevelData={serviceLevelData}
									serviceLevelLoading={serviceLevelLoading}
									defaultWidth={defaultWidth}
								/>
							))}
						</div>

					</div>
				</div>
			) : (
				<SingleParentBarStats
					activeBar={activeBar}
					setActiveBar={setActiveBar}
					isFullWidth
					setShowShipmentList={setShowShipmentList}
					taxType={taxType}
					type={type}
					serviceLevelData={serviceLevelData}
					serviceLevelLoading={serviceLevelLoading}
					serviceLevelApi={serviceLevelApi}
				/>
			)}
		</div>
	);
}

export default ClosedGraphStats;
