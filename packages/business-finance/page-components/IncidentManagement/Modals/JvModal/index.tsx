import { Textarea, Modal, Button } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetJvData from '../../apisModal/useGetJvData';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import styles from './styles.module.css';

function JvModal({ journalVoucherRequest, id, refetch, isEditable = true, row }) {
	const [showJvModal, setShowJVModal] = useState(false);
	const [remark, setRemark] = useState('');

	const {
		currency,
		ledCurrency,
		amount,
		entityCode,
		type,
		category,
		exchangeRate,
		validityDate,
		tradePartyName,
		accMode,
		description,
	} = journalVoucherRequest || {};

	const getAllValidData = [
		{ id: '1', label: 'Entity', value: entityCode },
		{ id: '2', label: 'Business Partner', value: tradePartyName },
		{ id: '3', label: 'JV Type', value: type },
		{ id: '4', label: 'JV Category', value: category },
		{ id: '5', label: 'JV Mode', value: accMode },
	];

	const getAllData = [
		{ id: '1', label: 'Currency', value: currency },
		{ id: '2', label: 'Amount', value: amount.toFixed(2) },
		{ id: '3', label: 'Exchange Rate', value: exchangeRate },
		{ id: '4', label: 'Ledger Currency', value: ledCurrency },
		{ id: '5', label: 'Validity Date', value: format(new Date(validityDate), 'dd MMM yyyy', {}, false) },
	];

	const { useOnAction:OnAction, loading } = useGetJvData({
		refetch,
		setShowJVModal,
		id,
		journalVoucherRequest,
		remark,
	});

	return (
		<div>
			<div>
				<ViewButton state={setShowJVModal} />
			</div>
			{showJvModal && (
				<Modal
					size="lg"
					show={showJvModal}
					onClose={() => {
						setShowJVModal(false);
					}}
				>
					<Modal.Header title="Journal Voucher" />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}
						<div className={styles.flex}>
							{getAllValidData.map((item) => (
								<div className={styles.value_data}>
									<div className={styles.label_value}>
										{item?.label || '-'}
									</div>
									<div className={styles.date_value}>

										{startCase(item?.value) || '-'}

									</div>
								</div>
							))}
						</div>

						<div className={styles.border} />

						<div className={styles.flex}>
							{getAllData.map((item) => (
								<div className={styles.value_data}>
									<div className={styles.label_value}>
										{item?.label || '-'}
									</div>
									<div className={styles.date_value}>
										{ item?.label === 'Amount' || item?.label === 'Exchange Rate'
											? item?.value : startCase(item?.value)}
									</div>
								</div>
							))}
						</div>

						<div className={styles.document_flex}>
							<div className={styles.document}>Remark -</div>
							<div>{description}</div>
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
export default JvModal;
