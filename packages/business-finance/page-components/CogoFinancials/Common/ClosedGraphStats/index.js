import React from 'react';

import ClosedShipmentCard from '../../ClosedShipmentCard';
import RenderCardHeader from '../RenderCardHeader';
import SingleGraphCard from '../SingleGraphCard';

import styles from './styles.module.css';

function ClosedGraphStats({ title = '', setActiveShipmentCard = () => {} }) {
	return (
		<div>
			<div className={styles.container}>
				<div>
					<RenderCardHeader
						title={`${title} Shipments`}
						showInfo
						showBack
						onBack={() => setActiveShipmentCard('')}
					/>
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
							<SingleGraphCard heading={cardTitle} key={cardTitle} />
						))}
					</div>

				</div>
			</div>
		</div>
	);
}

export default ClosedGraphStats;
