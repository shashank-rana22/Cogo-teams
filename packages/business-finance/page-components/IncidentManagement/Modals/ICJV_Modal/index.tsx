import { Textarea, Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import useGetInterJvData from '../../apisModal/useGetInterJvData';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import controls from './contols';
import StyledTableICJV from './StyledTableICJV';
import styles from './styles.module.css';

function ICJVModal({ interCompanyJournalVoucherRequest, refetch, id, isEditable = true, row }) {
	const [showICJvModal, setShowICJvModal] = useState(false);
	const [remark, setRemark] = useState('');

	const { list, totalDebit, totalCredit } = interCompanyJournalVoucherRequest || {};

	const { useOnAction:OnAction, loading } = useGetInterJvData({
		refetch,
		setShowICJvModal,
		id,
		interCompanyJournalVoucherRequest,
		remark,
	});

	return (
		<div>
			<div>
				<ViewButton state={setShowICJvModal} />
			</div>
			{showICJvModal && (
				<Modal
					size="lg"
					show={showICJvModal}
					onClose={() => {
						setShowICJvModal(false);
					}}
				>
					<Modal.Header title="Inter Company - Journal Voucher" />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}
						<div className={styles.sub_container}>
							<div className={styles.debit_container}>
								<div className={styles.color}>Debit  </div>
								<div className={styles.debit}>
									<div style={{ margin: '0px 2px' }}>
										{list[0]?.currency}
									</div>
									{totalDebit}
								</div>
							</div>

							<div className={styles.debit_container}>
								<div className={styles.color}>Credit  </div>
								<div className={styles.debit}>
									<div style={{ margin: '0px 2px' }}>
										{list[0]?.currency}
									</div>
									{totalCredit}
								</div>
							</div>
						</div>
						<div>
							<StyledTableICJV
								data={list || []}
								columns={controls}
								loading={false}
							/>
						</div>

						{isEditable && (
							<>
								<div className={styles.remarks}>Remarks*</div>

								<Textarea
									name="remark"
									size="md"
									placeholder="Enter Remark Here..."
									onChange={(value: string) => setRemark(value)}
									style={{ width: '700', height: '100px', marginBottom: '12px' }}
								/>
							</>
						) }

					</Modal.Body>
					{isEditable && (
						<Modal.Footer>
							<div className={styles.button}>
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '8px' }}
									disabled={!(remark.length) || loading}
									loading={loading}
									onClick={() => {
										OnAction('REJECTED');
									}}
								>
									Reject
								</Button>

								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={!(remark.length) || loading}
									loading={loading}
									onClick={() => {
										OnAction('APPROVED');
									}}
								>
									Approve
								</Button>
							</div>
						</Modal.Footer>
					)}
				</Modal>
			)}
		</div>
	);
}
export default ICJVModal;
