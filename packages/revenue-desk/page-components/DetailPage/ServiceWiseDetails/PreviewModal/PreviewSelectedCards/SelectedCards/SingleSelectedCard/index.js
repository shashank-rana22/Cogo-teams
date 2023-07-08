import { Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import { DECIMAL_PLACES, PERCENTAGE_CHECK } from '../../../../../../constants';

import styles from './styles.module.css';

function SingleSelectedCard({ data, shipmentType, priority, fromKey }) {
	const showData = (val) => val || '';
	return (
		<div className={Number(data?.rowData?.profit_percentage) > PERCENTAGE_CHECK
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
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<div>
							<Pill size="md" color="#F2F3FA">
								{startCase(fromKey)}
							</Pill>
						</div>
						{((data?.rowData?.selected_priority)
						&& (data?.rowData?.selected_priority === data?.rowData?.priority)) ? (
							<div>
								<Pill size="md" color="#F9F9F9">
									<div style={{ color: '#7278AD' }}>
										So1 Selected Rate
									</div>
								</Pill>
							</div>
							) : null}
						{
							data?.rowData?.agent ? (
								<div>
									Supply Agent :
									{' '}
									{data?.rowData?.agent}
								</div>
							) : null
						}
					</div>
				</div>
				<div className={styles.lower_section}>
					<div className={styles.lower_right_section}>
						<div className={styles.label}>
							Profitability : &nbsp;
							<div className={Number(data?.rowData?.profit_percentage) > PERCENTAGE_CHECK
								? styles.positive_profit : styles.negative_profit}
							>
								{Number(data?.rowData?.profit_percentage).toFixed(DECIMAL_PLACES)}
								%
							</div>
						</div>
						<div className={styles.label}>
							Profit : &nbsp;
							<div className={Number(data?.rowData?.profit) > PERCENTAGE_CHECK
								? styles.positive_profit : styles.negative_profit}
							>
								{formatAmount({
									amount   : data?.rowData?.profit,
									currency : data?.rowData?.total_buy_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})}
							</div>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div className={styles.label}>
								Total Buy Price :
								<div className={styles.total_price_text}>
									{formatAmount({
										amount   : data?.rowData?.price,
										currency : data?.rowData?.currency,
										options  : {
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : 2,
										},
									})}
								</div>
							</div>
							{ data?.rowData?.origin_locals_price && (
								<div className={styles.label}>
									Total Origin Locals Buy Price :
									<div className={styles.total_price_text}>
										{formatAmount({
											amount   : data?.rowData?.origin_locals_price,
											currency : data?.rowData?.origin_locals_currency,
											options  : {
												style                 : 'currency',
												currencyDisplay       : 'code',
												maximumFractionDigits : 2,
											},
										})}
									</div>
								</div>
							)}
							{data?.rowData?.destination_locals_price && (
								<div className={styles.label}>
									Total Destination Locals Buy Price :
									<div className={styles.total_price_text}>
										{formatAmount({
											amount   : data?.rowData?.destination_locals_price,
											currency : data?.rowData?.destination_locals_currency,
											options  : {
												style                 : 'currency',
												currencyDisplay       : 'code',
												maximumFractionDigits : 2,
											},
										})}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

		</div>
	);
}

export default SingleSelectedCard;
