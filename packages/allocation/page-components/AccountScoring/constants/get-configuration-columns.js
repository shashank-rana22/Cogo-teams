import { Popover } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from '../components/EngagementScoring/WarmthScoring/EngagementType/styles.module.css';

const tableColumns = [
	{
		Header   : 'LIFECYCLE ITEM',
		accessor : ({ event_name = '' }) => (
			<Popover placement="right" trigger="mouseenter" render={startCase(event_name)}>
				<div className={styles.table_lifecycle_item}>{startCase(event_name)}</div>
			</Popover>

		),
	},
	{
		Header   : 'DIY SCORE & WARMTH DURATION',
		accessor : ({ diy_score = '', diy_warmth_duration = '' }) => (
			<div>{(diy_score && diy_warmth_duration) ? `${diy_score} & ${diy_warmth_duration} days` : '-'}</div>
		),
	},
	{
		Header   : 'ASSISTED SCORE & WARMTH DURATION',
		accessor : ({ assisted_score = '', assisted_warmth_duration = '' }) => (
			<div>
				{(assisted_score && assisted_warmth_duration)
					? `${assisted_score} & ${assisted_warmth_duration} days` : '-'}

			</div>
		),
	},
	{
		Header   : 'SYSTEM SCORE & WARMTH DURATION',
		accessor : ({ system_score = '', system_warmth_duration = '' }) => (
			<div>
				{(system_score && system_warmth_duration)
					? `${system_score} & ${system_warmth_duration} days` : '-'}

			</div>
		),
	},
	{
		Header   : 'COGOVERSE SCORE & WARMTH DURATION',
		accessor : ({ cogoverse_score = '', cogoverse_warmth_duration = '' }) => (
			<div>
				{(cogoverse_score && cogoverse_warmth_duration)
					? `${cogoverse_score} & ${cogoverse_warmth_duration} days` : '-'}

			</div>
		),
	},
];

export default tableColumns;
