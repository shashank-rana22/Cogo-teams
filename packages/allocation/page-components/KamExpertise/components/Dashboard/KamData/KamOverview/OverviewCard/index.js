import { Card, Placeholder, Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import ICON_MAPPING from '../../../../../constants/icon-mapping';

import styles from './styles.module.css';

function OverviewCard(props) {
	const { data = {}, overviewLoading = false } = props;

	if (overviewLoading) {
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
					{[1, 2].map((item) => (
						<div key={item} className={styles.display_flex_loading}>
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
					<div style={{ fontSize: '24px' }}>{ICON_MAPPING[data?.expertise_type]}</div>

					<span className={styles.title_text}>{startCase(data?.expertise_type)}</span>
				</div>
			)}
			/>

			<Card.Description className={styles.content}>
				<div className={styles.display_flex}>
					<span>Avg. Score</span>

					<span className={styles.values}>
						{data?.avg_score || 0}
					</span>
				</div>

				<Tooltip
					content={(
						<div className={styles.tooltip_text}>
							{startCase(data?.max_condition) || 'NA'}
						</div>
					)}
					placement="top"
				>
					<div className={styles.display_flex}>
						<span> Most Points in</span>

						<div className={styles.values}>
							{startCase(data?.max_condition) || 'NA'}
						</div>
					</div>
				</Tooltip>
			</Card.Description>
		</Card>
	);
}

export default OverviewCard;
