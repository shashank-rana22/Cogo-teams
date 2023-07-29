import React from 'react';

import RenderCardHeader from '../../RenderCardHeader';
import SingleGraphCard from '../../SingleGraphCard';

import styles from './styles.module.css';

function SingleParentBarStats({
	activeBar = '', setActiveBar = () => {}, isFullWidth = false,
	setShowShipmentList = () => {},
}) {
	const onViewDetails = () => {
		setShowShipmentList(true);
	};
	return (
		<div className={styles.container}>

			<div className={styles.header_combine}>
				<RenderCardHeader
					title={`${activeBar} Profitability`}
					showInfo
					showBack
					onBack={() => {
						setActiveBar('');
						setShowShipmentList(false);
					}}
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
			<div
				className={styles.graphs}
				style={{ width: isFullWidth ? '100%' : '69%' }}
			>
				{['Operational Profitability', 'Revenue', 'Expense'].map((cardTitle) => (
					<SingleGraphCard
						heading={cardTitle}
						key={cardTitle}
						setActiveBar={setActiveBar}
						isViewDetailsVisible
						onViewDetails={onViewDetails}
					/>
				))}
			</div>
		</div>
	);
}

export default SingleParentBarStats;
