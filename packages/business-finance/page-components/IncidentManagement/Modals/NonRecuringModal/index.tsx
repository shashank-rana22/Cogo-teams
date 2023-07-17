import { Tooltip, Textarea, Modal, Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import usePostExpense from '../../apisModal/usePostExpense';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';
import StyledTable from '../../StyledTable';
import mappingNonRecurring from '../../utils/mappingNonRecurring';
import { toTitleCase } from '../../utils/titleCase';

import { OVER_HEAD_CONFIGS } from './overheadsConfig';
import styles from './style.module.css';

interface RowData {
	data: {
		overheadConfirmationRequest?: {
			invoiceNumber?:string;
			subTotalAmount?: any;
			taxTotalAmount?: any;
			grandTotalAmount?: any;
			lineItems?: any;
			ledgerGrandTotal?: any;
			ledgerCurrency?: string;
			remarks?: string;
			billCurrency?: string;
			documents?: any;
			branchName?: string;
			categoryName?: string;
			expenseType?: string;
		}
		organization?: {
			businessName?: string;
		}
		referenceId?: string;
	};
}

function NonRecuringModal({ id = '', refetch = () => {}, row = {} as RowData, isEditable = true }) {
	const [showModal, setShowModal] = useState(false);

	const [remarks, setRemarks] = useState('');
	const { data = {} } = row || {};
	const { overheadConfirmationRequest, organization, referenceId = '' } = data;
	const {
		lineItems,
		remarks: remarkData,
		documents,
		expenseType,
	} = overheadConfirmationRequest || {};

	const { useOnAction: onAction, loading } = usePostExpense({
		refetch,
		setShowModal,
		id,
		remark: remarks,
	});

	const { businessName } = organization || {};

	const { INCIDENT_MAPPING = [] } = mappingNonRecurring({ overheadConfirmationRequest });

	return (
		<div>
			<div>
				<ViewButton state={setShowModal} />
			</div>

			<Modal
				size="lg"
				show={showModal}
				onClose={() => setShowModal(false)}
			>
				<Modal.Header
					title={`Expense Approval - ${toTitleCase(
						businessName,
					)} (${toTitleCase(
						startCase(expenseType),
					)}) ${referenceId}`}
				/>
				<Modal.Body>
					{!isEditable && <ApproveAndReject row={row} />}

					<div className={styles.flex}>
						{INCIDENT_MAPPING?.map((item) => (
							<div
								className={styles.value_data}
								key={item.key}
							>
								<div className={styles.label_value}>
									{item?.key || '-'}
								</div>
								<div className={styles.date_value}>
									{item?.value || '-'}
								</div>
							</div>
						))}
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
					{!isEmpty(lineItems) ? (
						<div className={styles.list_container}>
							<StyledTable
								columns={OVER_HEAD_CONFIGS}
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
									onAction('REJECTED');
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
									onAction('APPROVED');
								}}
							>
								Approve
							</Button>
						</div>
					</Modal.Footer>
				)}
			</Modal>
		</div>
	);
}
export default NonRecuringModal;
