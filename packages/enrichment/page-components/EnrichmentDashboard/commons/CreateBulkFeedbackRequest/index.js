import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import FeedbackRequestModal from './FeedbackRequestModal';
import styles from './styles.module.css';

function CreateBulkFeedbackRequest({ refetch = () => {}, refetchStats = () => {} }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<Button
				size="lg"
				type="button"
				themeType="primary"
				className={styles.button}
				onClick={() => setShowModal(true)}
			>
				Assign Accounts
			</Button>

			{showModal && (
				<Modal
					show={showModal}
					size="md"
					closeOnOuterClick={false}
					onClose={() => setShowModal(false)}
					placement="top"
				>
					<FeedbackRequestModal
						refetch={refetch}
						refetchStats={refetchStats}
						setShowModal={setShowModal}
					/>
				</Modal>
			)}
		</div>

	);
}

export default CreateBulkFeedbackRequest;
