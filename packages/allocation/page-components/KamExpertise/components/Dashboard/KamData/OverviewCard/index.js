import { Card, Placeholder, Tooltip } from '@cogoport/components';
import {
	IcMInfo, IcMAgentManagement, IcMTradeparties,
	IcMBreakBulkCargoType, IcMMiscellaneous,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const Icon_Mapping = {
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
					<span>{Icon_Mapping[data.expertise_type]}</span>

					<span className={styles.title_text}>{startCase(data.expertise_type)}</span>

					<span style={{ paddingTop: '4px', width: '40px', height: '40px' }}>
						<Tooltip
							content={startCase(data.expertise_type)}
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

					<span style={{ display: 'flex', fontWeight: 'bold' }}>
						{data.avg_score}
					</span>
				</div>

				<div className={styles.display_flex}>
					<span> Most Points in </span>

					<span style={{ display: 'flex', fontWeight: 'bold' }}>
						{data.max_condition}
					</span>
				</div>
			</Card.Description>
		</Card>
	);
}

export default OverviewCard;
