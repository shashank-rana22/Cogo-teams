import { Textarea, Modal, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetInterJvData from '../../apisModal/useGetInterJvData';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import getControls from './contols';
import StyledTableICJV from './StyledTableICJV';
import styles from './styles.module.css';

function ICJVModal({ interCompanyJournalVoucherRequest, refetch, id, isEditable = true, row }) {
	const { t } = useTranslation(['incidentManagement']);
	const [showICJvModal, setShowICJvModal] = useState(false);
	const [remark, setRemark] = useState('');

	const { list, totalDebit, totalCredit } = interCompanyJournalVoucherRequest || {};

	const { useOnAction:OnAction, loading } = useGetInterJvData({
		refetch,
		setShowICJvModal,
		id,
		interCompanyJournalVoucherRequest,
		remark,
		t,
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
					<Modal.Header title={t('incidentManagement:icjv_title')} />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}
						<div className={styles.sub_container}>
							<div className={styles.debit_container}>
								<div className={styles.color}>{t('incidentManagement:debit_header')}</div>
								<div className={styles.debit}>
									<div style={{ margin: '0px 2px' }}>
										{list[0]?.currency}
									</div>
									{totalDebit}
								</div>
							</div>

							<div className={styles.debit_container}>
								<div className={styles.color}>{t('incidentManagement:credit_header')}</div>
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
								columns={getControls({ t })}
								loading={false}
							/>
						</div>

						{isEditable && (
							<>
								<div className={styles.remarks}>{`${t('incidentManagement:remarks')}*`}</div>

								<Textarea
									name="remark"
									size="md"
									placeholder={t('incidentManagement:remarks_placeholder')}
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
									{t('incidentManagement:reject_btn')}
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
									{t('incidentManagement:approve_btn')}
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
