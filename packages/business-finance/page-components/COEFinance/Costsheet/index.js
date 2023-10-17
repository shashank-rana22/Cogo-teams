import { Loader, Button, Pill, Accordion, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcADocumentTemplates, IcMArrowNext } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import Details from '../All_Invoices/ViewInvoices/ShipmentDetails/Details';
import Documents from '../All_Invoices/ViewInvoices/ShipmentDetails/Documents';
import useGetShipmentCostSheet from '../hook/useGetShipmentCostSheet';
import useGetWallet from '../hook/useGetWallet';
import useListShipment from '../hook/useListShipment';

import { CardBody } from './Card/CardBody';
import CardHeader from './Card/CardHeader';
import DiscountRect from './DiscountRect';
import Line from './Line';
import StatRect from './StatRect';
import styles from './styles.module.css';

function GetPills({ loadingShipment, sourceText, tradeType }) {
	if (loadingShipment) {
		return <Placeholder height="20px" width="80px" />;
	}
	if (sourceText) {
		return <Pill color="blue">{sourceText}</Pill>;
	}
	if (tradeType) {
		return <Pill color="yellow">{startCase(tradeType)}</Pill>;
	}
	return <div>No Data Found</div>;
}

function CostSheet() {
	const Router = useRouter();
	const { query } = Router || {};
	const { shipmentId, jobNumber } = query || {};

	const {
		selldata,
		buydata,
		apiloading,
		preTaxData,
		postTaxData,
		preTaxLoading,
		postTaxLoading,
		sellData,
		buyData,
	} = useGetShipmentCostSheet({ query });
	const { tentativeProfit: postTaxActual, quotationalProfit: postTaxExpected } = postTaxData || {};
	const { tentativeProfit: preTaxActual, quotationalProfit: preTaxExpected } = preTaxData || {};
	const { data: shipmentData, loading: loadingShipment } = useListShipment(jobNumber);
	const dataList = shipmentData?.list[GLOBAL_CONSTANTS.zeroth_index] || {};
	const { source, tradeType } = dataList;
	const sourceText = source === 'direct' ? 'Sell Without Buy' : startCase(source);
	const { data: dataWallet } = useGetWallet(shipmentId);
	const {
		agent_data: agentData, agent_role_data: agentRoleData,
		amount, amount_currency: amountCurrency,
	} = dataWallet?.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};
	const { totalActual: buyTotal } = buyData || {};
	const { totalActual: sellTotal } = sellData || {};

	return (
		<div>
			<div className={styles.flex}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => {
						Router.back();
					}}
				>
					Go Back
				</Button>
			</div>
			<Line margin="20px 0px 0px 0px" />
			<div className={styles.heading}>Profitability</div>
			<Line width="60px" color="#F68B21" margin="5px 0px 0px 0px" />
			<div className={styles.statscontainer}>
				<StatRect
					heading="Profit on Shipment - Pre Tax"
					expected={preTaxExpected}
					actual={preTaxActual}
					loading={preTaxLoading}
				/>
				<StatRect
					heading="Profit on Shipment - Post Tax"
					expected={postTaxExpected}
					actual={postTaxActual}
					loading={postTaxLoading}
				/>
			</div>
			<DiscountRect
				heading="Discount Applied"
				statvalue={
					dataWallet?.list?.[GLOBAL_CONSTANTS.zeroth_index]
						? (
							<div className={styles.discount_data}>
								<div className={styles.kam_data}>KAM -</div>
								<div>
									{agentData?.name}
									(
									{agentRoleData?.name}
									)
								</div>
								<div className={styles.kam_data}>Wallet Usage - </div>
								<div>
									{amountCurrency || 'USD'}
									{' '}
									{amount || 0}
								</div>
							</div>
						) : null
				}
				statlabel="Revenue Desk - "
			/>
			<Accordion
				type="text"
				title={
					(
						<span className={styles.label}>
							Shipment Documents
							<span className={styles.icon}>
								<IcADocumentTemplates />
							</span>
							{loadingShipment && <Loader />}
						</span>
				)
				}
				style={{
					backgroundColor : '#FFFFFF',
					borderRadius    : '8px',
					margin          : '25px 0px',
				}}
			>
				<Documents shipmentId={shipmentId} />
			</Accordion>
			<Accordion
				type="text"
				title={(
					<span className={styles.details}>
						Shipment Details
						<div className={styles.tags_container}>
							{GetPills({ loadingShipment, sourceText, tradeType })}
						</div>

						<div className={styles.sid}>
							{' '}
							SID
							{' '}
							<div className={styles.job}>
								#
								{jobNumber}
							</div>

						</div>

					</span>
				)}
				style={{
					backgroundColor : '#FFFFFF',
					borderRadius    : '8px',
					margin          : '25px 0px',
				}}
			>
				<Details
					dataList={shipmentData?.list?.[GLOBAL_CONSTANTS.zeroth_index]}
					shipmentId={shipmentId}
				/>

			</Accordion>
			<div className={styles.heading}>Cost Sheet</div>
			<Line width="60px" color="#F68B21" margin="5px 0px 0px 0px" />
			<div className={styles.flexresponsive}>
				<div className={styles.displayflex}>
					<DiscountRect
						heading={<span className={styles.legends}>Legends</span>}
						statlabel={(
							<span className={styles.displayflex}>
								Profit
								{' '}
								<span className={styles.profiticon}>
									<IcMArrowNext height={20} width={20} />
								</span>
							</span>
						)}
						statvalue={(
							<span className={styles.displayflex}>
								Loss
								{' '}
								<span className={styles.lossicon}>
									<IcMArrowNext height={20} width={20} />
								</span>
							</span>
						)}
						marginTop="15px"
						width="320px"
						headingwidth="90px"
					/>
				</div>
			</div>
			<div className={styles.flex}>
				<div className={styles.width}>
					<CardHeader
						header="Sell"
						value={formatAmount({
							amount   : sellTotal,
							currency : GLOBAL_CONSTANTS.currency_code.INR,
							options  : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						}) || '-'}
						loading={apiloading}
					/>
					<div className={styles.quotation_amount}>
						<div className={styles.credit}>
							Credit Note :
							<div className={styles.value_text}>
								{sellData?.totalCreditNoteActual
									? formatAmount({
										amount   : sellData?.totalCreditNoteActual,
										currency : GLOBAL_CONSTANTS.currency_code.INR,
										options  : {
											style           : 'currency',
											currencyDisplay : 'code',
										},
									})
									: '  --'}
							</div>
						</div>
						<div className={styles.credit}>
							Quotation Total :
							<div className={styles.value_text}>
								{(sellData?.totalQuotational && sellData?.currencyQuotational)
									? formatAmount({
										amount   : sellData?.totalQuotational,
										currency : sellData?.currencyQuotational,
										options  : {
											style           : 'currency',
											currencyDisplay : 'code',
										},
									})
									: '  --'}
							</div>
						</div>
					</div>
					{apiloading
						&& [1, 2, 3, 4].map((val) => (
							<Placeholder key={val} margin="20px" width="96%" height="220px" />
						))}
					{!apiloading
						&& selldata.map((charge) => (
							<CardBody charge={charge} key={charge?.service_type} type="sell" />
						))}
				</div>
				<div className={styles.width}>
					<CardHeader
						header="Buy"
						value={formatAmount({
							amount   : buyTotal,
							currency : GLOBAL_CONSTANTS.currency_code.INR,
							options  : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						}) || '-'}
						loading={apiloading}
					/>
					<div className={styles.quotation_amount}>
						<div className={styles.credit}>
							Credit Note :
							<div className={styles.value_text}>
								{buyData?.totalCreditNoteActual
									? formatAmount({
										amount   : buyData?.totalCreditNoteActual,
										currency : GLOBAL_CONSTANTS.currency_code.INR,
										options  : {
											style           : 'currency',
											currencyDisplay : 'code',
										},
									})
									: '  --'}
							</div>
						</div>
						<div className={styles.credit}>
							Quotation Total :
							<div className={styles.value_text}>
								{(buyData?.totalQuotational && buyData?.currencyQuotational)
									? formatAmount({
										amount   : buyData?.totalQuotational,
										currency : buyData?.currencyQuotational,
										options  : {
											style           : 'currency',
											currencyDisplay : 'code',
										},
									})
									: '  --'}
							</div>
						</div>
					</div>
					{apiloading
						&& [1, 2, 3, 4].map((val) => (
							<Placeholder key={val} margin="20px" width="96%" height="220px" />
						))}
					{!apiloading
						&& buydata.map((charge) => (
							<CardBody
								charge={charge}
								key={charge?.service_type}
								type="buy"
							/>
						))}
				</div>
			</div>
		</div>
	);
}
export default CostSheet;
