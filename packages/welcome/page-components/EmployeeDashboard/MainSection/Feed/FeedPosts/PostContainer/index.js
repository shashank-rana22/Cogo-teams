/* eslint-disable no-useless-escape */
import { cl, Tooltip, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMProvision, IcMOverflowDot, IcCLike, IcCHeart,
	IcCLaugh, IcCClap, IcMAppLike, IcMDelete, IcMCalendar,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { formatDistanceToNow } from 'date-fns';
import React, { useState, useEffect } from 'react';

import makeShortName from '../../../../../../common/MakeShortName';
import useCreateCompanyFeed from '../../../../../../hooks/useCreateCompanyFeed';
import useCreateEmployeeReaction from '../../../../../../hooks/useCreateEmployeeReaction';

import styles from './styles.module.css';

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
			{(icons || []).map((option) => {
				const iconName = option.name;
				const Icon = option.icon;

				return (
					<div
						key={option.icon}
						className={styles.popover_item}
						onClick={() => handleIconSelect(iconName)}
						aria-hidden
					>
						<Icon width={option.width} height={option.height} fill={option.fill} />
					</div>
				);
			})}
		</div>
	);
}
function PostContainer({ item = {}, bypass, feedRefetch }) {
	const [reactionData, setReactionData] = useState({
		reaction_count : item.no_of_reactions || 0,
		reactions      : item.reactions || [],
	});

	const { createEmployeeReaction, data:reactionsObject } = useCreateEmployeeReaction();
	const { createCompanyFeed } = useCreateCompanyFeed(feedRefetch, 'deleted');

	const [selectedIcon, setSelectedIcon] = useState('appLike');
	// const [taggedPeople, setTaggedPeople] = useState([]);

	useEffect(() => {
		if (reactionsObject) {
			setReactionData(reactionsObject);
		}
	}, [reactionsObject]);

	// useEffect(() => {
	// 	if (['appreciation', 'work_anniversary', 'birthday'].includes(item?.feed_type)) {
	// 		const initials = item?.tagged_employee_names?.map((name) => {
	// 			const words = name?.split(' ');
	// 			const firstInitial = words?.[0][0]?.toUpperCase();
	// 			const lastInitial = words?.[words.length - 1][GLOBAL_CONSTANTS.zeroth_index]?.toUpperCase();
	// 			return firstInitial + lastInitial;
	// 		});

	// 		const filteredArray = initials.filter(Boolean);

	// 		setTaggedPeople(filteredArray);
	// 	}
	// }, [item.feed_content, item?.feed_type, item?.tagged_employee_names]);

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
	};

	const getFeedData = (feedData) => {
		const output = feedData.replace(
			/\@\[(.*?)\]\([^)]+\)/g,
			(match, username) => `@${username.replace(/ /g, ' ')} `,
		);
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
		<div key={item.id} className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.user_data}>
					{
							item?.passport_size_photo_url
								? (
									<img
										className={styles.name_avatar}
										src={item?.passport_size_photo_url}
										alt="profile"
									/>
								)
								:						 (
									<div className={cl`${styles.circle} ${styles.circle2_bg}`}>
										{makeShortName(item?.name)}
									</div>
								)
						}
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
						{item?.created_at ? formatDistanceToNow(new Date(item?.created_at), {
							addSuffix: true,
						}) : null}
					</div>
					{bypass && (
						<Popover
							placement="bottom"
							render={(
								<div
									style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
									onClick={handleDelete}
									aria-hidden
								>
									<IcMDelete style={{ marginRight: '8px' }} />
									{' '}
									Delete
								</div>
							)}
						>
							<IcMOverflowDot style={{ cursor: 'pointer' }} fill="#4F4F4F" />
						</Popover>
					)}

				</div>
			</div>
			{item.feed_type !== 'normal' && (
				<div className={styles.main_post_data}>
					<div className={styles.feed_type}>
						<div className={cl`${styles.profile_circle} ${styles.circle1_bg}`}>
							{feedTypeMapping[item.feed_type]}
						</div>
						{item?.tagged_employee_info?.length > 0
							? item?.tagged_employee_info?.map((val) => (
								val.photo
									? (
										<img
											className={cl`${styles.profile_circle} ${styles.circle_profile}`}
											src={val?.photo}
											alt="profile"
											key={val?.name}
										/>
									)
									: (
										<div
											className={cl`${styles.profile_circle} 
										${styles.circle3_bg}`}
											key={val?.name}
										>
											{makeShortName(val?.name)}
										</div>
									)
							))
							: null}
					</div>
					<div className={styles.main_post_text}>
						{getFeedData(item.feed_content)}
					</div>
				</div>
			)}
			{item.feed_type === 'normal' && (
				<div className={styles.normal_post_text}>
					{item.feed_content}
				</div>
			)}

			{!isEmpty(item.attachment_urls) && (
				item?.attachment_urls?.[GLOBAL_CONSTANTS.zeroth_index]?.attachment_type === 'video' ? (
					<video controls width="100%" height="auto">
						<source
							src={item?.attachment_urls?.[GLOBAL_CONSTANTS.zeroth_index]?.attachment_url}
							type="video/mp4"
						/>
						Your browser does not support the video tag.
					</video>
				) : (
					<img
						src={item?.attachment_urls?.[GLOBAL_CONSTANTS.zeroth_index]?.attachment_url}
						alt="img"
						style={{ maxWidth: '100%' }}
					/>
				)
			)}

			<div className={styles.footer}>
				<div className={styles.like_and_comment}>
					<div className={styles.like_circle}>
						<Tooltip
							content={<PopoverContent handleIconSelect={handleIconSelect} />}
							interactive
							caret={false}
							placement="top"
						>
							<div style={{ display: 'flex' }} onClick={handleRemoveIcon} aria-hidden>
								{iconMapping[selectedIcon]}
							</div>
						</Tooltip>
					</div>
				</div>

				{reactionData?.reaction_count > 0 && (
					<div className={styles.likes_n_comment}>
						<div className={styles.comments_data}>
							<div className={styles.user_comments}>
								{(reactionData?.reactions || []).map((option) => {
									const Icon = iconMapping[option];
									return (
										<div className={styles.comments_circle} key={option.reactions}>
											{Icon}
										</div>
									);
								})}
							</div>
							{reactionData?.reaction_count || '0'}
							{' '}
							{reactionData?.reaction_count > 1 ? 'Likes' : 'Like'}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default PostContainer;
