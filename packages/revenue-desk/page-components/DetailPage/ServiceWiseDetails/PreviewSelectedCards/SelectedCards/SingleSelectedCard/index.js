import { IcMProfile } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SingleSelectedCard({ data, index, price, shipmentType }) {
	const showData = (val) => val || '';
	let profitability = 0;
	if (data?.rowData?.total_buy_price !== 0) {
		profitability = (Number(price?.split(' ')?.[1]) - Number(data?.rowData?.total_buy_price))
		/ Number(data?.rowData?.total_buy_price);
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
							<span style={{ fontSize: '18px', fontWeight: '500', color: '#849E4C' }}>
								{Number(profitability.toFixed(4))}
								%
							</span>
						</div>
						<div className={styles.label}>
							Total Buy Price :
							<span style={{ fontSize: '20px', fontWeight: '700', color: '#221F20' }}>
								{data?.rowData?.currency}
								{' '}
								{data?.rowData?.total_buy_price}
							</span>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
}

export default SingleSelectedCard;
