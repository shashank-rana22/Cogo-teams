import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowNext, IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetShipmentCostSheet from '../../../../hooks/useGetShipmentCostSheet';

import { CardBody } from './Card/CardBody';
import CardHeader from './Card/CardHeader';
import DiscountRect from './DiscountRect';
import styles from './styles.module.css';

const ARRAY_SPLIT = 4;

function CostSheet({ row = {} }) {
	const shipmentId = row?.data?.jobOpenRequest?.id;
	const { jobNumber = '' } = row?.data?.jobOpenRequest || {};
	const JOB_TYPE = row?.source.toUpperCase();
	const JOB_SOURCE = 'LOGISTICS';
	const [open, setOpen] = useState(false);
	const {
		selldata,
		buydata,
		apiloading,
		sellData,
		buyData,
	} = useGetShipmentCostSheet({ shipmentId, jobNumber, JOB_SOURCE, JOB_TYPE });
	const { totalActual: buyTotal } = buyData || {};
	const { totalActual: sellTotal } = sellData || {};
	return (
		<div className={styles.container}>
			<div
				className={styles.data_container}
				onClick={() => {
					setOpen(((prev) => (!prev)));
				}}
				role="presentation"
			>
				Cost Sheet
				<div className={styles.dropdown_container}>
					{open ? (
						<IcMArrowRotateUp width={15} height={15} />
					) : (
						<IcMArrowRotateDown width={15} height={15} />
					)}
				</div>
			</div>
			{open && (
				<>
					<div className={styles.flexresponsive}>
						<div className={styles.displayflex}>
							<DiscountRect
								heading={<span className={styles.legends}>Legends</span>}
								statlabel={(
									<span className={styles.displayflex}>
										Loss
										{' '}
										<span className={styles.lossicon}>
											<IcMArrowNext height={20} width={20} />
										</span>
									</span>
								)}
								statvalue={(
									<span className={styles.displayflex}>
										Profit
										{' '}
										<span className={styles.profiticon}>
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
						&& [...Array(ARRAY_SPLIT)].map((val) => (
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
							<div className={styles.quotation_value}>
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
						&& [...Array(ARRAY_SPLIT)].map((val) => (
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
				</>
			)}
		</div>
	);
}

export default CostSheet;
