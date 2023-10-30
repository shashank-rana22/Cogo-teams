import { Avatar } from '@cogoport/components';
import { IcMSend } from '@cogoport/icons-react';
import React, { useState } from 'react';

import CommentList from './CommentList';
import styles from './styles.module.css';

function CommentBox() {
	const [text, setText] = useState('');
	const [textareaHeight, setTextareaHeight] = useState('32px'); // Initial height is 32px

	const handleChange = (e) => {
		const { scrollHeight } = e.target;
		setText(e.target.value);

		// Calculate the new height with minimum and maximum constraints
		const newHeight = Math.min(100, Math.max(32, scrollHeight));
		setTextareaHeight(`${newHeight}px`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.add_comment}>
				<Avatar size="38px" personName="Jhon" />
				<div className={styles.post_comment_container}>
					<textarea
						className={styles.text_area}
						size="sm"
						value={text}
						onChange={handleChange}
						style={{ height: textareaHeight }}
					/>
					<div className={styles.submit_comment_container}>
						Post Comment
						{' '}
						<IcMSend style={{ marginLeft: 4 }} />
					</div>
				</div>
			</div>
			<CommentList comments={[]} />
		</div>
	);
}

export default CommentBox;
