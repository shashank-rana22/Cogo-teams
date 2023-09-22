import { Button, cl, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import usePostJobOpenRemark from '../../../../apisModal/usePostJobOpenRemark';
import STATUS_MAPPING from '../../../../Constants/status_mapping';
import useGetShipmentCostSheet from '../../../../hooks/useGetShipmentCostSheet';
import { getFormatAmount } from '../../../../utils/getformatamount';

import StatRect from './StatRect';
import styles from './styles.module.css';

const JOB_SOURCE = 'LOGISTICS';

function Details({ row = {}, setDetailsModal = () => {} }) {
	const shipmentId = row?.data?.jobOpenRequest?.id;
	const { jobNumber = '' } = row?.data?.jobOpenRequest || {};
	const JOB_TYPE = row?.source.toUpperCase();
	const [remarks, setRemarks] = useState('');
	const { id = '', status = '' } = row || {};
	const { onSubmit = () => {}, loading = false } = usePostJobOpenRemark({
		setShowModal: setDetailsModal,
		id,
		remarks,
	});
	const {
		preTaxData,
		postTaxData,
		preTaxLoading,
		postTaxLoading,
	} = useGetShipmentCostSheet({ shipmentId, jobNumber, JOB_SOURCE, JOB_TYPE });
	const { tentativeProfit: postTaxActual, quotationalProfit: postTaxExpected } = postTaxData || {};
	const { tentativeProfit: preTaxActual, quotationalProfit: preTaxExpected } = preTaxData || {};

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
					{row?.data?.jobOpenRequest?.jobNumber || ''}
				</div>
			</div>

			<div className={styles.buy_sell_div}>
				<div>
					<div className={styles.heading}>Estimated Sell</div>
					<div className={styles.text}>
						{getFormatAmount(row?.data?.jobOpenRequest?.estimatedSell)}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Operational Sell</div>
					<div className={styles.text}>
						{getFormatAmount(row?.data?.jobOpenRequest?.totalSell)}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Estimated Buy</div>
					<div className={styles.text}>
						{getFormatAmount(row?.data?.jobOpenRequest?.estimatedBuy)}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Operational Buy</div>
					<div className={styles.text}>
						{getFormatAmount(row?.data?.jobOpenRequest?.totalBuy)}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Profit Margin</div>
					<div className={styles.text}>
						{getFormatAmount(row?.data?.jobOpenRequest?.profitMargin)}
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
