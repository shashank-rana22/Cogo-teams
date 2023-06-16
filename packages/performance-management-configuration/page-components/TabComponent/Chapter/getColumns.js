import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const TOOLTIP_START_VALUE = 3;

const MIN_SUB_CHAPTERS_LENGTH = 3;

const SUB_CHAPTER_INDEX_START = 0;

const SUB_CHAPTER_INDEX_END = 3;

function TooltipContent({ item = [] }) {
	return (
		<div>
			{item.map((tag, i) => {
				if (i >= TOOLTIP_START_VALUE) {
					return <Pill key={tag?.name}>{startCase(tag?.sub_chapter_name)}</Pill>;
				}

				return null;
			})}
		</div>
	);
}

const getColumns = ({ setShowDeleteModal, setShowUpdateChapterModal }) => (
	[
		{
			Header   : 'CHAPTER NAME',
			accessor : (item) => (
				<div>{startCase(item?.chapter_name) || '-'}</div>
			),
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
					{item?.sub_chapters?.slice(SUB_CHAPTER_INDEX_START, SUB_CHAPTER_INDEX_END).map((singlesub) => (
						<Pill
							key={singlesub?.name}
							size="md"
							className={styles.pill}
						>
							{startCase(singlesub?.sub_chapter_name)}
						</Pill>
					))}

					{item?.sub_chapters?.length > MIN_SUB_CHAPTERS_LENGTH ? (
						<Tooltip
							content={<TooltipContent item={item?.sub_chapters} />}
							placement="right"
							theme="light"
							styles={{ marginBottom: '24px' }}
						>
							<Pill>
								+
								{item.sub_chapters.length - SUB_CHAPTER_INDEX_END}
								{' '}
								SUB_CHAPTERS
							</Pill>
						</Tooltip>
					)
						: null}
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
				<div
					className={styles.status}
					style={{ background: item?.status === 'inactive' ? '#f8aea8' : '' }}
				>
					{startCase(item?.status) || '-'}
				</div>
			),
		},
		{
			Header   : 'ACTION',
			accessor : (item) => (
				<div>
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
						onClick={() => setShowUpdateChapterModal(item)}
					/>
				</div>
			),
		},
	]
);

export default getColumns;
