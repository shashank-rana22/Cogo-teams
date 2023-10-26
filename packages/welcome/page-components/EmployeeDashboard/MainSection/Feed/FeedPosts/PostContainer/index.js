/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable custom-eslint/zeroth-index-import */
/* eslint-disable max-lines-per-function */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-useless-escape */
/* eslint-disable custom-eslint/regex-check */
/* eslint-disable custom-eslint/variables-name-check */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { cl, Tooltip, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMProvision, IcMOverflowDot, IcCLike, IcCHeart,
	IcCLaugh, IcCClap, IcMAppLike, IcMDelete, IcMCalendar,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { formatDistanceToNow } from 'date-fns';
// import Lottie from 'lottie-react';
import React, { useState, useEffect } from 'react';

import useCreateCompanyFeed from '../../../../../../hooks/useCreateCompanyFeed';
import useCreateEmployeeReaction from '../../../../../../hooks/useCreateEmployeeReaction';

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
		name   : 'like',
	},
	{
		icon   : IcCHeart,
		width  : 25,
		height : 25,
		name   : 'heart',
	},
	{
		icon   : IcCLaugh,
		width  : 30,
		height : 30,
		name   : 'laugh',
	},
	{
		icon   : IcCClap,
		width  : 30,
		height : 30,
		name   : 'clap',
	},
];

const iconMapping = {
	like    : <IcCLike fill="#318CE7" width={18} height={18} />,
	heart   : <IcCHeart width={18} height={18} />,
	laugh   : <IcCLaugh width={18} height={18} />,
	clap    : <IcCClap width={18} height={18} />,
	appLike : <IcMAppLike width={18} height={18} />,
};

const feedTypeMapping = {
	appreciation     : '👏',
	work_anniversary : <IcMCalendar fill="#fc0101" width={30} height={30} />,
	birthday         : <img src={GLOBAL_CONSTANTS.image_url.cake} width={40} height={40} alt="cake" />,
};

function PopoverContent({ handleIconSelect = () => {} }) {
	return (
		<div className={styles.popover_content}>
			{(icons || []).map((option, index) => {
				const iconName = option.name;
				const Icon = option.icon;

				return (
					<div
						key={index}
						className={styles.popover_item}
						onClick={() => { console.log('hi'); handleIconSelect(iconName); }}
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

function PostContainer({ item = {}, bypass, feedRefetch }) {
	// const [openComments, setOpenComments] = useState(false);
	const [reactionData, setReactionData] = useState({
		reaction_count : item.no_of_reactions || 0,
		reactions      : item.reactions || [],
	});

	console.log(item.reactions, feedRefetch, bypass, 'systemItem');

	const { createEmployeeReaction, data:reactionsObject } = useCreateEmployeeReaction();
	const { createCompanyFeed } = useCreateCompanyFeed(feedRefetch, 'deleted');

	const [selectedIcon, setSelectedIcon] = useState('appLike');
	const [taggedPeople, setTaggedPeople] = useState([]);
	console.log(reactionsObject, 'reactionsObject');

	useEffect(() => {
		if (reactionsObject) {
			setReactionData(reactionsObject);
		}
	}, [reactionsObject]);

	useEffect(() => {
		if (['appreciation', 'work_anniversary', 'birthday'].includes(item?.feed_type)) {
			// // Use regular expression to match the initials
			// const regex = /\[([^\]]+)\]/g;
			// const matches = item?.feed_content?.match(regex);

			// // Extract and format the initials to uppercase
			// const initials = matches?.map((match) => {
			// 	const name = match?.substring(1, match.indexOf(']'));
			// 	return name?.split(' ')?.map((word) => word[0].toUpperCase()).join('');
			// });

			// const resultArray = initials?.map((string) => (string.length > 2 ? string[0] + string.slice(-1) : string));

			// setTaggedPeople(resultArray);

			const initials = item?.tagged_employee_names?.map((name) => {
				const words = name?.split(' ');
				const firstInitial = words?.[0][0]?.toUpperCase();
				const lastInitial = words?.[words?.length - 1][0]?.toUpperCase();
				return firstInitial + lastInitial;
			});

			const filteredArray = initials.filter(Boolean);

			setTaggedPeople(filteredArray);
		}
	}, [item.feed_content, item?.feed_type, item?.tagged_employee_names]);

	useEffect(() => {
		if (Array.isArray(item?.my_reaction)) {
			const filteredArray = item?.my_reaction?.filter((val) => val !== null);
			setSelectedIcon(filteredArray?.length === 0 ? 'appLike' : filteredArray?.[0]);
		} else {
			setSelectedIcon(item?.my_reaction === null ? 'appLike' : item?.my_reaction);
		}
	}, [item?.my_reaction]);

	const handleIconSelect = async (newIcon) => {
		console.log('item', item);
		setSelectedIcon(newIcon);
		const payload = {
			item_id       : item.id,
			object_type   : 'feed',
			reaction_type : newIcon,
		};
		await createEmployeeReaction(payload);
	};

	const handleRemoveIcon = async () => {
		setSelectedIcon('appLike');
		const payload = {
			item_id       : item.id,
			object_type   : 'feed',
			reaction_type : '',
		};
		await createEmployeeReaction(payload);
		// const responseData = reactionsObject;
		// console.log('responseData', responseData);
		// setReactionData({
		// 	reaction_count : responseData?.reaction_count,
		// 	reactions      : responseData?.reactions,
		// });
	};

	const getFeedData = (feedData) => {
		const output = feedData.replace(/\@\[(.*?)\]\([^)]+\)/g, (match, username) => `@${username.replace(/ /g, ' ')} `);
		return output;
	};

	const handleDelete = () => {
		createCompanyFeed({
			PAYLOAD: {
				company_feed_id : item.id,
				action_name     : 'delete',
			},
		});
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
							{/* {item.created_at ? formatDate({
								date       : item.created_at,
								dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
								formatType : 'dateTime',
								separator  : ' ',
							}) : '-'} */}
							{item?.created_at ? formatDistanceToNow(new Date(item?.created_at), {
								addSuffix: true,
							}) : null}
						</div>
						{bypass && (
							<Popover
								placement="bottom"
								render={(
									<div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleDelete}>
										<IcMDelete style={{ marginRight: '8px' }} />
										{' '}
										Delete
									</div>
								)}
							>
								<IcMOverflowDot fill="#4F4F4F" />
							</Popover>
						)}

					</div>
				</div>
				{item.feed_type !== 'normal' && (
					<div className={styles.main_post_data}>
						<div className={styles.feed_type}>
							<div className={cl`${styles.circle} ${styles.circle1_bg}`}>
								{feedTypeMapping[item.feed_type]}
							</div>
							{taggedPeople?.length > 0
								? taggedPeople?.map((val) => (
									<div className={cl`${styles.circle} ${styles.circle2_bg}`} key={val}>
										{val}
									</div>
								))
								: null}
						</div>
						<div className={styles.main_post_text}>
							{getFeedData(item.feed_content)}
						</div>
					</div>
				)}
				{item.feed_type === 'normal' && (
					<>
						<div className={styles.normal_post_text}>
							{item.feed_content}
						</div>

					</>
				)}

				{!isEmpty(item.attachment_urls) ? (
					<>
						{item?.attachment_urls?.[0]?.attachment_type === 'video' ? (
							<video controls width="100%" height="auto">
								<source src={item?.attachment_urls?.[0]?.attachment_url} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						) : <img src={item?.attachment_urls?.[0]?.attachment_url} alt="img" style={{ maxWidth: '100%' }} />}
					</>
				) : null }

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
								<div style={{ display: 'flex' }} onClick={handleRemoveIcon}>
									{iconMapping[selectedIcon]}
								</div>
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
								{(reactionData?.reactions || []).map((option, index) => {
									const Icon = iconMapping[option];
									return (
										<div className={styles.comments_circle} key={index}>
											{Icon}
										</div>
									);
								})}
							</div>
							{reactionData?.reaction_count || '0'}
							{' '}
							{reactionData?.reaction_count > 1 ? 'Likes' : 'Like'}
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
