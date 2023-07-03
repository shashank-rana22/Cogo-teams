import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import PACKAGE_CONSTANTS from '../../../../common/packageConstants';
import TooltipContent from '../../commons/tooltipContent';

import styles from './styles.module.css';

const getColumns = ({ setShowDeleteModal, setShowCreateModal, activeTab }) => {
	const { tooltip_data, default_active_tab } = PACKAGE_CONSTANTS || {};
	const { min_length, start_index, end_index } = tooltip_data || {};

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
