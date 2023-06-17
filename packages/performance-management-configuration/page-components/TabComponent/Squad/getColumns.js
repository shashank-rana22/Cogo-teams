import { Button, Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const TOOLTIP_START_VALUE = 3;
const MIN_EMPLOYEES_LENGTH = 3;
const EMPLOYEE_INDEX_START = 0;
const EMPLOYEE_INDEX_END = 3;
const STATUS_TYPE_ACTIVE = 'active';

function TooltipContent({ item = [] }) {
	return (
		<div>
			{item.map((tag, i) => {
				if (i >= TOOLTIP_START_VALUE) {
					return <Pill key={tag?.name}>{tag?.name}</Pill>;
				}

				return null;
			})}
		</div>
	);
}

const getColumns = ({ setShowDeleteModal, setShowSquadModal }) => [
	{
		Header   : 'SQUAD NAME',
		accessor : (item) => <div>{item?.squad_name || '-'}</div>,
	},
	{
		Header   : 'SQUAD LEADER',
		accessor : (item) => <div>{startCase(item?.squad_leader?.name) || '-'}</div>,
	},
	{
		Header   : 'EMPLOYEES',
		accessor : (item) => (
			<div className={styles.pill_box}>
				{item?.employees
					?.slice(EMPLOYEE_INDEX_START, EMPLOYEE_INDEX_END)
					.map((singleEmplyee) => (
						<Pill key={singleEmplyee?.name} size="md" className={styles.pill}>
							{singleEmplyee?.name}
						</Pill>
					))}

				{item?.employees?.length > MIN_EMPLOYEES_LENGTH ? (
					<Pill>
						<Tooltip
							content={<TooltipContent item={item?.employees} />}
							placement="right"
							theme="light"
							interactive
							caret
							styles={{ marginBottom: '24px' }}
						>
							+
							{item.employees.length - EMPLOYEE_INDEX_END}
							{' '}
							EMPLOYEES
						</Tooltip>
					</Pill>
				) : null}
			</div>
		),
	},
	{
		Header   : 'LAST UPDATED AT',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item?.updated_at,
					formatType : 'date',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				})}
			</div>
		),
	},
	{
		Header   : 'STATUS',
		accessor : (item) => (
			<Pill
				className={item?.status === STATUS_TYPE_ACTIVE ? styles.active : styles.inactive}
			>
				{startCase(item?.status) || '-'}
			</Pill>
		),
	},
	{
		Header   : 'ACTION',
		accessor : (item) => (item?.status === STATUS_TYPE_ACTIVE ? (
			<div className={styles.button}>
				<IcMDelete
					width={16}
					height={16}
					style={{ cursor: 'pointer' }}
					onClick={() => setShowDeleteModal(item.id)}
				/>
				<IcMEdit
					width={16}
					height={16}
					style={{ marginLeft: 12, cursor: 'pointer' }}
					onClick={() => setShowSquadModal(item)}
				/>
			</div>
		) : (
			<Button themeType="secondary">Restore</Button>
		)),
	},
];

export default getColumns;
