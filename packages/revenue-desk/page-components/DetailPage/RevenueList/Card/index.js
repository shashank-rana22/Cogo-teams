import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function Card({ item }) {
	return (
		<div className={styles.container}>
			<div className={styles.header_section}>
				<div>
					<div>
						SID:
						{item?.serial_id}
					</div>
					<div>
						Created At:
						{' '}
						{format(item?.created_at, 'dd MMM YYYY')}
					</div>
				</div>
				{item?.contract_reference_id
					? (
						<div>
							Contract Id:
							{
                        item?.contract_reference_id
                    }
						</div>
					)
					: null}
			</div>
			<div className={styles.body_section}>
				<div>
					{item?.shipping_line_id?.short_name}
				</div>
				<div>
					{formatAmount({
						amount   : item?.buy_price || 0,
						currency : item?.buy_price_currency || 'INR',
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>
			<div className={styles.footer_section}>
				<div>
					Procured By :
					{' '}
					{item?.procured_by_id?.name}
				</div>
				<div className={item?.profit_or_loss >= 0 ? styles.positive_profit : styles.negative_profit}>
					{formatAmount({
						amount   : item?.profit_or_loss || 0,
						currency : item?.buy_price_currency || 'INR',
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
					{item?.profit_or_loss > 0 ? 'Profit' : 'Loss'}
				</div>
			</div>
		</div>
	);
}
export default Card;
