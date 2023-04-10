import { Textarea, Button, Modal } from '@cogoport/components';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase, addDays } from '@cogoport/utils';

import styles from './styles.module.css';

function ReviewModal({
	item = {},
	modal,
	setModal = () => {},
	setItem = () => {},
	onSubmit = () => {},
}) {
	const extended_date = addDays(new Date(item.end_date), 30);
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
						<div className={styles.container}>
							<div className={styles.update_dates}>
								<div className={styles.sub_heading}>Name</div>
								<div>{ startCase(item?.name || '---') }</div>
							</div>
							<div style={{ display: 'flex' }}>
								<div className={styles.update_dates}>
									<div className={styles.sub_heading}>Start Date</div>

									<div style={{ fontWeight: 'bold' }}>
										{item.start_date
											? formatDate({
												date       : item.start_date,
												formatType : 'date',
												dateFormat : 'dd MMM yyyy',
											}) : '---'}
									</div>
								</div>

								<div className={styles.update_dates}>
									<div className={styles.sub_heading}>End Date</div>

									<div style={{ fontWeight: 'bold' }}>
										{item.end_date
											? formatDate({
												date       : item.end_date,
												formatType : 'date',
												dateFormat : 'dd MMM yyyy',
											}) : '---'}

									</div>
								</div>

							</div>
						</div>
						<div className={styles.container}>
							<div className={styles.update_dates}>
								<div className={styles.sub_heading}>Reports To</div>
								<div>{startCase(item.manager_name || '---')}</div>
							</div>
							<div className={styles.update_dates}>
								<div className={styles.sub_heading}>Update</div>
								<div>{`${item.log_type || '---'} ${item.final_decision || '---'}`}</div>
							</div>
							{item.final_decision === 'extended' && (
								<div className={styles.update_dates}>
									<div className={styles.sub_heading}>Extended Date</div>

									<div style={{ fontWeight: 'bold' }}>
										{extended_date
											? formatDate({
												date       : extended_date,
												formatType : 'date',
												dateFormat : 'dd MMM yyyy',
											}) : '---'}

									</div>
								</div>
							)}
						</div>
						<div className={styles.sub_container}>
							<div className={styles.label}>Add Remarks</div>
							<Textarea
								placeholder="Type here..."
								style={{ height: '100px' }}
								value={item?.comment}
								onChange={(val) => setItem((prevItems) => ({
									...prevItems,
									comment: val,
								}))}
							/>
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
