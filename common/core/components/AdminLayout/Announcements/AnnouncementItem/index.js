import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRight } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import ANNOUNCEMENT_TYPE_MAPPING from '../constants/ANNOUNCEMENT_TYPE_MAPPING.json';

import styles from './styles.module.css';

function AnnouncementItem({
	data = {},
	setAnnouncementModalData = () => {},
	isSelected = false,
}) {
	const {
		title,
		is_viewed,
		announcement_type = '',
		attachment_count = {},
		validity_start = '',
	} = data;

	const { image_count = 0, video_count = 0, pdf_count = 0 } = attachment_count;

	const handleViewMore = () => {
		setAnnouncementModalData(data);
	};

	const COUNT_PILL_MAPPING = {
		video: {
			count : video_count,
			text  : 'Video',
		},
		image: {
			count : image_count,
			text  : 'Image',
		},
		pdf: {
			count : pdf_count,
			text  : 'Document',
		},
	};

	function RenderCountPill({ type }) {
		const { count, text } = COUNT_PILL_MAPPING[type];

		if (count === 0) return null;

		return (
			<div className={styles.pill}>
				{count}
				{' '}
				{count === 1 ? text : `${text}s`}
			</div>
		);
	}

	return (
		<div
			role="presentation"
			className={`${styles.container} ${isSelected && styles.is_selected}`}
			onClick={handleViewMore}
		>
			<div className={styles.header}>
				<div className={styles.title_container}>
					<div className={styles.title}>{title}</div>
					{is_viewed ? null : <div className={styles.red_dot} />}
				</div>

				<IcMArrowRight
					height="16px"
					width="16px"
					style={{ color: '#ea3925' }}
				/>
			</div>

			<div className={styles.tags_container}>
				<div className={styles.all_other_tags}>
					<div className={`${styles.pill}`} style={{ fontWeight: 600 }}>
						{ANNOUNCEMENT_TYPE_MAPPING[announcement_type]}
					</div>

					{Object.keys(COUNT_PILL_MAPPING).map((key) => (
						<RenderCountPill key={key} type={key} />
					))}
				</div>

				<div className={styles.date_tag}>
					{format(validity_start, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}
				</div>
			</div>
		</div>
	);
}

export default AnnouncementItem;
