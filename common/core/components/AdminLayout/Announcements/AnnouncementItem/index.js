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

	return (
		<div
			role="presentation"
			className={`${styles.container} ${isSelected && styles.isSelected}`}
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

					{video_count > 0 ? (
						<div className={styles.pill}>
							{`${video_count} ${
								video_count === 1 ? 'Video' : 'Videos'
							}`}
						</div>
					) : null}

					{image_count > 0 ? (
						<div className={styles.pill}>
							{`${image_count} ${
								image_count === 1 ? 'Image' : 'Images'
							}`}
						</div>
					) : null}

					{pdf_count > 0 ? (
						<div className={styles.pill}>
							{`${pdf_count} ${
								pdf_count === 1 ? 'Document' : 'Documents'
							}`}
						</div>
					) : null}
				</div>

				<div className={styles.date_tag}>{format(validity_start, 'dd MMM yyyy hh:mm a')}</div>
			</div>
		</div>
	);
}

export default AnnouncementItem;
