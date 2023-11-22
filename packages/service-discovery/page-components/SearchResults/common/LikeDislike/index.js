import { Button, cl } from '@cogoport/components';
import { IcCLike } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import NewDislikeModal from './NewDislikeModal';
import styles from './styles.module.css';

function LikeDislike({ rateCardData = {}, detail = {}, isMobile = false, refetchSearch = () => {} }) {
	const [showFeedbackModal, setShowFeedbackModal] = useState(false);

	const { is_disliked = false } = rateCardData || {};

	const [isDisliked, setIsDisliked] = useState(is_disliked);

	const onCloseFeedbackModal = () => setShowFeedbackModal(false);

	useEffect(() => {
		setIsDisliked(is_disliked);
	}, [is_disliked]);

	return (
		<div className={styles.container}>
			<div className={styles.button_container}>
				<IcCLike
					width="20px"
					height="16px"
					className={cl`${styles.dislike} ${isDisliked ? styles.active : ''}`}
				/>

				<Button
					onClick={() => setShowFeedbackModal(true)}
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
					onClose={onCloseFeedbackModal}
					isMobile={isMobile}
					refetchSearch={refetchSearch}
				/>
			) : null}
		</div>
	);
}

export default LikeDislike;
