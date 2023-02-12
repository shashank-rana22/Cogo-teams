import { Popover, Textarea, Modal, Button } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetTdsData from '../../apisModal/useGetTdsData';

import styles from './style.module.css';

function RequestCN({ id, refetch, row, isEditable = true }) {
	const [showTdsModal, setShowTdsModal] = useState(false);
	const [shoPopover, setShowPopover] = useState(false);
	const [remarks, setRemarks] = useState('');
	const { data = {} } = row || {};
	const { creditNoteRequest } = data;
	const {
		invoiceNumber,
		jobNumber,
		lineItems,
		subTotal,
		taxAmount,
		grandTotal,
		creditNoteNumber,
		invoiceId,
		remark,
		creditNoteType,
		creditNoteRemarks,
		documentProof,
		currency,
		documentUrls,
	} = creditNoteRequest;

	const { useOnAction:OnAction, loading } = useGetTdsData({
		refetch,
		setShowTdsModal,
		id,
		row,
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
						setShowTdsModal(true);
					}}
				>
					View
				</Button>
			</div>
			{showTdsModal && (
				<Modal
					size="lg"
					show={showTdsModal}
					onClose={() => {
						setShowTdsModal(false);
					}}
				>
					<Modal.Header title={`Request Credit Note - ${creditNoteNumber}`} />
					<Modal.Body>
						<div className={styles.flex}>

							<div className={styles.value_data}>
								<div className={styles.label_value}>
									Shipment ID
								</div>
								<div className={styles.date_value}>
									#
									{jobNumber}
								</div>
							</div>

							<div className={styles.value_data}>
								<div className={styles.label_value}>
									Invoice number
								</div>
								<div className={styles.date_value}>
									<a
										href={`${process.env.BUSINESS_FINANCE_BASE_URL}
                                        /sales/invoice/final/${invoiceId}/download/`}
										target="_blank"
										rel="noreferrer"
									>
										{invoiceNumber}
									</a>
								</div>
							</div>
							<Popover
								placement="bottom"
								visible={shoPopover}
								caret={false}
								trigger="click"
								render={<div>jbdlj</div>}
								interactive
							>
								<Button
									themeType="secondary"
									onClick={() => setShowPopover(!shoPopover)}
								>
									<div className={styles.flex}>
										CN Category
										<div className={styles.icon_container}>
											<IcMArrowRotateDown />
										</div>
									</div>
								</Button>
							</Popover>

						</div>

						<div className={styles.document_flex}>
							<div className={styles.document}>Document -</div>
							{documentUrls?.map((url:any) => (url !== '' ? (
								<a href={url} target="_blank" rel="noreferrer">
									{url.split('/')[4]}
								</a>
							) : (
								<div> No document available</div>
							)))}
						</div>
						<div className={styles.remarks}>Remarks*</div>
						<Textarea
							name="remark"
							size="md"
							placeholder="Enter Remark Here..."
							onChange={(value: string) => setRemarks(value)}
							style={{ width: '700', height: '100px', marginBottom: '12px' }}
						/>

					</Modal.Body>
					{isEditable && (
						<Modal.Footer>
							<div className={styles.button}>
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '8px' }}
									disabled={!(remarks.length) || loading}
									onClick={() => {
										onReject();
									}}
								>
									Reject
								</Button>

								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={!(remarks.length) || loading}
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
export default RequestCN;
