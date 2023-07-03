import { Tooltip } from '@cogoport/components';
import { IcCLike } from '@cogoport/icons-react';
import { useState } from 'react';

// import DislikeFeedback from './DislikeFeedback';
import DislikeModal from './DislikeModal';
import styles from './styles.module.css';
import updateLikeRate from './updateLikeRate';

function LikeDislike({ rateCardData, detail }) {
	const [showFeedbackModal, setShowFeedbackModal] = useState(false);

	const { is_liked = false, likes_count = 0, is_disliked = false } = rateCardData;

	const [likeState, setLikeState] = useState({
		is_liked,
		likes_count,
		is_disliked,
	});

	const { handleLikeRateCard } = updateLikeRate({
		rate: rateCardData, detail, setLikeState,
	});

	const onClickLike = () => {
		if (likeState.is_liked) {
			return;
		}
		handleLikeRateCard();
	};

	const onClickDislike = () => {
		if (likeState.is_disliked) {
			return;
		}
		setShowFeedbackModal(true);
	};

	return (
		<div className={styles.mainContainer}>
			<Tooltip
				placement="top"
				theme="light"
				content={likeState.is_liked ? 'Liked' : 'Like'}
			>
				<div
					role="presentation"
					className={`${styles.container} ${likeState.is_liked ? styles.active : ''}`}
					onClick={onClickLike}
				>
					<div className={styles.count}>{likeState.likes_count}</div>
					<IcCLike width="20px" height="16px" />
				</div>
			</Tooltip>

			<Tooltip
				placement="top"
				theme="light"
				content={likeState.is_disliked ? 'Disliked' : 'Dislike'}
			>
				<div
					role="presentation"
					className={`${styles.container} ${styles.dislike} ${
						likeState.is_disliked ? styles.active : ''
					}`}
					onClick={onClickDislike}
				>
					<IcCLike width="20px" height="16px" />
				</div>
			</Tooltip>

			{showFeedbackModal ? (
				<DislikeModal
					details={detail}
					rate={rateCardData}
					show={showFeedbackModal}
					onClose={() => {
						setShowFeedbackModal(false);
					}}
					setLikeState={setLikeState}
				/>
			) : null}
		</div>
	);
}

export default LikeDislike;
