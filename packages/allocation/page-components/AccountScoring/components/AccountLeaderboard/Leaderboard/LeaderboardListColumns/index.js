import { Tooltip } from '@cogoport/components';
import { IcMUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import ScoreTrendChart from '../../../../common/ScoreTrendChart';

import styles from './styles.module.css';

const CONSTANTS = {
	TREND_BREAK_POINT                 : 0,
	MIN_STAKEHOLDERS                  : 0,
	FIRST_INDEX                       : 0,
	MIN_STAKEHOLDER_TO_RENDER_TOOLTIP : 1,
};

const getLeaderBoardColumns = ({ setScoreTrendIds }) => [
	{
		Header   : 'Position',
		accessor : ({ current_position, previous_position }) => {
			const trend = (!current_position || !previous_position)
				? CONSTANTS.TREND_BREAK_POINT : current_position - previous_position;

			const val = Math.abs(trend);

			return (
				<div className={styles.position}>
					{ current_position || '-'}

					<div className={styles.position_trend}>
						{val ? (
							<IcMUp
								height={12}
								width={12}
								style={{
									marginRight : '4px',
									color       : (trend < CONSTANTS.TREND_BREAK_POINT
										? '#34C759' : '#ED3726'),
									transform: (trend < CONSTANTS.TREND_BREAK_POINT
										? 'rotate(0deg)' : 'rotate(-180deg)'),
								}}
							/>
						) : ''}

						{(val !== CONSTANTS.TREND_BREAK_POINT) ? val : ''}
					</div>
				</div>
			);
		},
	},
	{
		Header   : 'Score Trend',
		accessor : (item) => (
			<div
				className={styles.score_trend}
				role="presentation"
				onClick={() => setScoreTrendIds({
					service_id      : item.service_id,
					service_user_id : item.service_user_id,
					service_type    : item.service_type,
				})}
			>
				{}
				<ScoreTrendChart trend={item.trend} data={item.data} />
			</div>
		),
	},
	{
		Header   : 'WARMTH',
		accessor : ({ warmth }) => (
			<div>
				{startCase(warmth) || ''}
			</div>
		),
	},
	{
		Header   : 'ACCOUNT',
		accessor : ({ business_name }) => (
			<div>
				{business_name || '-'}
			</div>
		),
	},
	{
		Header   : 'ALLOCATED KAM',
		accessor : ({ stakeholder_name = [] }) => {
			const totalStakeholders = stakeholder_name?.length;
			if (totalStakeholders === CONSTANTS.MIN_STAKEHOLDERS) {
				return '-';
			}

			const renderToolTip = stakeholder_name?.map((stakeholder) => `${startCase(stakeholder)}
			${totalStakeholders > CONSTANTS.MIN_STAKEHOLDER_TO_RENDER_TOOLTIP ? ', ' : ''}`);

			return (
				<Tooltip content={renderToolTip} placement="bottom">
					<div>
						{stakeholder_name?.[CONSTANTS.FIRST_INDEX] || '-'}
					</div>
					{totalStakeholders > CONSTANTS.MIN_STAKEHOLDER_TO_RENDER_TOOLTIP && (
						<strong>
							(+
							{' '}
							{totalStakeholders - CONSTANTS.MIN_STAKEHOLDER_TO_RENDER_TOOLTIP}
							)
						</strong>
					)}
				</Tooltip>
			);
		},

	},

];

export default getLeaderBoardColumns;
