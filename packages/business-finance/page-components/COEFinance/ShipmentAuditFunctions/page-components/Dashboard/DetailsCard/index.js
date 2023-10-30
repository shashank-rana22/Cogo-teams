import formatAmount from '@cogoport/globalization/utils/formatAmount';
import {
	IcMArrowRotateDown,
	IcMArrowRotateUp,
} from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import useGetShipmentSummary from '../../../../hook/useGetShipmentSummary';
import GetPill from '../../../commons/getPill';

import Details from './Details';
import styles from './styles.module.css';

function DetailsCard({
	onTabClick = () => {},
	dataList = {},
	shipmentDetailsTab = false,
	loadingShipment = false,
}) {
	const arrowElement = shipmentDetailsTab ? <IcMArrowRotateUp height="17px" width="17px" />
		: <IcMArrowRotateDown height="17px" width="17px" />;

	const shipmentId = dataList?.id || '';

	const { query: { job_id: jobId = '' } } = useRouter();

	const currency = window.sessionStorage.getItem('currency');

	const { data: summary = {}, loading: summaryLoading = false } = useGetShipmentSummary({ jobId });

	const {
		cogopointUtilizationAmount = '', kamMarginUtilizationAmount: kamMargin = '',
		organizationMargin: orgMargin = '', organizationPromocodesAmount = '', rdWalletUtilizationAmount: rdWallet = '',
	} = summary || {};

	const pointsAndPromocode = cogopointUtilizationAmount + organizationPromocodesAmount;

	const { source = '', trade_type: tradeType = '' } = dataList;

	const sourceText = source === 'direct' ? 'Sell Without Buy' : startCase(source);
	return (
		<div className={styles.card}>
			<div
				className={styles.card_upper}
				onClick={() => onTabClick({ tabName: 'shipmentDetailsTab' })}
				role="presentation"
			>
				<div className={styles.sub_container}>
					Details
					<div className={styles.tags_container}>
						<GetPill
							loading={loadingShipment}
							content={sourceText}
							color="blue"
						/>
						<GetPill
							loading={loadingShipment}
							content={tradeType}
							color="yellow"
						/>
					</div>

					<div className={styles.wallet_amount_container}>
						<div className={styles.specific_wallet_container}>
							<div>KAM Margin</div>
							<GetPill
								color="green"
								loading={summaryLoading}
								content={formatAmount({
									amount  : kamMargin,
									currency,
									options : {
										currencyDisplay : 'code',
										style           : 'currency',
									},
								})}
							/>
						</div>

						<div className={styles.specific_wallet_container}>
							<div>RD Wallet</div>
							<GetPill
								color="green"
								loading={summaryLoading}
								content={formatAmount({
									amount  : rdWallet,
									currency,
									options : {
										currencyDisplay : 'code',
										style           : 'currency',
									},
								})}
							/>
						</div>

						<div className={styles.specific_wallet_container}>
							<div>ORG Margin</div>
							<GetPill
								color="green"
								loading={summaryLoading}
								content={formatAmount({
									amount  : orgMargin,
									currency,
									options : {
										currencyDisplay : 'code',
										style           : 'currency',
									},
								})}
							/>
						</div>

						<div className={styles.specific_wallet_container}>
							<div>Points & Promocode</div>
							<GetPill
								color="green"
								loading={summaryLoading}
								content={pointsAndPromocode}
							/>
						</div>

					</div>

				</div>
				<div
					className={styles.caret}
					role="presentation"
				>
					{arrowElement}
				</div>
			</div>

			{shipmentDetailsTab && (
				<div className={styles.shipment_container_section}>
					<div className={styles.details}>
						<Details
							dataList={dataList}
							shipmentId={shipmentId}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default DetailsCard;
