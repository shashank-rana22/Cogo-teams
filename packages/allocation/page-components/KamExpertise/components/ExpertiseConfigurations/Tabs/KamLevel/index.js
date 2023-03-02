import { Collapse } from '@cogoport/components';
import React, { useState } from 'react';

import Children from './Children';
import { dummyData } from './DummyData';
import HeaderCard from './HeaderCard';
import useKamExpertiseConfig from './hooks/useKamExpertiseConfig';
import KamLevelCard from './KamLevelCard';
import styles from './styles.module.css';

function KamLevel() {
	const { KamConfig, loading = false } = useKamExpertiseConfig();
	const [title, setTitle] = useState(false);
	const [action, setAction] = useState('show');

	const dataLength = dummyData.length;
	console.log('hiihi', dataLength);

	console.log('LIST KAM::', KamConfig);
	console.log('LOADING::', loading);

	const options = dummyData.map((data) => (
		{
			key   : data.transition_level,
			title : <KamLevelCard
				key={data.transition_level}
				data={data}
				title={title}
				setAction={setAction}
				id={data.transition_level}
				dataLength={dataLength}
			/>,
			children: <Children key={data.transition_level} action={action} data={data} />,
		}
	));

	return (
		<div>
			<HeaderCard />
			<div>

				<Collapse
					panel={options}
					activeKey={title}
					setActive={setTitle}
					type="text"
					className={styles.collapse}
				/>

			</div>
		</div>
	);
}

export default KamLevel;
