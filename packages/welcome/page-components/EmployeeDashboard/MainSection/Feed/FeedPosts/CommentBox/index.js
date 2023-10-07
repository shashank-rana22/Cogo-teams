/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
import { Avatar } from '@cogoport/components';
import { IcMSend } from '@cogoport/icons-react';
import React, { useState } from 'react';

import CommentList from './CommentList';
import styles from './styles.module.css';

const comments = [
	{
		user_name       : 'User1',
		comment         : 'I recently read a fascinating book about astrophysics that discussed the mind-bending concepts of black holes and the expansion of the universe. It was mind-blowing!',
		likes           : 25,
		nested_comments : [
			{
				user_name       : 'User2',
				comment         : "Wow, that sounds like an incredible book! I've always been interested in astrophysics. Can you share the title and author?",
				likes           : 15,
				nested_comments : [],
				time_ago        : '2 hours ago',
			},
			{
				user_name       : 'User3',
				comment         : "I've also read that book, and it completely changed my perspective on the universe. The way it explains complex concepts is commendable.",
				likes           : 20,
				nested_comments : [
					{
						user_name       : 'User4',
						comment         : "I'm a physics enthusiast as well, and this book sounds like a must-read. Can you recommend any other similar books?",
						likes           : 10,
						nested_comments : [],
						time_ago        : '1 hour ago',
					},
				],
				time_ago: '3 hours ago',
			},
		],
		time_ago: '4 hours ago',
	},
	{
		user_name       : 'User5',
		comment         : "I've been studying quantum mechanics lately, and it's mind-boggling how particles behave at the quantum level. The famous double-slit experiment is so intriguing!",
		likes           : 30,
		nested_comments : [
			{
				user_name       : 'User6',
				comment         : 'Absolutely, quantum mechanics is both fascinating and perplexing. Have you tried conducting any quantum experiments yourself?',
				likes           : 18,
				nested_comments : [],
				time_ago        : '2 hours ago',
			},
			{
				user_name       : 'User7',
				comment         : "I'm currently pursuing a PhD in quantum physics, and the more I learn, the more I'm amazed by the mysteries of the quantum world.",
				likes           : 25,
				nested_comments : [
					{
						user_name       : 'User8',
						comment         : "User7, that's impressive! Can you share some insights into your research?",
						likes           : 12,
						nested_comments : [],
						time_ago        : '1 hour ago',
					},
				],
				time_ago: '3 hours ago',
			},
		],
		time_ago: '4 hours ago',
	},
];

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
			<CommentList comments={comments} />
		</div>
	);
}

export default CommentBox;
