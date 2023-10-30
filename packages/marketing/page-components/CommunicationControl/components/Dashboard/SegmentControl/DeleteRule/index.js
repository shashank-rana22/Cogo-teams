import { Modal, Button } from '@cogoport/components';

import useUpdateSegment from '../../../../hooks/useUpdateSegment';

import styles from './styles.module.css';

function DeleteRule(
	{ itemData = {}, showDeleteModal = false, setShowDeleteModal = () => {}, getSegmentData = () => {} },
) {
	const { updateSegment = () => {}, updateLoading = '' } = useUpdateSegment({ getSegmentData });
	return (
		<div>
			{showDeleteModal ? (
				<Modal
					show={showDeleteModal}
					onClose={() => { setShowDeleteModal(false); }}
					onOuterClick={() => { setShowDeleteModal(false); }}
					placement="top"
				>
					<Modal.Header title="Deactivate Rule" />
					<Modal.Body>
						Are you sure you want to deactivate this Rule?
					</Modal.Body>
					<Modal.Footer className={styles.modal_footer}>
						<Button
							themeType="secondary"
							onClick={() => { setShowDeleteModal(false); }}
						>
							NO
						</Button>
						<Button
							onClick={() => {
								updateSegment({ id: itemData?.id, status: 'deactive' });
							}}
							disabled={updateLoading}
						>
							YES
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}
export default DeleteRule;
