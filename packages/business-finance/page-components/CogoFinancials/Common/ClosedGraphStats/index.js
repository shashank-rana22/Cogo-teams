import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import ClosedShipmentCard from '../../ClosedShipmentCard';
import RenderCardHeader from '../RenderCardHeader';
import SingleGraphCard from '../SingleGraphCard';

import SingleParentBarStats from './SingleParentBarStats';
import styles from './styles.module.css';

function ClosedGraphStats({
	title = '', setActiveShipmentCard = () => {},
	setShowShipmentList = () => {},
}) {
	const [activeBar, setActiveBar] = useState('');
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
								Actual
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
							/>
						</div>

						<div className={styles.graphs}>
							{['Operational Profitability', 'Revenue', 'Expense'].map((cardTitle) => (
								<SingleGraphCard
									heading={cardTitle}
									key={cardTitle}
									setActiveBar={setActiveBar}
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
				/>
			)}
		</div>
	);
}

export default ClosedGraphStats;
