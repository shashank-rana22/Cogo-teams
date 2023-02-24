import { useState } from 'react';

import SegmentedControl from '../../commons/SegmentedControl';
import MyResponsiveLines from '../Components/linecharts';
import MyResponsiveBar from '../Components/ResponsiveBar';
import data from '../Components/ResponsiveBar/data';
import MyResponsiveLine from '../Components/Stream';
import lineData from '../Components/Stream/data';

import styles from './styles.module.css';

function Dashboard() {
	const [currentTab, setCurrentTab] = useState('');

	const OPTIONS = [
		{
			label : 'Open Jobs',
			value : 'per_package',
		},
		{
			label : 'Closed Jobs',
			value : 'total_gross',
		},
	];
	return (
		<>
			<div className={styles.spacebetween}>
				<div
					style={{
						minWidth     : '60%',
						height       : 368,
						background   : '#ffffff',
						borderRadius : '8px',
						margin       : '16px',
					}}
				>
					<MyResponsiveLine data={lineData} />
				</div>
				<div
					style={{
						height       : 368,
						minWidth     : '35%',
						background   : '#ffffff',
						borderRadius : '8px',
						margin       : '16px',
					}}
				>
					<MyResponsiveBar data={data} />
				</div>
			</div>
			<div className={styles.spacebetween}>
				<div
					style={{
						background   : '#ffffff',
						minWidth     : '50%',
						height       : 323,
						borderRadius : '8px',
						margin       : '16px',
						padding      : '16px',
					}}
				>
					<div className={styles.flex}>
						<div className={styles.heading}>Job Related Statistics</div>
						<SegmentedControl
							options={OPTIONS}
							activeTab={currentTab}
							setActiveTab={setCurrentTab}
							color="#ED3726"
							background="#FFFAEB"
						/>
					</div>
					<div className={styles.totalstats}>
						<div>
							<div className={styles.stat}>25</div>
							<div className={styles.month}>Current Month - March</div>
						</div>
						<div>
							<div className={styles.stat}>25</div>
							<div className={styles.month}>February</div>
						</div>
						<div>
							<div className={styles.stat}>25</div>
							<div className={styles.month}>January</div>
						</div>
					</div>
				</div>
				<div
					style={{
						height       : 323,
						minWidth     : '45%',
						background   : '#ffffff',
						borderRadius : '8px',
						margin       : '16px',
					}}
				>
					<MyResponsiveLines />
				</div>
			</div>

		</>
	);
}
export default Dashboard;
