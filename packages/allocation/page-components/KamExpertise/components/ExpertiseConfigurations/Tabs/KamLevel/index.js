import React, { useState, useEffect } from 'react';

import useGetKamExpertiseConfig from '../../../../hooks/useGetKamExpertiseConfig';

import CollapseComponent from './CollapseComponent';
import KamLevelCard from './CollapseComponent/KamLevelCard';
import KamLevelDropDown from './CollapseComponent/KamLevelDropDown';
import Header from './Header';

function KamLevel({ setMainLoading, selectedVersion }) {
	const { kamConfigDetails, levelLoading, refetch } = useGetKamExpertiseConfig();

	const [activeCard, setActiveCard] = useState('');
	const [createKam, setCreateKam] = useState(false);

	useEffect(() => {
		setMainLoading(levelLoading);
	}, [levelLoading, setMainLoading]);

	useEffect(() => {
		refetch();
	}, [selectedVersion, refetch]);

	const auditData = kamConfigDetails?.audit_data || {};
	const kamConfigLevelDetails = kamConfigDetails?.data || [];

	const dataLength = kamConfigLevelDetails.length;
	const options = kamConfigLevelDetails.map((data, index) => (
		{
			key   : data.transition_level,
			title : <KamLevelCard
				data={data}
				activeCard={activeCard}
				setActiveCard={setActiveCard}
				id={data.transition_level}
				refetch={refetch}
				isLastCard={dataLength === index + 1}
			/>,
			children: <KamLevelDropDown
				refetch={refetch}
				transition_level={data.transition_level}
			/>,
		}
	));

	return (
		<section>
			<Header
				auditData={auditData}
				levelLoading={levelLoading}
			/>

			<CollapseComponent
				options={options}
				createKam={createKam}
				setActiveCard={setActiveCard}
				activeCard={activeCard}
				setCreateKam={setCreateKam}
				dataLength={dataLength}
				refetch={refetch}
				levelLoading={levelLoading}
			/>
		</section>
	);
}
export default KamLevel;
