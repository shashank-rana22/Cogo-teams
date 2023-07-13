import { Tooltip, Textarea, Modal, Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEyeopen } from '@cogoport/icons-react';
import { useState } from 'react';

import usePostExpense from '../../apisModal/usePostExpense';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';
import StyledTable from '../../StyledTable';
import { toTitleCase } from '../../utils/titleCase';

import { overheadsConfig } from './overheadsConfig';
import styles from './style.module.css';

function NonRecuringModal({ id, refetch, row, isEditable = true }) {
	const [showModal, setShowModal] = useState(false);

	const [remarks, setRemarks] = useState('');
	const { data = {} } = row || {};
	const { overheadConfirmationRequest, organization } = data;
	const {
		invoiceNumber,
		subTotalAmount,
		taxTotalAmount,
		grandTotalAmount,
		lineItems,
		invoiceId,
		remarks: remarkData,
		billCurrency: currency,
		documents,
		branchName,
		categoryName,
	} = overheadConfirmationRequest || {};

	const { useOnAction: OnAction, loading } = usePostExpense({
		refetch,
		setShowModal,
		id,
		remark: remarks,
	});

	const { businessName } = organization || {};

	const { referenceId = '' } = row || {};

	return (
		<div>
			<div>
				<ViewButton state={setShowModal} />
			</div>
			{showModal && (
				<Modal
					size="lg"
					show={showModal}
					onClose={() => setShowModal(false)}
				>
					<Modal.Header
						title={`Expense Approval - ${toTitleCase(
							businessName,
						)}`}
					/>
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}

						<div className={styles.flex}>
							<div className={styles.value_data}>
								<div className={styles.label_value}>
									Incident ID
								</div>
								<div className={styles.date_value}>
									{referenceId || '-'}
								</div>
							</div>

							<div className={styles.value_data}>
								<div className={styles.label_value}>
									Invoice number
								</div>
								<div className={styles.date_value}>
									<a
										href={`${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}/sales/invoice/final/
										${invoiceId}/download/`}
										target="_blank"
										rel="noreferrer"
									>
										{invoiceNumber || '-'}
									</a>
								</div>
							</div>
							<div className={styles.value_data}>
								<div className={styles.label_value}>
									Branch Name
								</div>
								<div className={styles.date_value}>
									{branchName || '-'}
								</div>
							</div>
							<div className={styles.value_data}>
								<div className={styles.label_value}>
									Category Name
								</div>
								<div className={styles.date_value}>
									{categoryName || '-'}
								</div>
							</div>

							<div className={styles.value_data}>
								<div className={styles.label_value}>
									SubTotal
								</div>
								<div className={styles.date_value}>
									{formatAmount({
										amount  : subTotalAmount,
										currency,
										options : {
											style           : 'currency',
											currencyDisplay : 'code',
										},
									}) || '-'}
								</div>
							</div>

							<div className={styles.value_data}>
								<div className={styles.label_value}>
									TaxAmount
								</div>
								<div className={styles.date_value}>
									{formatAmount({
										amount  : taxTotalAmount,
										currency,
										options : {
											style           : 'currency',
											currencyDisplay : 'code',
										},
									}) || '-'}
								</div>
							</div>

							<div className={styles.value_data}>
								<div className={styles.label_value}>
									GrandTotal
								</div>
								<div className={styles.date_value}>
									{formatAmount({
										amount  : grandTotalAmount,
										currency,
										options : {
											style           : 'currency',
											currencyDisplay : 'code',
										},
									}) || '-'}
								</div>
							</div>
						</div>

						<div className={styles.document_flex}>
							<div className={styles.document}>Remarks -</div>
							{remarkData?.length > 40 ? (
								<Tooltip
									className={styles.tooltip}
									interactive
									content={remarkData || '-'}
								>
									<div className={styles.wrapper}>
										{remarkData || '-'}
									</div>
								</Tooltip>
							) : (
								remarkData || '-'
							)}
						</div>

						<div className={styles.document_flex}>
							<div className={styles.document}>Document -</div>
							{documents?.map((url: any) => (url !== '' ? (
								<a
									href={url}
									target="_blank"
									rel="noreferrer"
									key={url}
								>
									<div className={styles.view_flex}>
										<div className={styles.view}>
											View Document
										</div>
										<IcMEyeopen />
									</div>
								</a>
							) : (
								<div key={url}> No document available</div>
							)))}
						</div>
						{lineItems?.length > 0 ? (
							<div className={styles.list_container}>
								<StyledTable
									columns={overheadsConfig}
									showPagination={false}
									data={lineItems}
								/>
							</div>
						) : (
							<div className={styles.line_item_empty}>
								No LineItems Available
							</div>
						)}
						{isEditable && (
							<>
								<div className={styles.remarks}>Remarks*</div>

								<Textarea
									name="remark"
									size="md"
									placeholder="Enter Remark Here..."
									onChange={(value: string) => setRemarks(value)}
									style={{
										width        : '700',
										height       : '100px',
										marginBottom : '12px',
									}}
								/>
							</>
						)}
					</Modal.Body>
					{isEditable && (
						<Modal.Footer>
							<div className={styles.button}>
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '8px' }}
									disabled={!remarks.length || loading}
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
									disabled={!remarks.length || loading}
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
export default NonRecuringModal;
