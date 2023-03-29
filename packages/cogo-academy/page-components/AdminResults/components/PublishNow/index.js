import { Modal, Button } from '@cogoport/components';

import usePublishNow from '../../hooks/usePublishNow';

import styles from './styles.module.css';

function PublishNow({ test_id, refetchTest }) {
	const { showPublishModal, setShowPublishModal, loading, publishResults } = usePublishNow({ test_id, refetchTest });

	return (
		<>
			<Button type="button" onClick={() => setShowPublishModal(true)}>Publish Results</Button>

			{showPublishModal && (
				<Modal size="sm" show={showPublishModal} onClose={setShowPublishModal}>
					<Modal.Body>
						<b className={styles.heading}>Are you sure you want to End test and Publish results now?</b>

						<p> Doing this will lead to some students missing on giving the test.</p>

						<div className={styles.button_container}>
							<Button
								type="button"
								onClick={publishResults}
								style={{ marginRight: 12 }}
								themeType="secondary"
								loading={loading}
							>
								Yes, Publish Now
							</Button>

							<Button
								type="button"
								loading={loading}
								themeType="accent"
								onClick={() => setShowPublishModal(false)}
							>
								Cancel
							</Button>
						</div>
					</Modal.Body>
				</Modal>
			)}
		</>
	);
}

export default PublishNow;
