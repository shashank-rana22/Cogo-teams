import { Pill, Popover, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateVertical, IcMOverflowDot } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import SCORING_PLAN_STATUS_COLOUR_MAPPING from '../../../../constants/scoring-plan-status-colour-mapping';

import Actions from './Actions';
import styles from './styles.module.css';

const handleSort = ({ params = {}, setParams = () => {}, sortBy }) => {
	if (params.sort_by === sortBy) {
		if (params.sort_type === 'asc') {
			setParams((prev) => ({ ...prev, sort_type: 'desc' }));
		} else {
			setParams((prev) => ({ ...prev, sort_type: 'asc' }));
		}
		return;
	}
	setParams((prev) => ({ ...prev, sort_by: sortBy, sort_type: 'desc' }));
};

const getListColumns = (props) => {
	const {
		params = {}, setParams = () => {}, handleDeactivate = () => {},
	} = props;
	const LIST_COLUMNS = [
		{
			id       : 'status',
			key      : 'status',
			Header   : <div className={styles.heading}>STATUS</div>,
			accessor : ({ status }) => (
				isEmpty(status) ? '___'
					: (
						<Pill
							size="md"
							color={SCORING_PLAN_STATUS_COLOUR_MAPPING[status]}
						>
							{startCase(status)}
						</Pill>
					)
			),
		},
		{
			id       : 'name',
			key      : 'name',
			Header   : <div className={styles.heading}>NAME</div>,
			accessor : ({ name }) => (isEmpty(name) ? '___' : <div>{name}</div>),
		},
		{
			id       : 'quest_string',
			key      : 'quest_string',
			Header   : <div className={styles.heading}>QUEST</div>,
			accessor : ({ quest_string }) => (
				// <div>
				<Tooltip content={quest_string} placement="bottom">
					<div className={styles.quest_tooltip}>{quest_string}</div>
				</Tooltip>
				// </div>
			),
		},
		{
			id  : 'start_date',
			key : 'start_date',
			Header:
			(
				<div className={cl`${styles.heading} ${styles.sort_column}`}>
					<div>STARTS AT</div>
					<IcMArrowRotateVertical
						style={{ marginLeft: '4px', cursor: 'pointer' }}
						onClick={() => handleSort({ params, setParams, sortBy: 'start_date' })}
					/>
				</div>
			),
			accessor: ({ start_date }) => (start_date
				? formatDate({
					date       : start_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) : '___'
			),
		},
		{
			id  : 'end_date',
			key : 'end_date',
			Header:
			(
				<div className={cl`${styles.heading} ${styles.sort_column}`}>
					<div>ENDS AT</div>
					<IcMArrowRotateVertical
						style={{ marginLeft: '4px', cursor: 'pointer' }}
						onClick={() => handleSort({ params, setParams, sortBy: 'start_date' })}
					/>
				</div>
			),
			accessor: ({ end_date }) => (end_date
				? formatDate({
					date       : end_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) : '___'
			),
		},
		{
			id  : 'created_at',
			key : 'created_at',
			Header:
			(
				<div className={cl`${styles.heading} ${styles.sort_column}`}>
					<div>CREATED AT</div>
					<IcMArrowRotateVertical
						style={{ marginLeft: '4px', cursor: 'pointer' }}
						onClick={() => handleSort({ params, setParams, sortBy: 'start_date' })}
					/>
				</div>
			),
			accessor: ({ created_at }) => (created_at
				? formatDate({
					date       : created_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) : '___'
			),
		},
		{
			id       : 'actions',
			key      : 'actions',
			Header   : <div className={styles.heading}>ACTIONS</div>,
			accessor : ({ id }) => (
				<div className={styles.actions}>

					<div>
						<Popover
							placement="left"
							interactive
							render={(
								<Actions quest_id={id} handleDeactivate={handleDeactivate} />
							)}
						>
							<div className={styles.action_icon_container}>
								<IcMOverflowDot
									width={16}
									height={16}
								/>
							</div>
						</Popover>
					</div>
				</div>
			),
		},
	];

	return LIST_COLUMNS;
};

export default getListColumns;
