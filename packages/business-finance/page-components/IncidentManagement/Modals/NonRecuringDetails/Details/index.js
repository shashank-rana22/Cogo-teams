import { Button, cl, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import usePostExpense from '../../../apisModal/usePostExpense';
import RejectModal from '../../../common/RejectModal/index';
import STATUS_MAPPING from '../../../Constants/status_mapping';
import StyledTable from '../../../StyleTable';
import { getFormatAmount } from '../../../utils/getformatamount';
import { GetLabelAndValue } from '../../../utils/getLabelAndValue';

import { overHeadConfigs } from './overheadsConfigs';
import styles from './styles.module.css';

function Details({ row = {}, setDetailsModal = () => {}, refetch = () => {} }) {
	const { t } = useTranslation(['incidentManagement']);
	const [remarks, setRemarks] = useState('');
	const { status = '', id = '', data = {} } = row || {};

	const { overheadConfirmationRequest = {}, organization = {} } = data || {};
	const { tradePartyName = '', businessName = '' } = organization || {};

	const {
		ledgerGrandTotal = '',
		invoiceNumber = '',
		branchName = '',
		subTotalAmount = '',
		taxTotalAmount = '',
		grandTotalAmount = '',
		lineItems = [],
		currency = '',
	} = overheadConfirmationRequest || {};
	const { useOnAction: onAction, loading } = usePostExpense({
		data,
		refetch,
		setDetailsModal,
		id,
		remark: remarks,
		t,
	});

	const [showRejectModal, setShowRejectModal] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.large}>
					<div className={styles.title}>Trade Party Name</div>
					<div className={styles.text}>
						<div className={styles.tooltip_title}>
							{(tradePartyName || '')}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.flex}>
				<div className={styles.large}>
					<GetLabelAndValue value={invoiceNumber} label="Invoice Number" />
				</div>
				<div className={styles.large}>
					<GetLabelAndValue value={businessName} label="Business Name" />
				</div>
				<div className={styles.small}>
					<GetLabelAndValue value={branchName} label="Branch" />
				</div>
			</div>
			<div className={styles.flex}>
				<div className={styles.small}>
					<GetLabelAndValue value={getFormatAmount(subTotalAmount, currency)} label="Sub Total" />
				</div>
				<div className={styles.small}>
					<GetLabelAndValue value={getFormatAmount(taxTotalAmount, currency)} label="Tax Amount" />
				</div>
				<div className={styles.small}>
					<GetLabelAndValue value={getFormatAmount(grandTotalAmount, currency)} label="Grand Total" />
				</div>
				<div className={styles.small}>
					<GetLabelAndValue value={getFormatAmount(ledgerGrandTotal, currency)} label="Ledger Grand Total" />
				</div>
			</div>

			{!isEmpty(lineItems) ? (
				<div className={styles.list_container}>
					<StyledTable
						columns={overHeadConfigs({ t })}
						showPagination={false}
						data={lineItems}
					/>
				</div>
			) : (
				<div className={styles.line_item_empty}>
					{t('incidentManagement:no_line_items_available')}
				</div>
			)}
			{status === 'REQUESTED' ? (
				<div>
					<div className={styles.remarks_div}>
						<div
							className={cl`${styles.label} 
								${styles.required_field}`}
						>
							Remarks
						</div>

						<Textarea
							className={styles.textarea}
							name="remark"
							size="md"
							placeholder="Enter Remarks Here"
							onChange={(value) => setRemarks(value)}
						/>
					</div>
					<div className={styles.button_container}>
						<Button
							size="md"
							themeType="secondary"
							disabled={isEmpty(remarks) || loading}
							loading={loading}
							onClick={() => setShowRejectModal(true)}
						>
							Reject
						</Button>

						<Button
							size="md"
							themeType="primary"
							disabled={isEmpty(remarks) || loading}
							loading={loading}
							onClick={() => onAction({ status: STATUS_MAPPING.approved })}
						>
							Approve
						</Button>
					</div>
					{showRejectModal
					&& (
						<RejectModal
							setShowRejectModal={setShowRejectModal}
							onAction={onAction}
							showRejectModal={showRejectModal}
							loading={loading}
						/>
					)}
				</div>
			) : null}
		</div>
	);
}

export default Details;
