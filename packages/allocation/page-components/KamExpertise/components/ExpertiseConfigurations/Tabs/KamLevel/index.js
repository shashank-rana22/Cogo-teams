import { Collapse, Button } from '@cogoport/components';
import React, { useState } from 'react';

import useKamExpertiseConfig from '../../../../hooks/useKamExpertiseConfig';

import Header from './Header';
import KamLevelCard from './KamLevelCard';
import KamLevelDropDown from './KamLevelDropDown';
import ResponseCard from './ResponseCard';
import styles from './styles.module.css';

function KamLevel() {
	const { kamConfigDetails, levleLoading, refetch } = useKamExpertiseConfig();

	const [activeCard, setActiveCard] = useState(0);
	const [editMode, setEditMode] = useState(false);
	const [createKam, setCreateKam] = useState(false);

	const audit_data = kamConfigDetails?.audit_data || {};
	const kamConfigLevelDetails = kamConfigDetails?.data || [];

	const dataLength = kamConfigLevelDetails.length;
	const options = kamConfigLevelDetails.map((data) => ({

		key: data.transition_level,

		title: <KamLevelCard
			data={data}
			activeCard={activeCard}
			// setactiveCard
			setActiveCard={setActiveCard}
			// editMode={editMode}
			// setEditMode={setEditMode}
			id={data.transition_level - 1}
			dataLength={dataLength}
			refetch={refetch}
			levleLoading={levleLoading}
		/>,

		children: <KamLevelDropDown
			// key={data.transition_level}
			editMode={editMode}
			// id={data.transition_level - 1}
			activeCard={activeCard}
			setEditMode={setEditMode}
			refetch={refetch}
		/>,

	}));

	return (
		<div>
			<Header
				audit_data={audit_data}
			/>

			<Collapse
				panel={options}
				activeKey={activeCard}
				setActive={setActiveCard}
				type="text"
				className={styles.collapse}
			/>

			{createKam ? (
				<div className={styles.response_card}>
					<ResponseCard
						createKAM={createKam}
						setCreateKam={setCreateKam}
						dataLength={dataLength}
						refetch={refetch}
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
