import { Card, Placeholder } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import CardContent from '../CardContent';

import styles from './styles.module.css';

function KamLevelScoreCard(props) {
	const { dummy_data, setCardData } = props;
	//! pass loading
	return (
		(false)
			? (
				<Card
					className={styles.card_item}
				>
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
			)
			: (
				<Card
					themetype="primary"
					disabled={false}
					className={styles.card_item}
					onClick={() => setCardData(dummy_data)}
				>
					<Card.Title title={(
						<div className={styles.card_title}>
							<h3>{dummy_data.title}</h3>
							<IcMArrowNext width={28} height={28} style={{ color: 'red' }} />
						</div>
					)}
					/>
					<Card.Description className={styles.card_content}>
						<CardContent dummy_data={dummy_data} value="count" />
						<CardContent dummy_data={dummy_data} value="avg_score" />
					</Card.Description>
				</Card>
			)
	);
}

export default KamLevelScoreCard;
