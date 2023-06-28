import { Checkbox, Tooltip } from '@cogoport/components';
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

const getLeaderBoardColumns = ({
	setScoreTrendIds,
	checkedRowsId,
	setCheckedRowsId,
	currentPageListIds,
	setIsAllChecked,
	isAllChecked,
	selectAllHelper = () => {},
}) => {
	const onChangeBodyCheckbox = ({ event, user_id }) => {
		setCheckedRowsId((previousIds) => {
			let newCheckedIds = [];

			if (event.target.checked) {
				newCheckedIds = [...previousIds, user_id];
			} else {
				newCheckedIds = previousIds.filter((selectedId) => selectedId !== user_id);
			}

			selectAllHelper(newCheckedIds);

			return newCheckedIds;
		});
	};

	const onChangeTableHeadCheckbox = (event) => {
		setCheckedRowsId((previousIds) => {
			let newCheckedRowsIds = [...previousIds];

			if (event.target.checked) {
				newCheckedRowsIds = [...newCheckedRowsIds, ...currentPageListIds];
			} else {
				newCheckedRowsIds = previousIds.filter((id) => !currentPageListIds.includes(id));
			}

			setIsAllChecked(event.target.checked);

			return [...new Set(newCheckedRowsIds)];
		});
	};

	const columns = [
		{
			id       : 'check',
			Header   : <Checkbox onChange={(event) => onChangeTableHeadCheckbox(event)} checked={isAllChecked} />,
			accessor : ({ user_id = '', warmth = '' }) => {
				const isHotTransactable = warmth === 'ice_cold' || warmth === 'cold';
				return (
					<Checkbox
						checked={checkedRowsId.includes(user_id)}
						onChange={(event) => onChangeBodyCheckbox({ event, user_id })}
						disabled={!isHotTransactable}
					/>

				);
			},

		},
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
					<ScoreTrendChart trend={item.trend} data={item.data} source="leaderboard" />
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
			Header   : 'SEGMENT',
			accessor : ({ segment }) => (
				<div>
					{startCase(segment) || ''}
				</div>
			),
		},
		{
			Header   : 'ORG NAME',
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
	return columns;
};

export default getLeaderBoardColumns;
