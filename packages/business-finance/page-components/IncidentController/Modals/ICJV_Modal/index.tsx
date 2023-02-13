import { Textarea, Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import useGetInterJvData from '../../apisModal/useGetInterJvData';
import StyledTable from '../../StyledTable';

import controls from './contols';
import styles from './styles.module.css';

function ICJVModal({ interCompanyJournalVoucherRequest, refetch, id, isEditable = true }) {
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

	const onApprove = () => {
		OnAction('APPROVED');
	};
	const onReject = () => {
		OnAction('REJECTED');
	};
	return (
		<div>
			<div>
				<Button
					style={{ height: '30px', fontSize: '12px', width: '70px', fontWeight: '600' }}
					themeType="secondary"
					onClick={() => {
						setShowICJvModal(true);
					}}
				>
					View
				</Button>
			</div>
			{showICJvModal && (
				<Modal
					size="lg"
					show={showICJvModal}
					onClose={() => {
						setShowICJvModal(false);
					}}
				>
					<Modal.Header title="Journal Voucher" />
					<Modal.Body>
						<div className={styles.sub_container}>
							<div className={styles.debit_container}>
								<div>Debit - </div>
								<div className={styles.debit}>
									<div style={{ margin: '0px 2px' }}>
										{list[0]?.currency}
									</div>
									{totalDebit}
								</div>
							</div>

							<div className={styles.debit_container}>
								<div>Credit - </div>
								<div className={styles.debit}>
									<div style={{ margin: '0px 2px' }}>
										{list[0]?.currency}
									</div>
									{totalCredit}
								</div>
							</div>
						</div>
						<div>
							<StyledTable
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
									onClick={() => {
										onReject();
									}}
								>
									Reject
								</Button>

								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={!(remark.length) || loading}
									onClick={() => {
										onApprove();
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
