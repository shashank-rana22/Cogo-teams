import { Collapse } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
import useGetKamExpertiseConfig from '../../../../hooks/useGetKamExpertiseConfig';

import Header from './Header';
import KamLevelCard from './KamLevelCard';
import KamLevelDropDown from './KamLevelDropDown';
import LoadingState from './LoadingState';
import ResponseCard from './ResponseCard';
import styles from './styles.module.css';

function KamLevel() {
	const { kamConfigDetails, levelLoading, refetch } = useGetKamExpertiseConfig();

	const [activeCard, setActiveCard] = useState('');
	const [createKam, setCreateKam] = useState(false);

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

		/>,

		children: <KamLevelDropDown
			refetch={refetch}
			transition_level={data.transition_level}
		/>,

	}));

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
						panel={options}
						activeKey={activeCard}
						setActive={setActiveCard}
						type="text"
						className={styles.collapse}
					/>
					<div className={styles.response_card}>
						<ResponseCard
							createKAM={createKam}
							setCreateKam={setCreateKam}
							dataLength={dataLength}
							refetch={refetch}
						/>
					</div>
				</>

			) : (
				<LoadingState />
			)}

		</div>
	);
}
export default KamLevel;
