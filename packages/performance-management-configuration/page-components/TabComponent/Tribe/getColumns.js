import { Button, Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const TOOLTIP_START_VALUE = 3;

const MIN_SQUADS_LENGTH = 3;

const SQUAD_INDEX_START = 0;

const SQUAD_INDEX_END = 3;

function TooltipContent({ item = [] }) {
	return (
		<div>
			{item.map((tag, i) => {
				if (i >= TOOLTIP_START_VALUE) {
					return <Pill key={tag?.name}>{startCase(tag?.squad_name)}</Pill>;
				}

				return null;
			})}
		</div>
	);
}

const getColumns = ({ setShowDeleteModal, setShowUpdateTribeModal }) => [
	{
		Header   : 'TRIBE NAME',
		accessor : (item) => <div>{startCase(item?.tribe_name) || '-'}</div>,
	},
	{
		Header   : 'TRIBE LEADER',
		accessor : (item) => <div>{startCase(item?.tribe_leader?.name) || '-'}</div>,
	},

	{
		Header   : 'SQUADS',
		accessor : (item) => (
			<div className={styles.pill_box}>
				{item?.squads
					?.slice(SQUAD_INDEX_START, SQUAD_INDEX_END)
					.map((singleSQUAD) => (
						<Pill
							key={singleSQUAD?.squad_name}
							size="md"
							className={styles.pill}
						>
							{startCase(singleSQUAD?.squad_name)}
						</Pill>
					))}

				{item?.squads?.length > MIN_SQUADS_LENGTH ? (
					<Pill>
						<Tooltip
							content={<TooltipContent item={item?.squads} />}
							placement="right"
							theme="light"
							interactive
							caret
							styles={{ marginBottom: '24px' }}
						>
							+
							{item.squads.length - SQUAD_INDEX_END}
							{' '}
							Squads
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
				className={item?.status === 'active' ? styles.active : styles.inactive}
			>
				{startCase(item?.status) || '-'}
			</Pill>
		),
	},
	{
		Header   : 'ACTION',
		accessor : (item) => (item?.status === 'active' ? (
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
					onClick={() => setShowUpdateTribeModal(item)}
				/>
			</div>
		) : (
			<Button themeType="secondary">Restore</Button>
		)),
	},
];

export default getColumns;
