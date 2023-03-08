import { Collapse, Button } from '@cogoport/components';
import React, { useState } from 'react';

import Children from './Children';
import HeaderCard from './HeaderCard';
import useKamExpertiseConfig from './hooks/useKamExpertiseConfig';
import KamLevelCard from './KamLevelCard';
import ResponseCard from './ResponseCard';
import styles from './styles.module.css';

// todobug : delete button
function KamLevel() {
	const { kamConfigDetails = [], loading = false } = useKamExpertiseConfig();
	console.log('loading', loading);
	const [title, setTitle] = useState(0);
	const [action, setAction] = useState('show');
	const [createKam, setCreateKam] = useState(false);
	const dataLength = kamConfigDetails.length;
	const options = kamConfigDetails.map((data) => ({
		key   : data.transition_level,
		title : <KamLevelCard
			key={data.transition_level}
			data={data}
			title={title}
			setAction={setAction}
			id={data.transition_level - 1}
			dataLength={dataLength}
		/>,
		children: <Children
			key={data.transition_level}
			action={action}
			id={data.transition_level - 1}
			// ,data={data}
			title={title}
		/>,
	}));
	return (
		<div>
			<HeaderCard />
			<Collapse
				panel={options}
				activeKey={title}
				setActive={setTitle}
				type="text"
				className={styles.collapse}
			/>
			{createKam ? (
				<div className={styles.response_card}>
					<ResponseCard
						createKAM={createKam}
						setCreateKam={setCreateKam}
						dataLength={dataLength}
					/>
				</div>
			) : (
				<div style={{ marginTop: '10px' }}>
					<Button
						themeType="secondary"
						className={styles.create_button}
						onClick={() => setCreateKam(true)}
					>
						Create Kam Level
					</Button>
				</div>
			)}
		</div>
	);
}
export default KamLevel;
