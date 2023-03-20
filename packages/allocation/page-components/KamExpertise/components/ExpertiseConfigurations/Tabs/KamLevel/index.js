import { Button, Collapse } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
import useGetKamExpertiseConfig from '../../../../hooks/useGetKamExpertiseConfig';
import LoadingState from '../LoadingState';

import Header from './Header';
import KamLevelCard from './KamLevelCard';
import KamLevelDropDown from './KamLevelDropDown';
import ResponseCard from './ResponseCard';
import styles from './styles.module.css';

function KamLevel({ setMainLoading, selectedVersion }) {
	const { kamConfigDetails, levelLoading, refetch } = useGetKamExpertiseConfig({ selectedVersion });

	const [activeCard, setActiveCard] = useState('');
	const [createKam, setCreateKam] = useState(false);

	useEffect(() => {
		setMainLoading(levelLoading);
	}, [levelLoading, setMainLoading]);

	console.log('version in  tab', selectedVersion);

	const audit_data = kamConfigDetails?.audit_data || {};
	const kamConfigLevelDetails = kamConfigDetails?.data || [];

	const dataLength = kamConfigLevelDetails.length;
	const options = kamConfigLevelDetails.map((data, id) => ({

		key: id,

		title: <KamLevelCard
			data={data}
			activeCard={activeCard}
			setActiveCard={setActiveCard}
			id={id}
			dataLength={dataLength}
			refetch={refetch}
			selectedVersion={selectedVersion}

		/>,

		children: <KamLevelDropDown
			refetch={refetch}
			transition_level={data.transition_level}
			selectedVersion={selectedVersion}
		/>,

	}));
	useEffect(() => {
		refetch();
	}, [selectedVersion, refetch]);
	return (
		<div>
			<Header
				audit_data={audit_data}
				levelLoading={levelLoading}
			/>

			{isEmpty(kamConfigLevelDetails) && !levelLoading && !createKam ? (<EmptyState />) : (null)}

			{!levelLoading ? (
				<>
					<Collapse
						panels={options}
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
								selectedVersion={selectedVersion}
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

				</>

			) : (
				<LoadingState columnsToLoad={4} />
			)}

		</div>
	);
}
export default KamLevel;
