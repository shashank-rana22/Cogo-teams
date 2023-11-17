import { Tooltip, cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const geo = getGeoConstants();

const getFormattedAmt = ({ amount, currency }) => formatAmount({
	amount,
	currency : currency || geo.country.currency.code,
	options  : {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 2,
	},
});

function PremiumRate({ rateData = {} }) {
	const {
		serviceChargeList = [],
		chargeCurrency,
	} = rateData || {};

	return (
		<div>
			{
				(serviceChargeList || []).map((charge) => {
					const {
						displayName = '',
						totalCharges = 0,
						productCodeId = '',
						serviceName = '',
					} = charge || {};

					return (
						<div key={productCodeId} className={styles.rate}>
							<div className={styles.box_div}>
								<span>{displayName}</span>

								{serviceName === 'premium' ? (
									<Tooltip
										placement="bottom"
										content={(
											<div>Exclusive of Taxes</div>
										)}
									>
										<IcMInfo className={styles.info_icon} />
									</Tooltip>
								) : ''}
							</div>

							<span>{getFormattedAmt({ amount: totalCharges, currency: chargeCurrency })}</span>
						</div>
					);
				})
			}

			<div className={cl`${styles.rate} ${styles.final}`}>
				<div>Amount Payable:</div>
				<div>
					{getFormattedAmt({
						amount   : rateData?.totalCharges,
						currency : chargeCurrency,
					})}
				</div>
			</div>
		</div>
	);
}

export default PremiumRate;
