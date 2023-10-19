import { Button, cl } from '@cogoport/components';
import { IcCLike } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import useLikeFeedback from '../../hooks/useLikeFeedback';

import DislikeModal from './DislikeModal';
import styles from './styles.module.css';

function LikeDislike({ rateCardData = {}, detail = {} }) {
	const [showFeedbackModal, setShowFeedbackModal] = useState(false);

	const [likeState, setLikeState] = useState({
		is_liked       : rateCardData?.is_liked,
		likes_count    : rateCardData?.likes_count,
		is_disliked    : rateCardData?.is_disliked,
		dislikes_count : rateCardData?.dislikes_count,
	});

	const { handleLikeRateCard = () => {}, loading } = useLikeFeedback({
		setLikeState,
		detail,
		rate: rateCardData,
		likeState,
	});

	const handleLikeAction = () => {
		if (likeState.is_liked) { return; }
		handleLikeRateCard();
	};

	const handleDislikeAction = () => {
		if (likeState.is_disliked) { return; }
		setShowFeedbackModal(true);
	};

	const onCloseFeedbackModal = () => { setShowFeedbackModal(false); };

	useEffect(() => {
		setLikeState({
			is_liked       : rateCardData?.is_liked,
			likes_count    : rateCardData?.likes_count,
			is_disliked    : rateCardData?.is_disliked,
			dislikes_count : rateCardData?.dislikes_count,
		});
	}, [rateCardData]);

	return (
		<div className={styles.container}>
			<Button
				size="sm"
				themeType="tertiary"
				onClick={handleLikeAction}
				disabled={loading}
			>
				<IcCLike
					width="20px"
					height="16px"
					className={cl`${styles.like} ${likeState.is_liked ? styles.active : ''}`}
				/>
				<span className={styles.count}>{likeState.likes_count}</span>
			</Button>

			<Button
				size="sm"
				themeType="tertiary"
				onClick={handleDislikeAction}
				disabled={loading}
			>
				<IcCLike
					width="20px"
					height="16px"
					className={cl`${styles.dislike} ${likeState.is_disliked ? styles.active : ''}`}
				/>
				<span className={styles.count}>{likeState.dislikes_count}</span>
			</Button>

			{showFeedbackModal ? (
				<DislikeModal
					show={showFeedbackModal}
					rate={rateCardData}
					details={detail}
					likeState={likeState}
					setLikeState={setLikeState}
					onClose={onCloseFeedbackModal}
				/>
			) : null}
		</div>
	);
}

export default LikeDislike;
