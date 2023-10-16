import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import {
	IcMArrowRotateDown,
	IcMArrowRotateUp,
} from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import useGetShipmentSummary from '../../../../hook/useGetShipmentSummary';
import useGetWallet from '../../../../hook/useGetWallet.ts';
import GetPill from '../../../commons/getPill';

import Details from './Details';
import styles from './styles.module.css';

const DEFAULT_AMOUNT = 0;

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

	const { data: summary = {}, loading: summaryLoading } = useGetShipmentSummary({ jobId });

	const {
		cogopointUtilizationAmount = '', kamMarginUtilizationAmount: kamMargin = '',
		organizationMargin: orgMargin = '', organizationPromocodesAmount = '', rdWalletUtilizationAmount: rdWallet = '',
	} = summary || {};

	const pointsAndPromocode = cogopointUtilizationAmount + organizationPromocodesAmount;

	const { data: dataWallet } = useGetWallet(shipmentId);
	const {
		agent_data: agentData = {},
		agent_role_data: agentRoleData = {},
		amount = '',
		amount_currency: amountCurrency = '',
	} = dataWallet?.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

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
							<div>Points & Promocde</div>
							<GetPill
								color="green"
								loading={summaryLoading}
								content={pointsAndPromocode}
							/>
						</div>

					</div>

					{dataWallet?.list?.[GLOBAL_CONSTANTS.zeroth_index] && (
						<div className={styles.data}>
							<div className={styles.kam_data}>KAM -</div>
							<div>
								{agentData?.name || ''}
								(
								{agentRoleData?.name || ''}
								)
							</div>
							<div className={styles.kam_data}>Wallet Usage - </div>
							<div>
								{amountCurrency || ''}

								{amount || DEFAULT_AMOUNT}
							</div>
						</div>
					)}
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
