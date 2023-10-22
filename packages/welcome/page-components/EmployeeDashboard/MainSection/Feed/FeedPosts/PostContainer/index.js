/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcMProvision, IcMOverflowDot, IcCLike, IcCHeart,
	IcCLaugh, IcCClap,
} from '@cogoport/icons-react';
// import Lottie from 'lottie-react';
import React, { useState } from 'react';

// import CommentBox from '../CommentBox';

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

// const comments = [
// 	{
// 		name: 'AB',
// 	},
// 	{
// 		name: 'YZ',
// 	},
// 	{
// 		name: 'BC',
// 	},
// 	{
// 		name: 'SX',
// 	},
// ];

const icons = [
	{
		icon   : IcCLike,
		width  : 25,
		height : 25,
		fill   : '#318CE7',
	},
	{
		icon   : IcCHeart,
		width  : 25,
		height : 25,
	},
	{
		icon   : IcCLaugh,
		width  : 30,
		height : 30,
	},
	{
		icon   : IcCClap,
		width  : 30,
		height : 30,
	},
];

function PopoverContent({ handleIconSelect = () => {} }) {
	return (
		<div className={styles.popover_content}>
			{(icons || []).map((option, index) => {
				const Icon = option.icon;

				return (
					<div
						key={index}
						className={styles.popover_item}
						onClick={() => { console.log('hi'); handleIconSelect(Icon); }}
					>
						<Icon width={option.width} height={option.height} fill={option.fill} />
					</div>
				);
			})}
		</div>
	);
}
const makeShortName = (name) => {
	const words = name.split(' ');
	let shortName = '';
	words.forEach((word) => {
		shortName += word.slice(0, 1);
	});
	return shortName;
};

function PostContainer({ item = {} }) {
	// const [openComments, setOpenComments] = useState(false);
	const [selectedIcon, setSelectedIcon] = useState(IcCLike);

	const handleIconSelect = (newIcon) => {
		setSelectedIcon(newIcon);
	};

	return (
		<>
			{/* {(list || []).map((item) => ( */}
			<div key={item.id} className={styles.container}>
				<div className={styles.header_flex}>
					<div className={styles.user_data}>
						<div className={styles.name_avatar}>
							{makeShortName(item.name || '-')}
						</div>
						<div className={styles.user_name}>
							{item.name || '-'}
							<div className={styles.designation}>
								{item.designation || '-'}
							</div>
						</div>
					</div>
					<div className={styles.post_time_flex}>
						<div className={styles.post_time}>
							<IcMProvision fill="#BCB0F5" style={{ marginRight: 4 }} />
							{item.created_at ? formatDate({
								date       : item.created_at,
								dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
								formatType : 'dateTime',
								separator  : ' ',
							}) : '-'}
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
						Appreciating efforts of @Hritik for his amazing work on the HRMS platform
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
					<div className={styles.like_and_comment}>
						<div className={styles.like_circle}>
							<Tooltip
								content={<PopoverContent handleIconSelect={handleIconSelect} />}
								interactive
								caret={false}
								placement="top"
							>
								{selectedIcon}
							</Tooltip>
						</div>
						{/* <div className={styles.comment_input} onClick={() => setOpenComments(!openComments)}>
							<div className={styles.label_flex}>
								<IcMLiveChat style={{ marginRight: 8 }} />
								{' '}
								Comment
							</div>
						</div> */}
					</div>

					<div className={styles.likes_n_comment}>
						<div className={styles.comments_data}>
							<div className={styles.user_comments}>
								{icons.map((option, index) => {
									const Icon = option.icon;
									return (
										<div className={styles.comments_circle} key={index}>
											<Icon width={25} height={25} />
										</div>
									);
								})}
							</div>
							{item.no_of_reactions || '0'}
							{' '}
							Likes
						</div>

						{/* <div className={styles.comments_data} style={{ marginLeft: '8px' }}>
							<div className={styles.user_comments}>
								{(item.commenter_names || []).map((name) => (
									<div className={styles.comments_circle} key={name}>
										{makeShortName(name || '-')}
									</div>
								))}
							</div>
							{item.no_of_comments || '0'}
							{' '}
							Comments
						</div> */}
					</div>

					{/* <Lottie
					animationData={animationData}
					loop
					autoplay
				/> */}

				</div>
				{/* { openComments && <CommentBox /> } */}
			</div>
			{/* ))} */}
		</>
	);
}

export default PostContainer;
