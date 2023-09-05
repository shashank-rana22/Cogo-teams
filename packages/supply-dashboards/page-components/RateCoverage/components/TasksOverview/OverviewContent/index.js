import React from 'react';

import { STAT_CARDS_MAPPING } from '../../../helpers/constants';

import Card from './Card';
import MainCard from './MainCard';
import styles from './styles.module.css';

function OverviewContent({ data = {}, statsLoading = false }) {
	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				Here is today&rsquo;s tasks overview
			</div>
			<div className={styles.cards_container}>
				<MainCard data={data} statsLoading={statsLoading} />
				<div className={styles.details_card}>
					{Object.keys(STAT_CARDS_MAPPING).map((card_detail) => (
						<div className={styles.card} key={card_detail}>
							<Card
								detail={STAT_CARDS_MAPPING[card_detail]}
								data={data}
								statsLoading={statsLoading}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default OverviewContent;
