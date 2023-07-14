import { Card, Placeholder } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';

import CardContent from './CardContent';
import styles from './styles.module.css';

function KamLevelScoreCard(props) {
	const {
		index_lvl,
		listData,
		setKamLevel,
		loading = false,
		date_params,
		setListParams,
		setOverviewParams,
	} = props;

	const { start_date, end_date } = date_params || {};

	const onKamChange = () => {
		setKamLevel(index_lvl + 1);

		setOverviewParams((pv) => ({
			...pv,
			kam_expertise_level : index_lvl + 1,
			filters             : {
				created_at_greater_than : start_date,
				created_at_less_than    : end_date,
			},
		}));

		setListParams((pv) => ({
			...pv,
			filters: {
				...pv.filters,
				created_at_greater_than : start_date,
				created_at_less_than    : end_date,
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
			onClick={() => onKamChange()}
		>
			<Card.Title title={(
				<div className={styles.card_title}>
					<div className={styles.kam_level}>
						KAM
						{' '}
						{index_lvl + 1}
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
