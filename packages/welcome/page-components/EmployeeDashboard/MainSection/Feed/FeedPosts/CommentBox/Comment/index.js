/* eslint-disable import/no-cycle */
import { Avatar } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import CommentList from '../CommentList';

import CommentForm from './CommentForm';
import styles from './styles.module.css';

function Comment({ user_name, comment, nested_comments, time_ago }) {
	const [showNestedComments, setShowNestedComments] = useState(false);
	const [showReplyComment, setShowReplyComment] = useState(false);

	const handleCommentonChange = (text) => {
		console.log('text', text);
	};

	return (
		<div style={{ marginTop: 16, marginBottom: 16 }}>
			<div className={styles.comment_container}>
				<Avatar size="38px" personName="Jhon" />
				<div className={styles.comment_data}>
					<div className={styles.name}>
						{user_name}
					</div>
					<div className={styles.comment_text}>
						{comment}
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				<div className={styles.like_comment_container}>
					{!isEmpty(nested_comments) && (
						<div className={styles.icon_container}>
							{showNestedComments
								? (
									<IcMArrowRotateUp
										onClick={() => setShowNestedComments(false)}
										width={16}
										height={16}
										style={{ marginRight: 8, cursor: 'pointer' }}
									/>
								)
								: (
									<IcMArrowRotateDown
										onClick={() => setShowNestedComments(true)}
										width={16}
										height={16}
										style={{ marginRight: 8, cursor: 'pointer' }}
									/>
								)}
						</div>
					)}
					<div className={styles.like_comment}>
						Like
					</div>
					<div
						className={styles.like_comment}
						style={{ marginLeft: 8 }}
						onClick={() => setShowReplyComment(!showReplyComment)}
						aria-hidden
					>
						Comment
					</div>
				</div>
				<div className={styles.reply_data}>
					{!isEmpty(nested_comments) && (
						<div className={styles.reply_text} style={{ marginRight: 12 }}>
							{nested_comments.length}
							{' '}
							{nested_comments.length === 1 ? 'Reply' : 'Replies'}
						</div>
					)}
					<div className={styles.reply_text}>
						{time_ago}
					</div>
				</div>
			</div>
			{showReplyComment && <CommentForm handleSubmit={handleCommentonChange} />}
			{showNestedComments && !isEmpty(nested_comments) && (
				<div className={styles.child_comments}>
					<CommentList comments={nested_comments} />
				</div>
			)}
		</div>
	);
}

export default Comment;
