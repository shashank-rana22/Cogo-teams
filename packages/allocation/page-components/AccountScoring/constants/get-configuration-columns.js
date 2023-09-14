import { Popover } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from '../components/EngagementScoring/WarmthScoring/EngagementType/styles.module.css';

const getTableColumns = ({ t = () => {} }) => [
	{
		Header   : t('allocation:lifecycle_item'),
		accessor : ({ event_name = '' }) => (
			<Popover placement="right" trigger="mouseenter" render={startCase(event_name)}>
				<div className={styles.table_lifecycle_item}>{startCase(event_name)}</div>
			</Popover>

		),
	},
	{
		Header   : t('allocation:diy_score_warmth_duration'),
		accessor : ({ diy_score = '', diy_warmth_duration = '' }) => (
			<div>
				{(diy_score && diy_warmth_duration) ? `${diy_score} & ${diy_warmth_duration}
			     ${t('allocation:days')}` : '-'}

			</div>
		),
	},
	{
		Header   : t('allocation:assisted_score_warmth_duration'),
		accessor : ({ assisted_score = '', assisted_warmth_duration = '' }) => (
			<div>
				{(assisted_score && assisted_warmth_duration)
					? `${assisted_score} & ${assisted_warmth_duration} ${t('allocation:days')}` : '-'}

			</div>
		),
	},
	{
		Header   : t('allocation:system_score_warmth_duration'),
		accessor : ({ system_score = '', system_warmth_duration = '' }) => (
			<div>
				{(system_score && system_warmth_duration)
					? `${system_score} & ${system_warmth_duration} ${t('allocation:days')}` : '-'}

			</div>
		),
	},
	{
		Header   : t('allocation:cogoverse_score_warmth_duration'),
		accessor : ({ cogoverse_score = '', cogoverse_warmth_duration = '' }) => (
			<div>
				{(cogoverse_score && cogoverse_warmth_duration)
					? `${cogoverse_score} & ${cogoverse_warmth_duration} ${t('allocation:days')}` : '-'}

			</div>
		),
	},
];

export default getTableColumns;
