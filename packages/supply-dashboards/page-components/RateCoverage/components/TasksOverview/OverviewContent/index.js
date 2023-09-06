/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';

import { STAT_CARDS_MAPPING } from '../../../configurations/helpers/constants';

import Card from './Card';
import MainCard from './MainCard';
import styles from './styles.module.css';

function OverviewContent({ data = {}, statsLoading = false, filter = {}, setFilter = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				Here is today&rsquo;s tasks overview
			</div>
			<div className={styles.cards_container}>
				<MainCard data={data} statsLoading={statsLoading} />
				<div className={styles.details_card}>
					{Object.keys(STAT_CARDS_MAPPING).map((card_detail) => (
						<div
							className={(card_detail === filter?.status) ? styles.blue_card : styles.card}
							key={card_detail}
							onClick={() => {
								setFilter((prev) => ({ ...prev, status: card_detail }));
							}}
							role="button"
						>
							<Card
								detail={STAT_CARDS_MAPPING[card_detail]}
								data={data}
								statsLoading={statsLoading}
								activeCard={filter?.status}
								filter={filter}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default OverviewContent;
