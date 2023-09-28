import { Button, cl, Pill, Popover, Select, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetTdsData from '../../../apisModal/useGetTdsData';
import RejectModal from '../../../common/RejectModal/index';
import StyledTable from '../../../StyleTable';
import { getFormatAmount } from '../../../utils/getformatamount';
import ShowContent from '../ShowContent';

import {
	creditNoteApprovalTypeOptions,
	requestCreditNoteColumns,
	requestConsolidatedCreditNoteColumns,
} from './credit-note-config';
import styles from './styles.module.css';

function Details({
	row = {},
	setDetailsModal = () => {},
	refetch = () => {},
}) {
	const { t } = useTranslation(['incidentManagement']);
	const [showRejectModal, setShowRejectModal] = useState(false);
	const [creditNoteApprovalType, setCreditNoteApprovalType] = useState('');
	const [showPopover, setShowPopover] = useState(false);
	const [remarks, setRemarks] = useState('');
	const { status = '', level2 = {}, level1 = {}, data = {}, type = '', id = '' } = row || {};
	const isConsolidated = type === 'CONSOLIDATED_CREDIT_NOTE';
	const { creditNoteRequest = {}, consolidatedCreditNoteRequest = {}, organization = {} } = data;
	const {
		creditNoteNumber = '',
		invoiceNumber = '',
		jobNumber = '',
		subTotal = 0,
		taxAmount = 0,
		grandTotal = 0,
		lineItems = [],
		proformaList = [],
		remark = '',
		creditNoteType = '',
		creditNoteRemarks = '',
		currency = '',
		revoked = false,
		creditNoteApprovalType: approvalType,
	} = !isEmpty(consolidatedCreditNoteRequest) ? consolidatedCreditNoteRequest : creditNoteRequest || {};
	const { tradePartyName = '', businessName = '' } = organization || {};
	let isEditable = true;
	if (status !== 'REQUESTED') {
		isEditable = false;
	}
	const [CNCategoryValues, setCNCategoryValues] = useState({
		CNType   : null,
		CNValues : null,
		remarks  : null,
	});
	const { useOnAction:OnAction, loading } = useGetTdsData({
		refetch,
		setDetailsModal,
		id,
		row,
		remark,
		CNCategoryValues,
		isConsolidated,
		creditNoteApprovalType,
		level2,
		t,
	});
	const rest = { onClickOutside: () => { setShowPopover(false); } };
	return (
		<div className={styles.container}>
			<div className={styles.display_container}>
				<div className={styles.display_box}>
					<div className={styles.company_div}>
						<div className={styles.heading}>Company Name</div>
						<div className={styles.text}>
							<div className={styles.tooltip_title}>
								{(tradePartyName || businessName || '')}
							</div>
						</div>
					</div>
					<div>
						<div className={styles.heading}>Credit Note Number</div>
						<div className={styles.text}>{creditNoteNumber || ''}</div>
					</div>
				</div>
				<div className={styles.line} />
				<div className={isConsolidated ? styles.no_flex : styles.flex}>
					{!isConsolidated ?	(
						<div className={styles.value_data}>
							<div className={styles.label_value}>
								{t('incidentManagement:shipment_id')}
							</div>
							<div className={styles.date_value}>
								#
								{jobNumber || '-'}
							</div>
						</div>
					) : ''}
					<div className={isConsolidated ? styles.no_value_data : styles.value_data}>
						<div className={styles.label_value}>
							{t('incidentManagement:invoice_number')}
						</div>
						<div className={styles.date_value}>
							{invoiceNumber || '-'}
						</div>
					</div>
					{!isConsolidated ?	(
						<div className={styles.value_data}>
							<div className={styles.label_value}>
								{t('incidentManagement:sub_total')}
							</div>
							<div className={styles.date_value}>
								{getFormatAmount(subTotal, currency)}
							</div>
						</div>
					) : ''}
					{!isConsolidated ?	(
						<div className={styles.value_data}>
							<div className={styles.label_value}>
								{t('incidentManagement:tax_amount')}
							</div>
							<div className={styles.date_value}>
								{getFormatAmount(taxAmount, currency)}
							</div>
						</div>
					) : ''}
					<div className={styles.value_data}>
						<div className={styles.label_value}>
							{t('incidentManagement:grand_total')}
						</div>
						<div className={styles.date_value}>
							{getFormatAmount(grandTotal, currency)}
						</div>
					</div>
				</div>
				<div className={styles.credit}>
					<div className={styles.button_container_data}>
						<Popover
							placement="bottom"
							visible={showPopover}
							render={(
								<ShowContent
									creditNoteType={creditNoteType}
									isEditable={isEditable}
									level1={level1}
									t={t}
									status={status}
									creditNoteRemarks={creditNoteRemarks}
									setShowPopover={setShowPopover}
									CNCategoryValues={CNCategoryValues}
									setCNCategoryValues={setCNCategoryValues}
								/>
							)}
							{...rest}
						>
							<Button
								themeType="secondary"
								onClick={() => setShowPopover(!showPopover)}
							>
								<div className={styles.flex}>
									{t('incidentManagement:cn_category')}
									<div className={styles.icon_container}>
										{showPopover ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
									</div>
								</div>
							</Button>
						</Popover>
						<Select
							value={approvalType || creditNoteApprovalType}
							disabled={level1?.status === 'APPROVED'}
							onChange={(e) => setCreditNoteApprovalType(e)}
							placeholder={t('incidentManagement:cn_approval_type_placeholder')}
							options={creditNoteApprovalTypeOptions({ t })}
							size="sm"
							className={styles.select_container}
						/>
					</div>
					{typeof (revoked) === 'boolean' && (
						<div>
							{revoked
								? <Pill size="md" color="#C4DC91">{t('incidentManagement:fully_revoked')}</Pill>
								: (
									<Pill size="md" color="#FEF199">
										{t('incidentManagement:partial_revoked')}
									</Pill>
								)}
						</div>
					)}
				</div>
				{lineItems?.length > [GLOBAL_CONSTANTS.zeroth_index] && (
					<div className={styles.list_container}>
						<StyledTable
							columns={requestCreditNoteColumns({ t })}
							showPagination={false}
							data={lineItems}
						/>
					</div>
				)}
				{proformaList?.length > [GLOBAL_CONSTANTS.zeroth_index] && (
					<div className={styles.list_container}>
						<StyledTable
							columns={requestConsolidatedCreditNoteColumns()}
							showPagination={false}
							data={proformaList}
						/>
					</div>
				)}
				{(!proformaList?.length && !lineItems?.length)
					? (
						<div className={styles.line_item_empty}>
							{t('incidentManagement:no_line_items_available')}
						</div>
					)
					: ''}
			</div>
			{ status === 'REQUESTED' ? (
				<div>
					<div className={cl`${styles.label} ${styles.required_field}`}>Remarks</div>
					<Textarea
						className={styles.textarea}
						name="remark"
						size="md"
						placeholder="Enter Remarks Here"
						onChange={(value) => setRemarks(value)}
					/>
					<div className={styles.button_container}>
						<Button
							size="md"
							themeType="secondary"
							style={{ marginRight: '8px' }}
							disabled={!(remarks.length) || loading
								|| (isEmpty(creditNoteApprovalType) && isEmpty(approvalType))}
							loading={loading}
							onClick={() => setShowRejectModal(true)}
						>
							{t('incidentManagement:reject_btn')}
						</Button>
						<Button
							size="md"
							style={{ marginRight: '8px' }}
							disabled={!(remarks.length) || loading || (isEmpty(creditNoteApprovalType)
										&& isEmpty(approvalType))}
							loading={loading}
							onClick={() => OnAction({ status: 'APPROVED' })}
						>
							{t('incidentManagement:approve_btn')}
						</Button>
					</div>
					{showRejectModal
					&& (
						<RejectModal
							setShowRejectModal={setShowRejectModal}
							onAction={OnAction}
							showRejectModal={showRejectModal}
							loading={loading}
						/>
					)}
				</div>
			) : null }
		</div>
	);
}

export default Details;
