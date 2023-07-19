import { Checkbox, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import ScoreTrendChart from '../../../../common/ScoreTrendChart';

import styles from './styles.module.css';

const CONSTANTS = {
	TREND_BREAK_POINT                 : 0,
	MIN_STAKEHOLDERS                  : 0,
	FIRST_INDEX                       : 0,
	MIN_STAKEHOLDER_TO_RENDER_TOOLTIP : 1,
	DEFAULT_SINGLE_CHECKED_ACCOUNT    : 1,
	MILISECONDS_IN_ONE_DAY            : 86400000,
};

const getLeaderBoardColumns = ({
	setScoreTrendIds,
	checkedRowsId = [],
	setCheckedRowsId = () => {},
	currentPageListIds = [],
	setIsAllChecked = () => {},
	isAllChecked = false,
	selectAllHelper = () => {},
	bulkDeallocateFilter = () => {},
	setModalDetailsArray,
	leaderboardList,
}) => {
	const onChangeBodyCheckbox = ({ event, service_user_id, item }) => {
		setCheckedRowsId((previousIds) => {
			let newCheckedIds = [];

			if (event.target.checked) {
				newCheckedIds = [...previousIds, service_user_id];
			} else {
				newCheckedIds = previousIds.filter((selectedId) => selectedId !== service_user_id);
			}

			setModalDetailsArray((previousData) => {
				let details = [];

				if (event.target.checked) {
					details = [...previousData, item];
				} else {
					details = previousData.filter((data) => newCheckedIds.includes(data.service_user_id));
				}

				return details;
			});

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

			setModalDetailsArray((previousData) => {
				let details = [];

				if (event.target.checked) {
					details = [...previousData, ...leaderboardList];
				} else {
					details = previousData.filter((data) => newCheckedRowsIds.includes(data.service_user_id));
				}

				return details;
			});

			setIsAllChecked(event.target.checked);

			return [...new Set(newCheckedRowsIds)];
		});
	};

	const columns = [
		{
			id     : 'check',
			Header : <Checkbox
				onChange={(event) => onChangeTableHeadCheckbox(event)}
				checked={isAllChecked}
				disabled={!bulkDeallocateFilter}
			/>,
			accessor: (item) => {
				const { service_user_id } = item;
				return (
					<Checkbox
						checked={checkedRowsId.includes(service_user_id)}
						onChange={(event) => onChangeBodyCheckbox({ event, service_user_id, item })}
						disabled={!bulkDeallocateFilter}
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
			accessor : ({ business_name }) => {
				const renderOrgName = () => `${startCase(business_name)}`;

				return (
					<Tooltip content={renderOrgName()} placement="bottom">
						<div className={styles.org_name}>
							{startCase(business_name) || '-'}
						</div>

					</Tooltip>

				);
			},
		},
		{
			Header   : 'USER NAME',
			accessor : ({ user_name }) => (
				<div>
					{startCase(user_name) || '-'}
				</div>
			),
		},
		{
			Header   : 'LAST TRANSACTION',
			accessor : ({ last_booking_date }) => (
				<div>
					{last_booking_date ? formatDate({
						date       : last_booking_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					}) : '-'}
				</div>
			),
		},
		{
			Header   : 'ALLOCATED KAM',
			accessor : ({ stakeholder_name = '', role_name = '' }) => {
				const renderToolTip = () => `${startCase(stakeholder_name)}`;

				return (
					<Tooltip content={renderToolTip()} placement="bottom">
						<div className={styles.stakeholder_name_container}>
							<div className={styles.stakeholder_name}>{startCase(stakeholder_name) || '-'}</div>
							<div className={styles.lower_label}>{role_name || ''}</div>
						</div>

					</Tooltip>
				);
			},

		},
		{
			Header   : 'ALLOCATED AT',
			accessor : ({ allocated_at }) => {
				const daysSinceAllocated = Math.floor((Date.now() - new Date(allocated_at))
				/ CONSTANTS.MILISECONDS_IN_ONE_DAY);

				return (
					<div>
						{allocated_at ? formatDate({
							date       : allocated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						}) : '-'}
						<div className={styles.lower_label}>{`${daysSinceAllocated} days`}</div>
					</div>

				);
			},
		},

	];
	return columns;
};

export default getLeaderBoardColumns;
