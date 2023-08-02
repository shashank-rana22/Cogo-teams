import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';

import { LABEL_MAPPING } from '../../../constants';
import RenderCardHeader from '../../RenderCardHeader';
import SingleGraphCard from '../../SingleGraphCard';

import styles from './styles.module.css';

const GRAPHS = ['Operational Profitability', 'Revenue', 'Expense'];

function SingleParentBarStats({
	activeBar = '', setActiveBar = () => {}, isFullWidth = false,
	setShowShipmentList = () => {},
	taxType = '',
	type = '',
	serviceLevelData = [],
	serviceLevelLoading = false,
	serviceLevelApi = () => {},
}) {
	const onViewDetails = () => {
		setShowShipmentList(true);
	};

	useEffect(() => {
		serviceLevelApi(activeBar);
	}, [activeBar, serviceLevelApi]);

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
						{startCase(LABEL_MAPPING[type])}
					</div>
				</div>
			</div>
			<div
				className={styles.graphs}
				style={{ width: isFullWidth ? '100%' : '69%' }}
			>
				{GRAPHS.map((cardTitle) => (
					<SingleGraphCard
						heading={cardTitle}
						key={cardTitle}
						setActiveBar={setActiveBar}
						isViewDetailsVisible
						onViewDetails={onViewDetails}
						taxType={taxType}
						type={type}
						serviceLevelData={serviceLevelData}
						serviceLevelLoading={serviceLevelLoading}
					/>
				))}
			</div>
		</div>
	);
}

export default SingleParentBarStats;
