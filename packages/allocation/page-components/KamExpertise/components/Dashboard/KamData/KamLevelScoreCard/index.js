import { Card, Placeholder } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import CardContent from './CardContent';
import styles from './styles.module.css';

function KamLevelScoreCard(props) {
	const {
		index_lvl,
		list_data,
		setKamLevel,
		loading = false,
		date_params,
		setParams,
	} = props;

	const KamChange = () => {
		setKamLevel(index_lvl + 1);
		setParams((pv) => ({
			...pv,
			filters: {
				...pv.filters,
				created_at_greater_than : date_params.start_date,
				created_at_less_than    : date_params.end_date,
				kam_expertise_level     : index_lvl + 1,
			},
		}));
	};

	if (loading) {
		return (
			<Card className={styles.card_item}>
				<Card.Title title={(
					<div className={styles.card_title}>
						<Placeholder width="60px" height="20px" />
					</div>
				)}
				/>
				<Card.Description className={styles.card_content}>
					<Placeholder width="100px" height="60px" style={{ marginTop: '16px' }} />
					<Placeholder width="100px" height="60px" style={{ marginTop: '16px' }} />
				</Card.Description>
			</Card>
		);
	}

	return (
		<Card
			themetype="primary"
			disabled={false}
			className={styles.card_item}
			onClick={KamChange}
		>
			<Card.Title title={(
				<div className={styles.card_title}>
					<h3>
						KAM
						{' '}
						{index_lvl + 1}
					</h3>
					<IcMArrowNext width={28} height={28} style={{ color: 'red' }} />
				</div>
			)}
			/>
			<Card.Description className={styles.card_content}>
				<CardContent list_data={list_data} value="count" />
				<CardContent list_data={list_data} value="average" />
			</Card.Description>
		</Card>
	);
}

export default KamLevelScoreCard;
