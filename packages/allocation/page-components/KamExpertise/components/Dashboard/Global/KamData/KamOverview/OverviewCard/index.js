import { Card, Placeholder, Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import ICON_MAPPING from '../../../../../../constants/icon-mapping';

import styles from './styles.module.css';

const ONE = 1;
const TWO = 2;

function OverviewCard(props) {
	const { t } = useTranslation(['allocation']);

	const { data = {}, overviewLoading = false } = props;

	const { expertise_type = '', avg_score = 0, max_condition } = data;

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
					{[ONE, TWO].map((item) => (
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
					<div style={{ fontSize: '24px' }}>{ICON_MAPPING[expertise_type] || ''}</div>

					<span className={styles.title_text}>{startCase(expertise_type)}</span>
				</div>
			)}
			/>

			<Card.Description className={styles.content}>
				<div className={styles.display_flex}>
					<span>{t('allocation:avg_score')}</span>

					<span className={styles.values}>
						{avg_score}
					</span>
				</div>

				<Tooltip
					content={(
						<div className={styles.tooltip_text}>
							{startCase(max_condition) || t('allocation:not_available')}
						</div>
					)}
					disabled={!(max_condition)}
					placement="top"
				>
					<div className={styles.display_flex}>
						<span>{t('allocation:mosts_points_in')}</span>

						<div className={styles.values}>
							{startCase(max_condition) || t('allocation:not_available')}
						</div>
					</div>
				</Tooltip>
			</Card.Description>
		</Card>
	);
}

export default OverviewCard;
