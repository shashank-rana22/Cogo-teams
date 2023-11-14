import { Button, cl } from '@cogoport/components';
import { IcCLike } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import NewDislikeModal from './NewDislikeModal';
import styles from './styles.module.css';

function LikeDislike({ rateCardData = {}, detail = {}, isMobile = false }) {
	const [showFeedbackModal, setShowFeedbackModal] = useState(false);

	const { is_liked = false, likes_count = 0, is_disliked = false, dislikes_count = 0 } = rateCardData || {};

	const [likeState, setLikeState] = useState({
		is_liked,
		likes_count    : is_liked ? likes_count + 1 : likes_count,
		is_disliked,
		dislikes_count : is_disliked ? dislikes_count + 1 : dislikes_count,
	});

	const handleDislikeAction = () => {
		if (likeState.is_disliked) {
			return;
		}
		setShowFeedbackModal(true);
	};

	const onCloseFeedbackModal = () => { setShowFeedbackModal(false); };

	useEffect(() => {
		setLikeState({
			is_liked,
			likes_count    : is_liked ? likes_count + 1 : likes_count,
			is_disliked,
			dislikes_count : is_disliked ? dislikes_count + 1 : dislikes_count,
		});
	}, [dislikes_count, is_disliked, is_liked, likes_count]);

	return (
		<div className={styles.container}>
			<div className={styles.button_container}>
				<IcCLike
					width="20px"
					height="16px"
					className={cl`${styles.dislike} ${likeState.is_disliked ? styles.active : ''}`}
				/>

				<Button
					onClick={handleDislikeAction}
					themeType="link"
					size="md"
				>
					Rate Card Not Satisfactory
				</Button>
			</div>

			{showFeedbackModal ? (
				<NewDislikeModal
					show={showFeedbackModal}
					rate={rateCardData}
					details={detail}
					likeState={likeState}
					setLikeState={setLikeState}
					onClose={onCloseFeedbackModal}
					isMobile={isMobile}
				/>
			) : null}
		</div>
	);
}

export default LikeDislike;
