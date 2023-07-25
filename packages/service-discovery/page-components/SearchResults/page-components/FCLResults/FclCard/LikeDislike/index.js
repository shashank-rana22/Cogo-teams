import { Button } from '@cogoport/components';
import { IcCLike } from '@cogoport/icons-react';
import { useState } from 'react';

import useLikeFeedback from '../../../../hooks/useLikeFeedback';

import DislikeModal from './DislikeModal';
import styles from './styles.module.css';

const LIKE_DISLIKE_ALLOWED = [
	'fcl_freight',
	'air_freight',
	'ftl_freight',
	'ltl_freight',
	'lcl_freight',
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'haulage_freight',
	'trailer_freight',
];

function LikeDislike({ rateCardData = {}, detail = {} }) {
	const [showFeedbackModal, setShowFeedbackModal] = useState(false);

	const { service_type = '' } = detail;

	const { is_liked = false, likes_count = 0, is_disliked = false } = rateCardData;

	const [likeState, setLikeState] = useState({ is_liked, likes_count, is_disliked });

	const { handleLikeRateCard, loading } = useLikeFeedback({
		setLikeState,
		detail,
		rate: rateCardData,
		likeState,
	});

	if (!LIKE_DISLIKE_ALLOWED.includes(service_type)) {
		return null;
	}

	const handleLikeAction = () => {
		if (likeState.is_liked) { return; }
		handleLikeRateCard();
	};

	const handleDislikeAction = () => {
		if (likeState.is_disliked) { return; }
		setShowFeedbackModal(true);
	};

	const onCloseFeedbackModal = () => { setShowFeedbackModal(false); };

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
					className={`${styles.like} ${likeState.is_liked ? styles.active : ''}`}
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
					className={`${styles.dislike} ${likeState.is_disliked ? styles.active : ''}`}
				/>
			</Button>

			{showFeedbackModal ? (
				<DislikeModal
					details={detail}
					rate={rateCardData}
					show={showFeedbackModal}
					likeState={likeState}
					setLikeState={setLikeState}
					onClose={onCloseFeedbackModal}
				/>
			) : null}
		</div>
	);
}

export default LikeDislike;
