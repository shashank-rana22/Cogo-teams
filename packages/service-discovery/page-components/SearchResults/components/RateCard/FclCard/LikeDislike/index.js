import { Tooltip } from '@cogoport/components';
import { IcCLike } from '@cogoport/icons-react';
import { useState } from 'react';

// import DislikeFeedback from './DislikeFeedback';
import styles from './styles.module.css';
import updateLikeRate from './updateLikeRate';

function LikeDislike({ rateCardData, detail }) {
	const [show, setShow] = useState(false);

	const { handleLikeRateCard } = updateLikeRate({
		rateCardData, detail,
	});

	const onClickDislike = () => {
		setShow(!rateCardData.is_disliked);
	};

	return (
		<div className={styles.mainContainer}>
			<Tooltip
				placement="top"
				theme="light"
				content={rateCardData.is_liked ? 'Liked' : 'Like'}
			>
				<div
					role="presentation"
					className={`${styles.container} ${rateCardData.is_liked ? styles.active : ''}`}
					onClick={handleLikeRateCard}
				>
					<div className={styles.count}>{rateCardData.likes_count}</div>
					<IcCLike width="20px" height="16px" fill="#fff" />
				</div>
			</Tooltip>

			<Tooltip
				placement="top"
				theme="light"
				content={rateCardData.is_disliked ? 'Disliked' : 'Dislike'}
			>
				<div
					role="presentation"
					className={`${styles.container} ${styles.dislike} ${
						rateCardData.is_disliked ? styles.active : ''
					}`}
					onClick={onClickDislike}
				>
					<IcCLike width="20px" height="16px" fill="#fff" />
				</div>
			</Tooltip>

			{/* {show ? (
				<DislikeFeedback
					detail={detail}
					rate={rateCardData}
					show={show}
					onClose={() => {
						setShow(false);
					}}
				/>
			) : null} */}
		</div>
	);
}

export default LikeDislike;
