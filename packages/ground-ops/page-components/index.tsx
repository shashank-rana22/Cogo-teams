import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import Air from './Air';
import Header from './Header';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'fcl',
		label : 'FCL',
	},
	{
		key   : 'air',
		label : 'AIR',
	},
	{
		key   : 'ltl',
		label : 'LTL',
	},
];

function GroundOps() {
	const [activeTab, setActiveTab] = useState('air');

	const onChange = (view) => {
		setActiveTab(view);
	};

	return (
		<div className={styles.container}>
			<Header />
			<div style={{ marginTop: 20 }}>
				{/* <Tabs
					activeTab={activeTab}
					themeType="tertiary"
					onChange={setActiveTab}
				>
					<TabPanel name="air" title="Air">
						<Air />
					</TabPanel>
				</Tabs> */}
				<div className={styles.flex}>
					{tabs.map((tab) => (
						<div
							key={tab.key}
							onClick={() => {
								onChange(tab.key);
							}}
							role="presentation"
						>
							<div
								className={tab.key === activeTab ? styles.sub_container_click : styles.sub_container}
							>
								{tab.label}
							</div>
						</div>
					))}
				</div>

				{activeTab === 'air' && <Air />}

			</div>
		</div>
	);
}

export default GroundOps;
