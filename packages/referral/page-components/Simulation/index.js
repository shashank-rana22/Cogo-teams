import { Tabs, TabPanel, cl, Placeholder } from '@cogoport/components';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { NETWORK_EMPTY_STATE } from '../../constants';
import useGetSimulation from '../../hooks/useGetSimulation';

import MyResponsiveScatterPlot from './DiameterGraph';
import styles from './styles.module.css';

const loading = false;
const emptyState = false;

function LevelPayouts({ data }) {
	const levelData = data?.item?.data?.levelsData;
	const checkLevelEmptyState = isEmpty(levelData);

	if (checkLevelEmptyState) {
		return (
			<div className={cl`${styles.empty_state} ${styles.level_empty_state}`}>
				<Image
					src={NETWORK_EMPTY_STATE}
					alt="empty-state"
					width={150}
					height={150}
				/>
			</div>
		);
	}
	return (
		<div>
			<div className={styles.user_lavel_payouts}>
				{(levelData || []).map((item) => (
					<div
						className={styles.payouts}
						key={item}
					>
						<div className={cl`${styles.single_payouts} ${styles.network_level}`}>{item.levels}</div>
						<div className={cl`${styles.single_payouts} ${styles.payouts_level}`}>{item.payouts}</div>
					</div>
				))}
			</div>

			{!checkLevelEmptyState && (
				<>
					<div className={styles.total_payouts}>
						Total Payout:
						<div className={styles.amount}>INR 232456</div>
					</div>
					<div className={styles.total_payouts}>
						% of shipment value:
						<div className={styles.amount}>50%</div>
					</div>
				</>
			)}

		</div>
	);
}

function ReturnComponent({ type = '', singleData, setSingleData }) {
	const renderCom = {
		level   : <LevelPayouts data={singleData} />,
		revenue : <MyResponsiveScatterPlot
			singleData={singleData}
			setSingleData={setSingleData}
		/>,

	};
	if (loading) {
		return (
			<div>
				<div className={styles.networks_chart}>
					{[...Array(type === 'level' ? 14 : 15)].map((itm) => (
						<Placeholder
							className={styles.networks_skeleton}
							key={itm}
						/>
					))}
				</div>
			</div>
		);
	}
	if (emptyState) {
		return (
			<div className={cl`${styles.empty_state} ${type === 'level' && styles.level_empty_state}`}>
				<Image
					src={NETWORK_EMPTY_STATE}
					alt="empty-state"
					width={150}
					height={150}
				/>
			</div>
		);
	}
	return renderCom[type];
}

function SimulationGraphs() {
	const [singleData, setSingleData] = useState({});

	return (
		<div className={styles.conatiner}>
			<div className={styles.revenue_graph}>
				<div className={styles.diameter_header}>Revenue and % of Incentive chart</div>
				<ReturnComponent type="revenue" setSingleData={setSingleData} singleData={singleData} />
			</div>
			<div className={styles.level_graph}>
				<div className={styles.levels_header}>
					{['Levels', 'Payout (INR)'].map((itm) => (
						<div key={itm}>
							<div className={styles.level_name}>{itm}</div>
						</div>
					))}
				</div>
				<ReturnComponent type="level" setSingleData={setSingleData} singleData={singleData} />
			</div>
		</div>
	);
}

function Simulation() {
	const [activeTab, setActiveTab] = useState('shipment');

	const { data = {} } = useGetSimulation({ activeTab });
	console.log('data:', data);

	return (
		<Tabs
			activeTab={activeTab}
			themeType="primary"
			onChange={setActiveTab}
		>
			<TabPanel
				name="shipment"
				title="Shipment"
			>

				<SimulationGraphs />
			</TabPanel>

			<TabPanel
				name="subscription"
				title="Subscription"
			>
				<SimulationGraphs />
			</TabPanel>
		</Tabs>

	);
}

export default Simulation;
