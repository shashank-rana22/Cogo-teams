/* eslint-disable jsx-a11y/no-static-element-interactions */
import { cl, Button } from '@cogoport/components';
import { IcMProvision, IcMOverflowDot, IcMLike, IcMLiveChat, IcMSend } from '@cogoport/icons-react';
import React, { useState } from 'react';

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

function FeedPosts() {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleFocus = () => {
		setIsExpanded(!isExpanded);
	};

	const handleBlur = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<>
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
						<div className={styles.comment_input}>
							<input
								className={cl`${styles.search} ${styles.expandright}`}
								id="searchright"
								type="search"
								name="q"
								placeholder="Comment"
								onFocus={handleFocus}
								onBlur={handleBlur}
							/>
							<label
								className={cl`${styles.btn} ${styles.searchbutton}`}
								htmlFor="searchright"
							>
								<div className={styles.label_flex}>
									<IcMLiveChat style={{ marginRight: 8 }} />
									{' '}
									Comment
								</div>
							</label>
						</div>
						{isExpanded && (
							<Button>
								<IcMSend style={{ marginRight: 8 }} />
								{' '}
								Submit
							</Button>
						)}
					</div>
				</div>
			</div>
			{/* <div className={styles.container}>
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
						<div className={styles.comment_input}>
							<input
								className={cl`${styles.search} ${styles.expandright}`}
								id="searchright"
								type="search"
								name="q"
								placeholder="Comment"
								onFocus={handleFocus}
								onBlur={handleBlur}
							/>
							<label
								className={cl`${styles.btn} ${styles.searchbutton}`}
								htmlFor="searchright"
							>
								<div className={styles.label_flex}>
									<IcMLiveChat style={{ marginRight: 8 }} />
									{' '}
									Comment
								</div>
							</label>
						</div>
						{isExpanded && (
							<Button>
								<IcMSend style={{ marginRight: 8 }} />
								{' '}
								Submit
							</Button>
						)}
					</div>
				</div>
			</div> */}
		</>
	);
}

export default FeedPosts;
