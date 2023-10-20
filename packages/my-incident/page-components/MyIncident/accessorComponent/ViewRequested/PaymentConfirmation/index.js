import { Textarea, Modal, Button } from '@cogoport/components';

import getDetails from './getDetails';
import styles from './styles.module.css';

function PaymentConfirmation({ itemData, setRemarks, remarks, onSave, showModal, setShowModal, loadingOnSave }) {
	const { status, userNotes, data } = itemData || {};
	const { paymentConfirmationRequest, organization } = data || {};
	const details = getDetails(paymentConfirmationRequest, organization);

	return (
		<div>
			<div>
				<Button
					size={status === 'REJECTED' ? 'sm' : 'md'}
					themeType={status === 'REJECTED' ? 'tertiary' : 'secondary'}
					onClick={() => { setShowModal(true); }}
				>
					View
				</Button>
			</div>
			{showModal && (
				<Modal
					size="lg"
					show={showModal}
					onClose={() => {
						setShowModal(false);
					}}
				>
					<Modal.Header title="Payment Confirmation Approval" />
					<Modal.Body>
						{details?.map((detail) => (
							<div key={detail.title} className={styles.flex}>
								<div className={styles.title}>
									{detail.title}
								</div>
								<div className={styles.divider}>
									:
								</div>
								<div className={styles.name}>
									<div>{detail.value}</div>
								</div>
							</div>
						))	}

						<div>
							<div style={{ display: 'flex' }}>
								<div className={styles.input_titles}>Remarks*</div>
								<span className={styles.divider}>:</span>
								<Textarea
									name="remark"
									size="lg"
									placeholder="Enter Remarks Here..."
									onChange={(values) => setRemarks(values)}
									defaultValue={userNotes}
									className={styles.text_area}
								/>
							</div>
						</div>

					</Modal.Body>
					<Modal.Footer>
						<div className={styles.button}>
							<Button
								themeType="secondary"
								size="md"
								style={{ marginRight: '8px' }}
								disabled={!(remarks.length > 0) || loadingOnSave}
								onClick={onSave}
							>
								Save
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			)}
		</div>
	);
}
export default PaymentConfirmation;
