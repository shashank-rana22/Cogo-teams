import { Card, Placeholder, Tooltip } from '@cogoport/components';
import {
	IcMInfo, IcMAgentManagement, IcMTradeparties,
	IcMBreakBulkCargoType, IcMMiscellaneous,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const ICON_MAPPING = {
	customer_expertise  : <IcMAgentManagement height={24} width={24} />,
	trade_expertise     : <IcMTradeparties height={24} width={24} />,
	commodity_expertise : <IcMBreakBulkCargoType height={24} width={24} />,
	miscellaneous       : <IcMMiscellaneous height={24} width={24} />,
};

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
					<span>{ICON_MAPPING[data?.expertise_type]}</span>

					<span className={styles.title_text}>{startCase(data?.expertise_type)}</span>

					<span className={styles.tooltip}>
						<Tooltip
							content={data?.max_condition || 'NA'}
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
					<span>Avg. Score</span>

					<span className={styles.values}>
						{data?.avg_score || 0}
					</span>
				</div>

				<div className={styles.display_flex}>
					<span> Most Points in</span>

					<span className={styles.values}>
						{data?.max_condition.length > 15
							? `${data?.max_condition.substring(0, 15)}...`
							: data?.max_condition || 'NA'}
					</span>
				</div>
			</Card.Description>
		</Card>
	);
}

export default OverviewCard;
