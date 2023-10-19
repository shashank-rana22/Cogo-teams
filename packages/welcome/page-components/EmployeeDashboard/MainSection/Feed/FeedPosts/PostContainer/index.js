/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { cl, Tooltip } from '@cogoport/components';
import { IcMProvision, IcMOverflowDot, IcMLike, IcMLiveChat } from '@cogoport/icons-react';
// import Lottie from 'lottie-react';
import React, { useState } from 'react';

import CommentBox from '../CommentBox';

// import clapAnimation from './clap-animation.json';
// import dislikeAnimation from './dislike-animation.json';
// import funnyAnimation from './funny-animation.json';
// import heartAnimation from './heart-animation.json';
// import likeAnimation from './like-animation.json';
import styles from './styles.module.css';

// const animationArr = [
// 	{
// 		width     : 60,
// 		height    : 60,
// 		animation : heartAnimation,
// 	},
// 	{
// 		width     : 50,
// 		height    : 50,
// 		animation : likeAnimation,
// 	},
// 	{
// 		width     : 50,
// 		height    : 50,
// 		animation : clapAnimation,
// 	},
// 	{
// 		width     : 35,
// 		height    : 35,
// 		animation : funnyAnimation,
// 	},
// 	// {
// 	// 	width     : 30,
// 	// 	height    : 30,
// 	// 	animation : dislikeAnimation,
// 	// },
// ];

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
			{/* <div style={{ display: 'flex', alignItems: 'center' }}>
				{animationArr.map((val, index) => (
					<div
						key={index + 1}
						style={{
							width      : val.width,
							height     : val.height,
							display    : 'flex',
							alignItems : 'center',
						}}
					>
						<Lottie
							animationData={val.animation}
							loop
							autoplay
						/>
					</div>
				))}
			</div> */}
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

				{/* <Lottie
					animationData={animationData}
					loop
					autoplay
				/> */}

				<div className={styles.like_and_comment}>
					<div className={styles.like_circle}>
						<Tooltip
							content="hello"
							interactive
							placement="top"
						>
							<IcMLike style={{ cursor: 'pointer' }} />
						</Tooltip>
					</div>
					<div className={styles.comment_input} onClick={() => setOpenComments(!openComments)}>
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
