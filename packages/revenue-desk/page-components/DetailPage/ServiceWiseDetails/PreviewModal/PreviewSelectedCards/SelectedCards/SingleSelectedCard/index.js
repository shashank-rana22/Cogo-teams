import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function SingleSelectedCard({ data, shipmentType, priority }) {
	const showData = (val) => val || '';
	return (
		<div className={Number(data?.rowData?.profit_percentage) > 0
			? styles.positive_profit_container : styles.negative_profit_container}
		>
			<div className={styles.left_section_container}>
				{priority}
				.
			</div>
			<div className={styles.right_section_container}>
				<div className={styles.upper_section}>
					<div className={styles.upper_left_section}>
						<div className={styles.service_provider_heading}>
							{showData(data?.rowData?.service_provider?.business_name)}
						</div>
						<div>
							{shipmentType === 'air_freight'
								? showData(data?.rowData?.air_line)
								: showData(data?.rowData?.shipping_line)}
						</div>
					</div>
					{/* <div className={styles.upper_right_section}>
						<div className={styles.tag}>
							KAM Selected Rate
						</div>
					</div> */}
				</div>
				<div className={styles.lower_section}>
					{/* <div className={styles.lower_left_section}>
						KAM Discount Applied :
						<div className={styles.price}>
							USD 10
						</div>
					</div> */}
					<div className={styles.lower_right_section}>
						<div className={styles.label}>
							Profitability : &nbsp;
							<div className={Number(data?.rowData?.profit_percentage) > 0
								? styles.positive_profit : styles.negative_profit}
							>
								{Number(data?.rowData?.profit_percentage).toFixed(2)}
								%
							</div>
						</div>
						<div className={styles.label}>
							Total Buy Price :
							<div className={styles.total_price_text}>
								{formatAmount({
									amount   : data?.rowData?.total_buy_price,
									currency : data?.rowData?.total_buy_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})}
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
}

export default SingleSelectedCard;
