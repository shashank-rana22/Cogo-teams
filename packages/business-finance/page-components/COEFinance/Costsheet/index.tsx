import { Loader, Button, Pill, Accordion, Placeholder } from '@cogoport/components';
import { IcADocumentTemplates, IcMArrowNext } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { GenericObject } from '../../commons/Interfaces';
import getFormattedPrice from '../../commons/utils/getFormattedPrice';
import Details from '../All_Invoices/ViewInvoices/ShipmentDetails/Details';
import Documents from '../All_Invoices/ViewInvoices/ShipmentDetails/Documents';
import useGetShipmentCostSheet from '../hook/useGetShipmentCostSheet';
import useGetWallet from '../hook/useGetWallet';
import useListShipment from '../hook/useListShipment';
import useUpdateJob from '../hook/useUpdateJob';

import { CardBody } from './Card/CardBody';
import CardHeader from './Card/CardHeader';
import DiscountRect from './DiscountRect';
import Line from './Line';
import StatRect from './StatRect';
import styles from './styles.module.css';

function CostSheet() {
	const Router = useRouter();
	const { query } = Router || {};
	const { shipmentId, jobNumber, orgId, IsJobClose } = query || {};
	const getStatus = () => {
		if (IsJobClose === 'OPEN') {
			return false;
		}
		if (IsJobClose === 'OPR_CLOSED') {
			return true;
		}
		return false;
	};

	const [showButton, setShowButton] = useState(getStatus());
	const [showFinal, setShowFinal] = useState(IsJobClose === 'CLOSED' || false);
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
	const { tentativeProfit: preTaxActual, quotationalProfit: preTaxExpected } = preTaxData || {};
	const { tentativeProfit: postTaxActual, quotationalProfit: postTaxExpected } = postTaxData || {};
	const { data: shipmentData, loading:loadingShipment } = useListShipment(jobNumber);
	const dataList = shipmentData?.list[0] || {};
	const { source, tradeType } = dataList;
	const sourceText = source === 'direct' ? 'Sell Without Buy' : startCase(source);
	const { data: dataWallet } = useGetWallet(shipmentId);
	const {
		agent_data:agentData, agent_role_data:agentRoleData,
		amount, amount_currency:amountCurrency,
	} = dataWallet?.list?.[0] || {};
	const { totalActual: buyTotal } = buyData || {};
	const { totalActual: sellTotal } = sellData || {};
	const { getData, getFinalData, FinalLoading, loading } = useUpdateJob({
		query,
		setShowButton,
		setShowFinal,
		showFinal,
		showButton,
	});
	const handleOperationalClose = (e: any) => {
		const data = e.target.innerText;
		getData(data);
	};

	const getPills = () => {
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
	};
	return (
		<div>
			<div className={styles.flex}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => {
						Router.push(
							`/business-finance/coe-finance/[active_tab]/[view]?jobNumber=${jobNumber}`,
							`/business-finance/coe-finance/all_invoices/shipment-view?jobNumber=${jobNumber}`,
						);
					}}
				>
					Go Back
				</Button>
				<div className={styles.flexwidth}>
					{showButton ? (
						<>
							<div>Status - </div>
							<div className={styles.tag}>Operationally Closed</div>
							<div
								className={styles.link}
								onClick={(e) => handleOperationalClose(e)}
								role="presentation"
							>
								Undo
							</div>
						</>
					) : (
						<Button
							size="md"
							themeType="primary"
							disabled={loading}
							onClick={(e) => handleOperationalClose(e)}
						>
							Close Operationally
						</Button>
					)}

					<Button
						size="md"
						themeType="primary"
						disabled={!showButton || FinalLoading || showFinal}
						onClick={() => {
							getFinalData();
						}}
					>
						{showFinal ? 'Financially Closed' : 'Close Financially'}
					</Button>
				</div>
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
					dataWallet?.list?.[0]
						? (
							<div className={styles.discount_data}>
								<div className={styles.kam_data}>KAM -</div>
								<div>
									{agentData?.name}
								&nbsp;(
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
        ) as unknown as string
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
				title={
        (
	<span className={styles.details}>
		Shipment Details
		<div className={styles.tags_container}>
			{getPills()}
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
        ) as unknown as string
        }
				style={{
					backgroundColor : '#FFFFFF',
					borderRadius    : '8px',
					margin          : '25px 0px',
				}}
			>
				<Details
					orgId={orgId}
					dataList={shipmentData?.list?.[0]}
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
						value={getFormattedPrice(sellTotal, 'INR') || '-'}
						loading={apiloading}
					/>
					<div className={styles.quotation_amount}>
						Quotation Total :
						<div className={styles.value_text}>
							{sellData?.totalQuotational
								? getFormattedPrice(sellData?.totalQuotational, 'INR')
								: '  --' || '-'}
						</div>
					</div>
					{apiloading
            && [1, 2, 3, 4].map(() => (
	<Placeholder margin="20px" width="96%" height="220px" />
            ))}
					{!apiloading
            && selldata.map((charge: GenericObject) => (
	<CardBody charge={charge} type="sell" />
            ))}
				</div>
				<div className={styles.width}>
					<CardHeader
						header="Buy"
						value={getFormattedPrice(buyTotal, 'INR') || '-'}
						loading={apiloading}
					/>
					<div className={styles.quotation_amount}>
						Quotation Total :
						<div className={styles.value_text}>
							{buyData?.totalQuotational
								? getFormattedPrice(buyData?.totalQuotational, 'INR')
								: '  --' || '-'}
						</div>
					</div>
					{apiloading
            && [1, 2, 3, 4].map(() => (
	<Placeholder margin="20px" width="96%" height="220px" />
            ))}
					{!apiloading
            && buydata.map((charge: GenericObject) => (
	<CardBody charge={charge} type="buy" />
            ))}
				</div>
			</div>
		</div>
	);
}
export default CostSheet;
