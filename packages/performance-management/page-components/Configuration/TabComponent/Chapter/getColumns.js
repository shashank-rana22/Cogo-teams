import { Pill, Tooltip } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { formattedDate } from '../../../../common/formattedDate';
import PACKAGE_CONSTANTS from '../../../../common/packageConstants';
import TooltipContent from '../../commons/tooltipContent';

import styles from './styles.module.css';

function RenderSubChapters({ item, tooltip_data }) {
	const { min_length, start_index, end_index } = tooltip_data || {};

	return (
		<div className={styles.pill_box}>
			{item?.sub_chapters
				?.slice(start_index, end_index)
				.map((single_sub) => (
					<Pill key={single_sub?.name} size="md" className={styles.pill}>
						{startCase(single_sub?.sub_chapter_name)}
					</Pill>
				))}

			{item?.sub_chapters?.length > min_length ? (
				<Pill>
					<Tooltip
						content={<TooltipContent item={item?.sub_chapters} source="sub_chapter_name" />}
						placement="right"
						theme="light"
						caret
						interactive
						styles={{ marginBottom: '24px' }}
					>
						+
						{item.sub_chapters.length - end_index}
						{' '}
						Sub chapters
					</Tooltip>
				</Pill>
			) : null}
		</div>
	);
}

const getColumns = ({ setShowDeleteModal, setShowCreateModal, activeTab }) => {
	const { default_active_tab, tooltip_data } = PACKAGE_CONSTANTS || {};

	const columnArray = [
		{
			Header   : 'CHAPTER NAME',
			accessor : (item) => <div>{startCase(item?.chapter_name) || '-'}</div>,
		},
		{
			Header   : 'CHAPTER LEADER',
			accessor : (item) => (
				<div>{startCase(item?.chapter_leader?.name) || '-'}</div>
			),
		},
		{
			Header   : 'SUB CHAPTERS',
			accessor : (item) => (
				<RenderSubChapters item={item} tooltip_data={tooltip_data} />
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
