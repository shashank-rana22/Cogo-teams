/* eslint-disable jsx-a11y/no-static-element-interactions */
import { cl } from '@cogoport/components';
import { IcMProvision, IcMOverflowDot, IcMLike, IcMLiveChat } from '@cogoport/icons-react';
import React, { useState } from 'react';

import CommentBox from '../CommentBox';

import styles from './styles.module.css';

const comments = [
	{
		name: 'AB',
	},
	{
		name: 'YZ',
	},
	{
		name: 'BC',
	},
	{
		name: 'SX',
	},
];

function PostContainer() {
	const [openComments, setOpenComments] = useState(false);
	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.user_data}>
					<div className={styles.name_avatar}>
						YG
					</div>
					<div className={styles.user_name}>
						Yash Gehlot
						<div className={styles.designation}>
							Sr Product Designer
						</div>
					</div>
				</div>
				<div className={styles.post_time_flex}>
					<div className={styles.post_time}>
						<IcMProvision fill="#BCB0F5" style={{ marginRight: 4 }} />
						1h
					</div>
					<IcMOverflowDot fill="#4F4F4F" />
				</div>
			</div>
			<div className={styles.main_post_data}>
				<div className={styles.feed_type}>
					<div className={cl`${styles.circle} ${styles.circle1_bg}`}>
						👏
					</div>
					<div className={cl`${styles.circle} ${styles.circle2_bg}`}>
						RD
					</div>
				</div>
				<div className={styles.main_post_text}>
					Appreciating efforts of @raghuvamsi for his amazing work on the HRMS flatform
				</div>
			</div>
			<div className={styles.footer}>
				<div className={styles.comments_data}>
					<div className={styles.user_comments}>
						{comments.map((val) => (
							<div className={styles.comments_circle} key={val.name}>
								{val.name}
							</div>
						))}
					</div>
					23 Comments
				</div>
				<div className={styles.like_and_comment}>
					<div className={styles.like_circle}>
						<IcMLike />
					</div>
					<div className={styles.comment_input} onClick={() => setOpenComments(true)}>
						<div className={styles.label_flex}>
							<IcMLiveChat style={{ marginRight: 8 }} />
							{' '}
							Comment
						</div>
					</div>
				</div>
			</div>
			{ openComments && <CommentBox /> }
		</div>
	);
}

export default PostContainer;
