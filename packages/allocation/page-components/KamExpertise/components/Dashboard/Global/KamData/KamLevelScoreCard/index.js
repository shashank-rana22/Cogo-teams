import { Card, Placeholder } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';

import CardContent from './CardContent';
import styles from './styles.module.css';

const INDEX_LENGTH_NOMRALIZATION = 1;

function KamLevelScoreCard(props) {
	const {
		index_lvl,
		listData,
		setKamLevel,
		loading = false,
		setListParams,
		setOverviewParams,
	} = props;

	const onKamChange = () => {
		setKamLevel(index_lvl + INDEX_LENGTH_NOMRALIZATION);

		setOverviewParams((pv) => ({
			...pv,
			kam_expertise_level : index_lvl + INDEX_LENGTH_NOMRALIZATION,
			filters             : {
			},
		}));

		setListParams((pv) => ({
			...pv,
			filters: {
				...pv.filters,
				kam_expertise_level: index_lvl + INDEX_LENGTH_NOMRALIZATION,
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
			onClick={() => onKamChange()}
		>
			<Card.Title title={(
				<div className={styles.card_title}>
					<div className={styles.kam_level}>
						KAM
						{' '}
						{index_lvl + INDEX_LENGTH_NOMRALIZATION}
					</div>

					<IcMArrowNext width={28} height={28} style={{ color: 'red' }} />
				</div>
			)}
			/>

			<Card.Description className={styles.card_content}>
				<CardContent listData={listData} value="count" />

				<CardContent listData={listData} value="average_score" />
			</Card.Description>
		</Card>
	);
}

export default KamLevelScoreCard;
