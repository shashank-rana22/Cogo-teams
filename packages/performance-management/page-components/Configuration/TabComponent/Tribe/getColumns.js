import { Pill, Tooltip } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { formattedDate } from '../../../../common/formattedDate';
import PACKAGE_CONSTANTS from '../../../../common/packageConstants';
import TooltipContent from '../../commons/tooltipContent';

import styles from './styles.module.css';

function RenderSquads({ item, tooltip_data }) {
	const { min_length, start_index, end_index } = tooltip_data || {};

	return (
		<div className={styles.pill_box}>
			{item?.squads
				?.slice(start_index, end_index)
				.map((singleSQUAD) => (
					<Pill
						key={singleSQUAD?.squad_name}
						size="md"
						className={styles.pill}
					>
						{startCase(singleSQUAD?.squad_name)}
					</Pill>
				))}

			{item?.squads?.length > min_length ? (
				<Pill>
					<Tooltip
						content={<TooltipContent item={item?.squads} source="squad_name" />}
						placement="right"
						theme="light"
						interactive
						caret
						styles={{ marginBottom: '24px' }}
					>
						+
						{item.squads.length - end_index}
						{' '}
						Squads
					</Tooltip>
				</Pill>
			) : null}
		</div>
	);
}

const getColumns = ({ setShowDeleteModal, setShowCreateModal, activeTab }) => {
	const { tooltip_data, default_active_tab } = PACKAGE_CONSTANTS || {};

	const columnArray = [
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
				<RenderSquads item={item} tooltip_data={tooltip_data} />
			),
		},

		{
			Header   : 'LAST UPDATED AT',
			accessor : (item) => (
				<div>
					{formattedDate(item?.updated_at, 'dd MMM yyyy')}
				</div>
			),
		},

		{
			Header   : 'STATUS',
			accessor : (item) => (
				<Pill
					className={item?.status === default_active_tab ? styles.active : styles.inactive}
				>
					{startCase(item?.status) || '-'}
				</Pill>
			),
		},
	];

	if (activeTab === default_active_tab) {
		return [...columnArray,
			{
				Header   : 'ACTION',
				accessor : (item) => (
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
							onClick={() => setShowCreateModal(item)}
						/>
					</div>
				),
			}];
	}
	return columnArray;
};

export default getColumns;
