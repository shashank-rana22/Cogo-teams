import { startCase } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';

import { LABEL_MAPPING } from '../../../constants';
import { TourContext } from '../../Contexts';
import RenderCardHeader from '../../RenderCardHeader';
import SingleGraphCard from '../../SingleGraphCard';
import { BAR_GROUP_CHILDREN } from '../../tourSteps';

import styles from './styles.module.css';

const Tour = dynamic(
	() => import('reactour'),
	{ ssr: false },
);

const GRAPHS = ['Operational Profitability', 'Revenue', 'Expense'];

function SingleParentBarStats({
	activeBar = '', setActiveBar = () => {}, isFullWidth = false,
	setShowShipmentList = () => {},
	showShipmentList = false,
	taxType = '',
	type = '',
	serviceLevelData = [],
	serviceLevelLoading = false,
	setTableFilters = () => {},
}) {
	const { tour, setTour, setIsTourInitial } = useContext(TourContext);
	const onViewDetails = () => {
		setShowShipmentList(true);
	};
	return (
		<div className={styles.container}>
			{!showShipmentList && (
				<Tour
					steps={BAR_GROUP_CHILDREN}
					isOpen={tour && !serviceLevelLoading}
					onRequestClose={() => {
						setTour(false);
						setIsTourInitial(true);
					}}
					maskClassName={styles.tour_mask}
					startAt={0}
					closeWithMask={false}
				/>
			)}
			<div className={styles.header_combine}>
				<RenderCardHeader
					title={`${activeBar} Profitability`}
					showBack
					onBack={() => {
						setActiveBar('');
						setShowShipmentList(false);
						setTableFilters((prev) => ({
							...prev,
							serviceLevel: null,
						}));
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
				data-tour="children-bar-group"
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
						showShipmentList={showShipmentList}
					/>
				))}
			</div>
		</div>
	);
}

export default SingleParentBarStats;
