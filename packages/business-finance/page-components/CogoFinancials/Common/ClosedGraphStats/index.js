import { Placeholder } from '@cogoport/components';
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
	showShipmentList = false,
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
	defaultWidth = '252',
	setTableFilters = () => {},
	infoContent = '',
	isCancelledExcluded = false,
}) {
	const { serviceLevelData, serviceLevelLoading } = useGetServiceLevelStats({
		entity,
		timeRange,
		statsType,
		filter,
		activeBar,
		customDate,
		serviceLevel: activeBar,
		isCancelledExcluded,
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
							infoContent={infoContent}
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
						<div style={{ width: '25vw' }}>
							{
								!serviceLevelLoading ? (
									<ClosedShipmentCard
										showHeading={false}
										isAdditonalView
										wrapElement
										isDeviationVisible={false}
										cardData={cardData}
										type={type}
										taxType={taxType}
									/>

								) : (<Placeholder height="100%" width="100%" />)
							}
						</div>

						<div className={styles.graphs}>
							{GRAPH.map((cardTitle, graphIndex) => (
								<SingleGraphCard
									heading={cardTitle}
									key={cardTitle}
									setActiveBar={setActiveBar}
									activeBar={activeBar}
									taxType={taxType}
									type={type}
									serviceLevelData={serviceLevelData}
									serviceLevelLoading={serviceLevelLoading}
									defaultWidth={defaultWidth}
									graphIndex={graphIndex}
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
					showShipmentList={showShipmentList}
					taxType={taxType}
					type={type}
					serviceLevelData={serviceLevelData}
					serviceLevelLoading={serviceLevelLoading}
					setTableFilters={setTableFilters}
				/>
			)}
		</div>
	);
}

export default ClosedGraphStats;
