import { Collapse, Button } from '@cogoport/components';
import React, { useState } from 'react';

import useKamExpertiseConfig from '../../../../hooks/useKamExpertiseConfig';

import Header from './Header';
import KamLevelCard from './KamLevelCard';
import KamLevelDropDown from './KamLevelDropDown';
import ResponseCard from './ResponseCard';
import styles from './styles.module.css';

// todobug : delete button
function KamLevel() {
	const { kamConfigDetails = [], loading = false, refetch } = useKamExpertiseConfig();

	const [title, setTitle] = useState(0);
	const [editMode, setEditMode] = useState(false);
	const [createKam, setCreateKam] = useState(false);

	const dataLength = kamConfigDetails.length;
	const options = kamConfigDetails.map((data) => ({

		key: data.transition_level,

		title: <KamLevelCard
			key={data.transition_level}
			data={data}
			title={title}
			setTitle={setTitle}
			editMode={editMode}
			setEditMode={setEditMode}
			id={data.transition_level - 1}
			dataLength={dataLength}
			refetch={refetch}
		/>,

		children: <KamLevelDropDown
			key={data.transition_level}
			editMode={editMode}
			id={data.transition_level - 1}
			title={title}
			setEditMode={setEditMode}
		/>,

	}));

	return (
		<div>
			<Header />

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
