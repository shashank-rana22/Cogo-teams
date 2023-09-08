import { ResponsivePie } from '@cogoport/charts/pie';
import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useTranslation } from 'next-i18next';

import DisplayTime from '../../../../common/DisplayTime';
import { statsMapping } from '../../../../configurations/stats-mapping';

import styles from './styles.module.css';

const DEFAULT_TOTAL_TICKET = 0;
const DEFAULT_COUNT = 0;

function OverallStats({ data = {}, ticketCount = {} }) {
	const { t } = useTranslation(['myTickets']);

	const pieData = Object.keys(ticketCount || {}).map((key) => ({
		id    : key.toLocaleLowerCase(),
		label : key,
		value : ticketCount[key] || DEFAULT_COUNT,
	})).filter((item) => item.label !== 'TotalTicket');

	return (
		<div className={styles.container}>
			<div className={cl`${styles.tile} ${styles.total_graph}`}>
				<div className={styles.graph}>
					<ResponsivePie
						data={pieData}
						innerRadius={0.85}
						enableArcLinkLabels={false}
						enableArcLabels={false}
						colors={['#F8AEA8', '#e0e0e0', '#FCDC00', '#7278AD', '#e76f51', '#2AC85F']}
						colorBy="index"
						margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
						tooltip={({
							datum: { label = '', value = '', id = '' },
						}) => (
							<div className={styles.pie_tooltip}>
								<div className={cl`${styles.tooltip_dot} ${styles[id]}`} />
								<div>
									{label}
									:
									{' '}
									{value}
									{' '}
									{t('myTickets:tickets_label')}
								</div>
							</div>
						)}
					/>
				</div>
				<div className={styles.graph_total}>
					<span className={styles.graph_label}>
						{t('myTickets:total_tickets_label')}
					</span>
					<span className={styles.graph_count}>
						{formatAmount({
							amount  : ticketCount?.TotalTicket || DEFAULT_TOTAL_TICKET,
							options : {
								style                 : 'decimal',
								notation              : 'compact',
								maximumFractionDigits : 2,
							},
						})}
					</span>
				</div>
				<div className={styles.legends}>
					{(pieData || []).map(({ id, label, value, isMargin }) => {
						if (label === 'TotalTicket') { return null; }

						return (
							<div className={cl`${styles.legend} ${isMargin ? styles.margin_bottom : ''}`} key={id}>
								<div className={styles.legend_count}>
									<div className={cl`${styles.dot} ${styles[id]}`} />
									<span className={styles.stats_count}>{value || DEFAULT_COUNT}</span>
								</div>
								<div className={styles.stats_label}>{label || ''}</div>
							</div>
						);
					})}
				</div>
			</div>

			{(statsMapping({ t }) || []).map((item) => {
				const { key, icon, label, type } = item || {};

				return (
					<div className={styles.tile} key={key}>
						<div>{icon}</div>
						<div className={styles.count}>
							{type ? <DisplayTime sec={data?.[key]} />
								: (ticketCount?.[key] || DEFAULT_COUNT).toFixed()}
						</div>
						<div className={styles.label}>{label || ''}</div>
					</div>
				);
			})}
		</div>

	);
}

export default OverallStats;
