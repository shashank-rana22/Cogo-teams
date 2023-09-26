import { Tooltip, Select, Popover, Textarea, Modal, Button, Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import useGetTdsData from '../../apisModal/useGetTdsData';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';
import StakeHolderTimeline from '../../StakeHolderTimeline';
import StyledTable from '../../StyledTable';
import stakeHolderTimeLineData from '../../utils/formatStakeHolderData';
import { toTitleCase } from '../../utils/titleCase';

import {
	creditNoteApprovalTypeOptions,
	categoryOptions, NON_REVENUE_DATA, nonRevenueOptions,
	requestCreditNoteColumns, revenueOptions,
} from './credit-note-config';
import styles from './style.module.css';

const MAX_LEN = 40;
const CN_VALUES_DATA = ['revenueOthers', 'nonRevenueOthers'];
const STATUS_LIST = ['APPROVED', 'REJECTED'];

function RequestCN({ id, refetch, row, isEditable = true, status = '' }) {
	const { t } = useTranslation(['incidentManagement']);
	const [showTdsModal, setShowTdsModal] = useState(false);
	const [CNCategoryValues, setCNCategoryValues] = useState({
		CNType   : null,
		CNValues : null,
		remarks  : null,
	});
	const [creditNoteApprovalType, setCreditNoteApprovalType] = useState('');
	const [showPopover, setShowPopover] = useState(false);
	const [remarks, setRemarks] = useState('');
	const { level3 = {}, level2 = {}, level1 = {}, data = {}, type } = row || {};
	const isConsolidated = type === 'CONSOLIDATED_CREDIT_NOTE';
	const { creditNoteRequest, consolidatedCreditNoteRequest, organization } = data;
	const {
		invoiceNumber,
		jobNumber,
		subTotal,
		taxAmount,
		grandTotal,
		lineItems,
		creditNoteNumber,
		invoiceId,
		remark,
		creditNoteType,
		creditNoteRemarks,
		currency,
		documentUrls,
		revoked,
		creditNoteApprovalType: approvalType,
	} = creditNoteRequest || consolidatedCreditNoteRequest || {};

	const { useOnAction:OnAction, loading } = useGetTdsData({
		refetch,
		setShowTdsModal,
		id,
		row,
		remark,
		CNCategoryValues,
		isConsolidated,
		creditNoteApprovalType,
		level2,
		t,
	});

	const { businessName } = organization || {};

	const RevenueImpacting =	CNCategoryValues?.CNType === 'REVENUE_IMPACTING'
	|| creditNoteType === 'REVENUE_IMPACTING';
	const NonRevenueImpacting =	CNCategoryValues?.CNType === 'NON_REVENUE_IMPACTING'
	|| creditNoteType === 'NON_REVENUE_IMPACTING';

	const { referenceId = '' } = row || {};

	function ShowContent() {
		return (
			<div className={styles.container}>
				<div>
					<div className={styles.texts}>{`${t('incidentManagement:cn_category_type')}*`}</div>
					<div className={styles.select_container}>
						<Select
							className="primary md"
							placeholder={`${t('incidentManagement:cn_category_type')}..`}
							value={creditNoteType || CNCategoryValues?.CNType}
							disabled={!isEditable || level1?.status === 'APPROVED'}
							onChange={(e:string) => setCNCategoryValues({ ...CNCategoryValues, CNType: e })}
							options={categoryOptions({ t })}
						/>
					</div>
				</div>
				{(CNCategoryValues?.CNType
				|| STATUS_LIST.includes(status)) && (
					<div>
						{RevenueImpacting && (
							<div className={styles.texts}>
								{`${t('incidentManagement:revenue_impacting')}*`}
							</div>
						)}
						{NonRevenueImpacting && (
							<div className={styles.texts}>
								{`${t('incidentManagement:non_revenue_impacting')}*`}
							</div>
						)}
						<div className={styles.select_container}>
							{RevenueImpacting && (
								<Select
									className="primary md"
									placeholder={t('incidentManagement:type_here_placeholder')}
									value={creditNoteRemarks || CNCategoryValues?.CNValues}
									disabled={!isEditable || level1?.status === 'APPROVED'}
									onChange={(e) => setCNCategoryValues({ ...CNCategoryValues, CNValues: e })}
									options={
									creditNoteRemarks
										? [
											...(revenueOptions({ t })),
											{ label: creditNoteRemarks, value: creditNoteRemarks },
										]
										: revenueOptions({ t })
								}
								/>
							)}
							{NonRevenueImpacting && (
								<Select
									className="primary md"
									placeholder={t('incidentManagement:type_here_placeholder')}
									value={
									NON_REVENUE_DATA.includes(creditNoteRemarks)
										? creditNoteRemarks
										: creditNoteRemarks || CNCategoryValues?.CNValues
								}
									disabled={!isEditable || level1?.status === 'APPROVED'}
									onChange={(e) => setCNCategoryValues({ ...CNCategoryValues, CNValues: e })}
									options={
									creditNoteRemarks
										? [
											...(nonRevenueOptions({ t })),
											{ label: creditNoteRemarks, value: creditNoteRemarks },
										]
										: nonRevenueOptions({ t })
								}
								/>
							)}
						</div>
					</div>
				)}
				{CN_VALUES_DATA.includes(CNCategoryValues?.CNValues) && (
					<div>
						<div className={styles.texts}>{t('incidentManagement:remarks')}</div>

						<Textarea
							value={CNCategoryValues?.remarks}
							disabled={!isEditable}
							onChange={(e:any) => setCNCategoryValues({
								...CNCategoryValues,
								remarks: e,
							})}
							placeholder={t('incidentManagement:remarks_placeholder')}
						/>

					</div>
				)}
				<div className={styles.button_container}>
					<Button themeType="primary" onClick={() => setShowPopover(false)}>
						{t('incidentManagement:done_btn')}
					</Button>
				</div>
			</div>
		);
	}

	useEffect(() => {
		setCNCategoryValues({
			CNType   : CNCategoryValues?.CNType,
			CNValues : null,
			remarks  : null,
		});
	}, [CNCategoryValues?.CNType]);

	useEffect(() => {
		setCNCategoryValues({
			CNType   : CNCategoryValues?.CNType,
			CNValues : CNCategoryValues?.CNValues,
			remarks  : null,
		});
	}, [CNCategoryValues?.CNValues, CNCategoryValues?.CNType]);

	const rest = { onClickOutside: () => { setShowPopover(false); } };

	return (
		<div>
			<div>
				<ViewButton state={setShowTdsModal} />
			</div>
			{showTdsModal && (
				<Modal
					size="lg"
					show={showTdsModal}
					onClose={() => {
						setShowTdsModal(false);
					}}
				>
					<Modal.Header title={`${t('incidentManagement:request_credit_note')}
					 ${creditNoteNumber} - ${toTitleCase(businessName)}`}
					/>
					<Modal.Body className={styles.body_section}>
						{!isEditable && <ApproveAndReject row={row} />}
						{
							(!isEmpty(level1) || !isEmpty(level2) || !isEmpty(level3)) && (
								<StakeHolderTimeline timeline={stakeHolderTimeLineData({ level1, level2, level3 })} />
							)
						}

						<div className={styles.credit}>
							<div className={styles.button_container_data}>
								<Popover
									placement="bottom"
									visible={showPopover}
									render={<ShowContent />}
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
									style={{ paddingLeft: '12px' }}
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

						<div className={styles.flex}>

							<div className={styles.value_data}>
								<div className={styles.label_value}>
									{t('incidentManagement:shipment_id')}
								</div>
								<div className={styles.date_value}>
									#
									{jobNumber || '-'}
								</div>
							</div>
							<div className={styles.value_data}>
								<div className={styles.label_value}>
									{t('incidentManagement:incident_id_header')}
								</div>
								<div className={styles.date_value}>
									{referenceId || '-'}
								</div>
							</div>

							<div className={styles.value_data}>
								<div className={styles.label_value}>
									{t('incidentManagement:invoice_number')}
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
									{t('incidentManagement:sub_total')}
								</div>
								<div className={styles.date_value}>
									{formatAmount({
										amount  :	subTotal,
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
									{t('incidentManagement:tax_amount')}
								</div>
								<div className={styles.date_value}>
									{formatAmount({
										amount  :	taxAmount,
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
									{t('incidentManagement:grand_total')}
								</div>
								<div className={styles.date_value}>

									{formatAmount({
										amount  :	grandTotal,
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
							<div>{`${t('incidentManagement:remarks')} -`}</div>
							<div className={styles.remark_content}>
								{remark?.length > MAX_LEN ? (
									<Tooltip
										className={styles.tooltip}
										interactive
										content={remark || '-'}
									>
										<div className={styles.wrapper}>{ remark || '-'}</div>
									</Tooltip>
								) : remark || '-'}
							</div>
						</div>

						<div className={styles.document_flex}>
							<div className={styles.document}>{`${t('incidentManagement:doc')} -`}</div>
							{documentUrls?.map((url:any) => (url !== '' ? (
								<a href={url} target="_blank" rel="noreferrer" key={url}>
									<div className={styles.view_flex}>
										<div className={styles.view}>{t('incidentManagement:view_doc_link')}</div>
										<IcMEyeopen />
									</div>

								</a>
							) : (
								<div key={url}>
									{' '}
									{t('incidentManagement:no_doc_available')}
								</div>
							)))}

						</div>
						{lineItems?.length > 0 ? (
							<div className={styles.list_container}>
								<StyledTable
									columns={requestCreditNoteColumns({ t })}
									showPagination={false}
									data={lineItems}
								/>
							</div>
						) : (
							<div className={styles.line_item_empty}>
								{t('incidentManagement:no_line_items_available')}
							</div>
						)}
						{isEditable && (
							<>
								<div className={styles.remarks}>{`${t('incidentManagement:remarks')}*`}</div>

								<Textarea
									name="remark"
									size="md"
									placeholder={t('incidentManagement:remarks_placeholder')}
									onChange={(value: string) => setRemarks(value)}
									style={{ width: '700', height: '80px', marginBottom: '12px' }}
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
									disabled={!(remarks.length) || loading
										|| (isEmpty(creditNoteApprovalType)
										&& isEmpty(approvalType))}
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
									disabled={!(remarks.length) || loading || (isEmpty(creditNoteApprovalType)
										&& isEmpty(approvalType))}
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
export default RequestCN;
