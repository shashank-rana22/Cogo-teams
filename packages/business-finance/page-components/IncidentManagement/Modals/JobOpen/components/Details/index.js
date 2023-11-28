import { Button, cl, Textarea, Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';

import usePostJobOpenRemark from '../../../../apisModal/usePostJobOpenRemark';
import ApproveModal from '../../../../common/ApproveModal';
import RejectModal from '../../../../common/RejectModal';
import SHIPMENT_MAPPING from '../../../../Constants/SHIPMENT_MAPPING';
import { getFormatAmount } from '../../../../utils/getformatamount';

import StatRect from './StatRect';
import styles from './styles.module.css';

function openPDF({ event, partnerId, id, incidentType }) {
	event.preventDefault();
	window.open(`/v2/${partnerId}/booking/${incidentType}/${id}`, '_blank');
}

function Details({
	row = {},
	setDetailsModal = () => {},
	refetch = () => {},
	preTaxData = {},
	postTaxData = {},
	preTaxLoading = false,
	postTaxLoading = false,
	jobData = {},
}) {
	const { query } = useRouter();
	const { partner_id } = query || {};
	const [remarks, setRemarks] = useState('');
	const { id = '', status = '' } = row || {};
	const [showRejectModal, setShowRejectModal] = useState(false);
	const [showApproveModal, setShowApproveModal] = useState(false);
	const { onSubmit:onAction = () => {}, loading = false } = usePostJobOpenRemark({
		setDetailsModal,
		id,
		remarks,
		refetch,
	});
	const { tentativeProfit: postTaxActual, quotationalProfit: postTaxExpected } = postTaxData || {};
	const { tentativeProfit: preTaxActual, quotationalProfit: preTaxExpected } = preTaxData || {};
	const {
		buyCurrency = '',
		sellCurrency = '',
		jobNumber = '',
		id: jobOpenId = '',
	} = row?.data?.jobOpenRequest || {};
	const { tradePartyName = '', businessName = '' } = row?.data?.organization || {};

	const {
		income = 0,
		expense = 0,
		buyQuotationPostTax = 0,
		sellQuotationPostTax = 0,
	} = jobData || {};

	const jobProfitMargin = Number(income || 0) - Number(expense || 0);

	return (
		<div className={styles.container}>
			<div className={styles.display_box}>
				<div className={styles.company_div}>
					<div className={styles.heading}>Company Name</div>
					<div className={styles.text}>
						<div className={styles.tooltip_title}>
							<Tooltip
								interactive
								content={(tradePartyName || businessName || '')}
							>
								<div>{(tradePartyName || businessName || '')}</div>
							</Tooltip>
						</div>
					</div>
				</div>
				<div>
					<div className={styles.heading}>Requested By</div>
					<div className={styles.text}>{row?.createdBy?.name || ''}</div>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.profit_container}>
				<StatRect
					heading="Profit on Shipment - Pre Tax"
					expected={preTaxExpected}
					actual={preTaxActual}
					loading={preTaxLoading}
				/>
				<div className={styles.post_tax_container}>
					<StatRect
						heading="Profit on Shipment - Post Tax"
						expected={postTaxExpected}
						actual={postTaxActual}
						loading={postTaxLoading}
					/>
				</div>
			</div>
			<div className={styles.shipment_container}>
				<div className={styles.heading}>Shipment Id</div>
				<div className={styles.shipment_id}>
					#
					<a
						href={jobNumber}
						onClick={(event) => {
							openPDF({
								event,
								partnerId    : partner_id,
								id           : jobOpenId,
								incidentType : SHIPMENT_MAPPING[row?.incidentSubtype],
							});
						}}
					>
						{jobNumber || ''}
					</a>
				</div>
			</div>

			<div className={styles.buy_sell_div}>
				<div>
					<div className={styles.heading}>Estimated Sell</div>
					<div className={styles.text}>
						{getFormatAmount(sellQuotationPostTax, sellCurrency)}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Operational Sell</div>
					<div className={styles.text}>
						{getFormatAmount(income, 'INR')}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Estimated Buy</div>
					<div className={styles.text}>
						{getFormatAmount(buyQuotationPostTax, buyCurrency)}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Operational Buy</div>
					<div className={styles.text}>
						{getFormatAmount(expense, 'INR')}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Profit Margin</div>
					<div className={styles.text}>
						{getFormatAmount(jobProfitMargin, sellCurrency)}
					</div>
				</div>
			</div>
			{status === 'REQUESTED' ? (
				<div>
					<div className={cl`${styles.label} 
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
							onClick={() => setShowApproveModal(true)}
						>
							Approve
						</Button>
					</div>
					{showRejectModal
						? (
							<RejectModal
								setShowRejectModal={setShowRejectModal}
								onAction={onAction}
								showRejectModal={showRejectModal}
								loading={loading}
							/>
						) : null}
					{showApproveModal
						? (

							<ApproveModal
								setShowApproveModal={setShowApproveModal}
								onAction={onAction}
								showApproveModal={showApproveModal}
								loading={loading}
							/>
						) : null}

				</div>
			) : null}

		</div>
	);
}

export default Details;
