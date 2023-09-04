import { Checkbox, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import ScoreTrendChart from '../../../../common/ScoreTrendChart';

import styles from './styles.module.css';

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
	t = () => {},
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
			Header   : t('allocation:position'),
			accessor : ({ current_position, previous_position }) => {
				const trend = (!current_position || !previous_position)
					? GLOBAL_CONSTANTS.zeroth_index : current_position - previous_position;

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
										color       : (trend < GLOBAL_CONSTANTS.zeroth_index
											? '#34C759' : '#ED3726'),
										transform: (trend < GLOBAL_CONSTANTS.zeroth_index
											? 'rotate(0deg)' : 'rotate(-180deg)'),
									}}
								/>
							) : ''}

							{(val !== GLOBAL_CONSTANTS.zeroth_index) ? val : ''}
						</div>
					</div>
				);
			},
		},
		{
			Header   : t('allocation:score_trend'),
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
					<ScoreTrendChart trend={item.trend} data={item.data || []} source="leaderboard" />
				</div>
			),
		},
		{
			Header   : t('allocation:average_warmth'),
			accessor : ({ average_warmth = '' }) => (
				<div>
					{startCase(average_warmth || '') }
				</div>
			),
		},
		{
			Header   : t('allocation:segment'),
			accessor : ({ segment = '' }) => (
				<div>
					{startCase(segment || '') }
				</div>
			),
		},
		{
			Header   : t('allocation:org_name'),
			accessor : ({ business_name = '' }) => (
				<Tooltip content={startCase(business_name || '')} placement="bottom">

					<div className={styles.org_name}>
						{startCase(business_name || '-')}
					</div>

				</Tooltip>

			),
		},
		{
			Header   : t('allocation:user_name'),
			accessor : ({ user_name }) => (
				<div>
					{startCase(user_name) || '-'}
				</div>
			),
		},
		{
			Header   : t('allocation:last_booking_date'),
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
			Header   : t('allocation:allocated_kam'),
			accessor : ({ stakeholder_name = '', role_name = '' }) => (
				<Tooltip
					content={(
						<>
							<div>{startCase(stakeholder_name) || '-'}</div>
							<div className={styles.tooltip_lower_label}>{role_name || ''}</div>
						</>
					)}
					placement="bottom"
				>
					<div className={styles.stakeholder_name_container}>
						<div className={styles.stakeholder_name}>{startCase(stakeholder_name) || '-'}</div>
						<div className={styles.lower_label}>{role_name || ''}</div>
					</div>

				</Tooltip>
			),

		},
		{
			Header   : t('allocation:allocated_at'),
			accessor : ({ allocated_at }) => {
				const daysSinceAllocated = Math.floor((Date.now() - new Date(allocated_at))
				/ GLOBAL_CONSTANTS.milliseconds_in_one_day);

				return (
					<div>
						{allocated_at ? formatDate({
							date       : allocated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						}) : '-'}
						<div className={styles.lower_label}>
							{`${daysSinceAllocated} ${t('allocation:days')}`}

						</div>
					</div>

				);
			},
		},

	];
	return columns;
};

export default getLeaderBoardColumns;
