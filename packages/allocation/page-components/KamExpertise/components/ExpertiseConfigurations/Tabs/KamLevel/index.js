import { Collapse } from '@cogoport/components';
import { useState } from 'react';

import Header from '../Header';
import LoadingState from '../LoadingState';

import Footer from './Footer';
import KamLevelCard from './KamLevelCard';
import KamLevelDropDown from './KamLevelDropDown';
import styles from './styles.module.css';

function KamLevel(props) {
	const {
		levelLoading,
		kamConfigDetails,
		refetch,
		cardRefetch,
	} = props;

	const [activeCard, setActiveCard] = useState('');
	const [createKam, setCreateKam] = useState(false);

	const { audit_data : auditData = {}, data : kamConfigLevelDetails = [] } = kamConfigDetails || {};

	const dataLength = kamConfigLevelDetails.length;

	const options = kamConfigLevelDetails.map((data, index) => (
		{
			key   : data.transition_level,
			title : <KamLevelCard
				data={data}
				isActiveCard={activeCard === data?.transition_level}
				refetch={refetch}
				isLastCard={dataLength === index + 1}
				cardRefetch={cardRefetch}
			/>,
			children: <KamLevelDropDown
				refetch={refetch}
				cardRefetch={cardRefetch}
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

			{levelLoading
				? (<LoadingState columnsToLoad={4} />)
				: (
					<Collapse
						panels={options}
						activeKey={activeCard}
						setActive={setActiveCard}
						type="text"
						className={styles.collapse}
					/>
				)}

			<div className={styles.response_card}>
				<Footer
					createKam={createKam}
					setCreateKam={setCreateKam}
					dataLength={dataLength}
					refetch={refetch}
					cardRefetch={cardRefetch}
				/>
			</div>
		</section>
	);
}

export default KamLevel;
