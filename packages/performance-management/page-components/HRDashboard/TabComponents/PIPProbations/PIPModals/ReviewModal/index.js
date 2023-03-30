import { Button, Modal, Textarea } from '@cogoport/components';

import styles from './styles.module.css';

function ReviewModal({
	item = {},
	modal,
	setModal = () => {},
	setItem = () => {},
	onSubmit = () => {},
}) {
	return (

		<Modal
			show={modal === 'review'}
			onClose={() => {
				setModal('');
				setItem({});
			}}
			size="lg"
		>
			<Modal.Header title="Review" />
			<div className={styles.upload_modal}>
				<Modal.Body>
					<div className={styles.modal_container}>
						<div style={{ display: 'flex' }}>
							<div className={styles.label}>
								{item?.name}

							</div>
							<div className={styles.label}>
								{item?.designation}

							</div>
							<div className={styles.label}>
								{` - ${item?.cogo_id}`}
							</div>
						</div>
						<div style={{ display: 'flex' }}>
							<div className={styles.sub_container}>
								<div className={styles.sub_heading}>Reports To</div>
								<div>{item?.manager_name}</div>
							</div>
							<div className={styles.sub_container}>
								<div className={styles.sub_heading}>Latest KPI</div>
								<div>{item?.rating}</div>
							</div>
							<div className={styles.sub_container}>
								<div className={styles.sub_heading}>Update</div>
								<div>{item?.update}</div>
							</div>
						</div>
						<div className={styles.sub_container}>
							<div className={styles.label}>Add Remarks</div>
							<Textarea placeholder="Type here..." style={{ height: '100px' }} />
						</div>
					</div>
				</Modal.Body>
			</div>
			<Modal.Footer>
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => setModal('')}
				>
					Cancel

				</Button>

				<Button
					size="md"
					type="submit"
					onClick={onSubmit}
				>
					Mark as Reviewed

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ReviewModal;
