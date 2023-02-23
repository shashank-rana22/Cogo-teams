import { Tooltip, Select, Popover, Textarea, Modal, Button } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useGetTdsData from '../../apisModal/useGetTdsData';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import { CATEGORY_OPTIONS, NON_REVENUE_DATA, NON_REVENUE_OPTIONS, REVENUE_OPTIONS } from './credit-note-config';
import styles from './style.module.css';

function RequestCN({ id, refetch, row, isEditable = true, status = '' }) {
	const [showTdsModal, setShowTdsModal] = useState(false);
	const [CNCategoryValues, setCNCategoryValues] = useState({
		CNType   : null,
		CNValues : null,
		remarks  : null,
	});

	const [shoPopover, setShowPopover] = useState(false);
	const [remarks, setRemarks] = useState('');
	const { data = {} } = row || {};
	const { creditNoteRequest, consolidatedCreditNoteRequest, organization } = data;
	const {
		invoiceNumber,
		jobNumber,
		subTotal,
		taxAmount,
		grandTotal,
		creditNoteNumber,
		invoiceId,
		remark,
		creditNoteType,
		creditNoteRemarks,
		currency,
		documentUrls,
	} = creditNoteRequest || consolidatedCreditNoteRequest || {};

	const { useOnAction:OnAction, loading } = useGetTdsData({
		refetch,
		setShowTdsModal,
		id,
		row,
		remark,
		CNCategoryValues,
	});

	const { businessName } = organization || {};

	const RevenueImpacting =	CNCategoryValues?.CNType === 'REVENUE_IMPACTING'
	|| creditNoteType === 'REVENUE_IMPACTING';
	const NonRevenueImpacting =	CNCategoryValues?.CNType === 'NON_REVENUE_IMPACTING'
	|| creditNoteType === 'NON_REVENUE_IMPACTING';

	const content = () => (
		<div className={styles.container}>
			<div>
				<div className={styles.texts}>CN Category Type*</div>
				<div className={styles.select_container}>
					<Select
						className="primary md"
						placeholder="CN Category Type.."
						value={creditNoteType || CNCategoryValues?.CNType}
						disabled={!isEditable}
						onChange={(e:any) => setCNCategoryValues({ ...CNCategoryValues, CNType: e })}
						options={CATEGORY_OPTIONS}
					/>
				</div>
			</div>
			{(CNCategoryValues?.CNType
				|| status === 'APPROVED'
				|| status === 'REJECTED') && (
					<div>
						{RevenueImpacting && <div className={styles.texts}>Revenue Impacting*</div>}
						{NonRevenueImpacting && <div className={styles.texts}>Non-Revenue Impacting*</div>}
						<div className={styles.select_container}>
							{RevenueImpacting && (
								<Select
									className="primary md"
									placeholder="Type here..."
									value={creditNoteRemarks || CNCategoryValues?.CNValues}
									disabled={!isEditable}
									onChange={(e) => setCNCategoryValues({ ...CNCategoryValues, CNValues: e })}
									options={
									creditNoteRemarks
										? [
											...REVENUE_OPTIONS,
											{ label: creditNoteRemarks, value: creditNoteRemarks },
										]
										: REVENUE_OPTIONS
								}
								/>
							)}
							{NonRevenueImpacting && (
								<Select
									className="primary md"
									placeholder="Type here..."
									value={
									NON_REVENUE_DATA.includes(creditNoteRemarks)
										? creditNoteRemarks
										: creditNoteRemarks || CNCategoryValues?.CNValues
								}
									disabled={!isEditable}
									onChange={(e) => setCNCategoryValues({ ...CNCategoryValues, CNValues: e })}
									options={
									creditNoteRemarks
										? [
											...NON_REVENUE_OPTIONS,
											{ label: creditNoteRemarks, value: creditNoteRemarks },
										]
										: NON_REVENUE_OPTIONS
								}
								/>
							)}
						</div>
					</div>
			)}
			{(CNCategoryValues?.CNValues === 'revenueOthers'
				|| CNCategoryValues?.CNValues === 'nonRevenueOthers') && (
					<div>
						<div className={styles.texts}>Remark</div>

						<Textarea
							value={CNCategoryValues?.remarks}
							disabled={!isEditable}
							onChange={(e:any) => setCNCategoryValues({
								...CNCategoryValues,
								remarks: e,
							})}
							placeholder="Remark here ...."
						/>

					</div>
			)}
			<div className={styles.button_container}>
				<Button themeType="primary" onClick={() => setShowPopover(false)}>
					Done
				</Button>
			</div>
		</div>
	);

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
					<Modal.Header title={`Request Credit Note - ${creditNoteNumber} - ${startCase(businessName)}`} />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}
						<div className={styles.flex}>

							<div className={styles.value_data}>
								<div className={styles.label_value}>
									Shipment ID
								</div>
								<div className={styles.date_value}>
									#
									{jobNumber || '-'}
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
									TaxAmount
								</div>
								<div className={styles.date_value}>
									{getFormattedPrice(taxAmount, currency) || '-'}
								</div>
							</div>

							<div className={styles.value_data}>
								<div className={styles.label_value}>
									SubTotal
								</div>
								<div className={styles.date_value}>
									{getFormattedPrice(subTotal, currency) || '-'}
								</div>
							</div>

							<div className={styles.value_data}>
								<div className={styles.label_value}>
									GrandTotal
								</div>
								<div className={styles.date_value}>
									{getFormattedPrice(grandTotal, currency) || '-'}
								</div>
							</div>
							<Popover
								placement="bottom"
								visible={shoPopover}
								render={content()}
							>
								<Button
									themeType="secondary"
									onClick={() => setShowPopover(!shoPopover)}
								>
									<div className={styles.flex}>
										CN Category
										<div className={styles.icon_container}>
											{shoPopover ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
										</div>
									</div>
								</Button>
							</Popover>

						</div>

						<div className={styles.document_flex}>
							<div className={styles.document}>Remarks -</div>
							{remark.length > 40 ? (
								<Tooltip
									className={styles.tooltip}
									interactive
									content={remark || '-'}
								>
									<div className={styles.wrapper}>{ remark || '-'}</div>
								</Tooltip>
							) : remark || '-'}
						</div>

						<div className={styles.document_flex}>
							<div className={styles.document}>Document -</div>
							{documentUrls?.map((url:any) => (url !== '' ? (
								<a href={url} target="_blank" rel="noreferrer">
									<div className={styles.view_flex}>
										<div className={styles.view}>View Document</div>
										<IcMEyeopen />
									</div>

								</a>
							) : (
								<div> No document available</div>
							)))}

						</div>
						{isEditable && (
							<>
								<div className={styles.remarks}>Remarks*</div>

								<Textarea
									name="remark"
									size="md"
									placeholder="Enter Remark Here..."
									onChange={(value: string) => setRemarks(value)}
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
									disabled={!(remarks.length) || loading}
									onClick={() => {
										OnAction('REJECTED');
									}}
								>
									Reject
								</Button>

								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={!(remarks.length) || loading}
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
export default RequestCN;
