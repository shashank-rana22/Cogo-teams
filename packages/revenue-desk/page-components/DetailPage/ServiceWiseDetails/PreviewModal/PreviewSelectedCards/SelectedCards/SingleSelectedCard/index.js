import { IcMProfile } from '@cogoport/icons-react';

import styles from './styles.module.css';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

function SingleSelectedCard({ data, index, price, shipmentType }) {
	const showData = (val) => val || '';
	let profitability = 0;
	if (data?.rowData?.total_buy_price !== 0) {
		profitability = (Number(parseFloat(price?.replace(/[^0-9.-]+/g, ''))) - Number(data?.rowData?.total_buy_price))
		/ Number(data?.rowData?.total_buy_price);
	}
	let netTotalBuyPrice=Number(data?.rowData?.total_buy_price);
	if(data?.rowData?.origin_locals_price ){
		netTotalBuyPrice+=Number(data?.rowData?.origin_locals_price)
	}
	if(data?.rowData?.destination_locals_price ){
		netTotalBuyPrice+=Number(data?.rowData?.destination_locals_price)
	}
	return (
		<div className={styles.container}>
			<div className={styles.left_section_container}>
				{index + 1}
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
					<div className={styles.upper_right_section}>
						<div className={styles.tag}>
							KAM Selected Rate
						</div>
					</div>
				</div>
				<div className={styles.lower_section}>
					<div className={styles.lower_left_section}>
						KAM Discount Applied :
						<div className={styles.price}>
							USD 10
						</div>
					</div>
					<div className={styles.lower_right_section}>
						<div className={styles.label}>
								Profitability :
								<div className={Number(profitability)>0 ? styles.positive_profit : styles.negative_profit }>
									{(Number(profitability)*100).toFixed(2)}%
								</div>
						</div>
						<div className={styles.label}>
								Total Buy Price :
								<div className={styles.total_price_text}>
									{formatAmount({
												amount   :netTotalBuyPrice,
												currency :data?.rowData?.total_buy_currency,
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
