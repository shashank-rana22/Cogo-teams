import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowDoubleDown, IcMArrowDoubleUp } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import { VALUE_ZERO } from '../../../constants';

import styles from './styles.module.css';

function Card({ item }) {
	return (
		<div className={styles.container}>
			<div className={styles.header_section}>
				<div className={styles.title}>
					<div className={styles.serial_id}>
						SID :&nbsp;
						{item?.serial_id}
					</div>
					{item?.contract_reference_id
						? (
							<div>
								Contract Id :&nbsp;
								{
                        item?.contract_reference_id
                    }
							</div>
						)
						: null}
				</div>
				<div className={styles.created_at}>
					Created At:
					{' '}
					{format(item?.created_at, 'dd MMM YYYY')}
				</div>

			</div>
			<div className={styles.body_section}>
				<div className={styles.body_name}>

					<Tooltip content={item?.shipping_line_id?.business_name}>

						<div className={styles.detail_name}>
							{item?.shipping_line_id?.business_name}
						</div>
					</Tooltip>
				</div>
				<div className={styles.currency}>
					{formatAmount({
						amount   : item?.buy_price || VALUE_ZERO,
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
				<div className={styles.text}>
					Procured By :
					{' '}
					{item?.procured_by_id?.name}
				</div>
				<div className={styles.status}>
					{formatAmount({
						amount   : item?.profit_or_loss || VALUE_ZERO,
						currency : item?.buy_price_currency || 'INR',
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
					<div className={item?.profit_or_loss >= VALUE_ZERO
						? styles.positive_profit : styles.negative_profit}
					>
						{item?.profit_or_loss > VALUE_ZERO ? 'Profit ' : 'Loss '}
						{item?.profit_or_loss > VALUE_ZERO
							? <IcMArrowDoubleUp width="12px" height="12px" />
							: <IcMArrowDoubleDown width="12px" height="12px" />}
					</div>
				</div>
			</div>
		</div>
	);
}
export default Card;
