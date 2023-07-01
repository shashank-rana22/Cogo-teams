import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import TooltipContent from '../../commons/tooltipContent';

import styles from './styles.module.css';

const MIN_SUB_CHAPTERS_LENGTH = 3;
const SUB_CHAPTER_INDEX_START = 0;
const SUB_CHAPTER_INDEX_END = 3;
const STATUS_TYPE_ACTIVE = 'active';

const getColumns = ({ setShowDeleteModal, setShowCreateModal, activeTab }) => {
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
				<div className={styles.pill_box}>
					{item?.sub_chapters
						?.slice(SUB_CHAPTER_INDEX_START, SUB_CHAPTER_INDEX_END)
						.map((singlesub) => (
							<Pill key={singlesub?.name} size="md" className={styles.pill}>
								{startCase(singlesub?.sub_chapter_name)}
							</Pill>
						))}

					{item?.sub_chapters?.length > MIN_SUB_CHAPTERS_LENGTH ? (
						<Pill>
							<Tooltip
								content={<TooltipContent item={item?.sub_chapters} />}
								placement="right"
								theme="light"
								caret
								interactive
								styles={{ marginBottom: '24px' }}
							>
								+
								{item.sub_chapters.length - SUB_CHAPTER_INDEX_END}
								{' '}
								SUB_CHAPTERS
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

	];

	if (activeTab === STATUS_TYPE_ACTIVE) {
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
