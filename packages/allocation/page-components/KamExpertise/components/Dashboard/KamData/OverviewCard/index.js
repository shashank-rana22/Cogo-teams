import { Card, Placeholder, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function OverviewCard(props) {
	const { data = {}, leaderboardLoading = false } = props;

	if (leaderboardLoading) {
		return (
			<Card
				themetype="primary"
				disabled={false}
				className={styles.container}
			>
				<Card.Title title={(
					<div className={styles.title}>
						<Placeholder width="100%" height="24px" />
					</div>
				)}
				/>
				<Card.Description className={styles.content}>
					{Array(2).fill('').map(() => (
						<div className={styles.display_flex_loading}>
							<Placeholder width="100px" />

							<Placeholder style={{ marginTop: '8px' }} width="100px" />
						</div>
					))}
				</Card.Description>
			</Card>
		);
	}

	return (
		<Card
			themetype="primary"
			disabled={false}
			className={styles.container}
		>
			<Card.Title title={(
				<div className={styles.title}>
					<span>{data.icon}</span>

					<span style={{ padding: '0 10px' }}><h3>{data.title}</h3></span>

					<span style={{ paddingTop: '4px', width: '40px', height: '40px' }}>
						<Tooltip
							content={data.title}
							placement="top"
						>
							<IcMInfo
								width={16}
								height={16}
							/>
						</Tooltip>
					</span>
				</div>
			)}
			/>
			<Card.Description className={styles.content}>
				<div className={styles.display_flex}>
					<span style={{ fontSize: '12px' }}>
						Avg. Score
					</span>
					<span style={{ display: 'flex', fontWeight: 'bold' }}>
						{data.avg_score}
					</span>
				</div>
				<div className={styles.display_flex}>
					<span style={{ fontSize: '12px' }}>
						Most Points in
					</span>
					<span style={{ display: 'flex', fontWeight: 'bold' }}>
						{data.points_in}
					</span>
				</div>
			</Card.Description>
		</Card>
	);
}

export default OverviewCard;
