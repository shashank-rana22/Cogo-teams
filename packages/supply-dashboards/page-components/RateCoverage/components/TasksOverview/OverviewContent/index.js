import React from 'react';

import { STAT_CARDS_MAPPING } from '../../../configurations/helpers/constants';

import Card from './Card';
import MainCard from './MainCard';
import styles from './styles.module.css';

function OverviewContent({ data = {}, statsLoading = false, filter = {}, setFilter = () => {}, setSource = () => {} }) {
	const handleClick = (card_detail) => {
		setFilter((prev) => ({ ...prev, status: card_detail }));
		setSource(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				Here is today&rsquo;s tasks overview
			</div>
			<div className={styles.cards_container}>
				<MainCard data={data} statsLoading={statsLoading} />
				<div className={styles.details_card}>
					{Object.keys(STAT_CARDS_MAPPING).map((card_detail) => (
						<Card
							detail={STAT_CARDS_MAPPING[card_detail]}
							data={data}
							key={card_detail}
							statsLoading={statsLoading}
							activeCard={filter?.status}
							filter={filter}
							className={(card_detail === filter?.status) ? 'blue_card' : 'card'}
							handleClick={() => handleClick(card_detail)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default OverviewContent;
