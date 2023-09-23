import { Button, cl, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';

import usePostJobOpenRemark from '../../../../apisModal/usePostJobOpenRemark';
import SHIPMENT_MAPPING from '../../../../Constants/SHIPMENT_MAPPING';
import STATUS_MAPPING from '../../../../Constants/status_mapping';
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
}) {
	const { query } = useRouter();
	const { partner_id } = query || {};
	const [remarks, setRemarks] = useState('');
	const { id = '', status = '' } = row || {};
	const { onSubmit = () => {}, loading = false } = usePostJobOpenRemark({
		setShowModal: setDetailsModal,
		id,
		remarks,
		refetch,
	});
	const { tentativeProfit: postTaxActual, quotationalProfit: postTaxExpected } = postTaxData || {};
	const { tentativeProfit: preTaxActual, quotationalProfit: preTaxExpected } = preTaxData || {};
	const details = row?.data?.jobOpenRequest || {};
	const { currency = '' } = details || {};
	return (
		<div className={styles.container}>
			<div className={styles.display_box}>
				<div className={styles.company_div}>
					<div className={styles.heading}>Company Name</div>
					<div className={styles.text}>{row?.data?.organization?.businessName || ''}</div>
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
						href={details?.jobNumber}
						onClick={(event) => {
							openPDF({
								event,
								partnerId    : partner_id,
								id           : details?.id,
								incidentType : SHIPMENT_MAPPING[row?.incidentSubtype],
							});
						}}
					>
						{details?.jobNumber || ''}
					</a>
				</div>
			</div>

			<div className={styles.buy_sell_div}>
				<div>
					<div className={styles.heading}>Estimated Sell</div>
					<div className={styles.text}>
						{getFormatAmount(details?.estimatedSell, currency)}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Operational Sell</div>
					<div className={styles.text}>
						{getFormatAmount(details?.totalSell, currency)}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Estimated Buy</div>
					<div className={styles.text}>
						{getFormatAmount(details?.estimatedBuy, currency)}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Operational Buy</div>
					<div className={styles.text}>
						{getFormatAmount(details?.totalBuy, currency)}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Profit Margin</div>
					<div className={styles.text}>
						{getFormatAmount(details?.profitMargin, currency)}
					</div>
				</div>
			</div>
			{ status === 'REQUESTED' ? (
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
							onClick={() => onSubmit(STATUS_MAPPING.rejected)}
						>
							Reject
						</Button>

						<Button
							size="md"
							themeType="primary"
							disabled={isEmpty(remarks) || loading}
							loading={loading}
							onClick={() => { onSubmit(STATUS_MAPPING.approved); }}
						>
							Approve
						</Button>
					</div>

				</div>
			) : null }

		</div>
	);
}

export default Details;
