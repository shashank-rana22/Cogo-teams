import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function ToolTipContent({ data = {} }) {
	const { shipping_preferences } = data || {};
	const { min_price = '', max_price = '', currency = '', preferred_shipping_lines = [] } = shipping_preferences || {};

	return (
		<div>
			<ui>
				{min_price
				&& (
					<li>
						<span className={styles.price_text}>Min Price :</span>
						{' '}
						<span className={styles.wallet_text}>
							{formatAmount({
								amount  : min_price,
								currency,
								options : {
									style                 : 'currency',
									notation              : 'compact',
									compactDisplay        : 'short',
									minimumFractionDigits : 2,
								},
							})}
						</span>
					</li>
				)}
				{max_price
				&& (
					<li>
						<span className={styles.price_text}>Max Price :</span>
						{' '}
						<span className={styles.wallet_text}>
							{formatAmount({
								amount  : max_price,
								currency,
								options : {
									style                 : 'currency',
									notation              : 'compact',
									compactDisplay        : 'short',
									minimumFractionDigits : 2,
								},
							})}
						</span>
					</li>
				)}

				{(preferred_shipping_lines || []).length
					? (
						<div style={{ marginTop: '10px' }}>
							<li>
								<span className={styles.price_text}>Preferred Shipping Lines :</span>
								{' '}
								{(preferred_shipping_lines || []).map((shipping_line) => (
									<div style={{ margin: '0 6px' }} key={shipping_line?.id}>
										<li>
											<span className={styles.wallet_text}>
												{shipping_line?.business_name}
											</span>
										</li>
									</div>
								))}
							</li>
						</div>
					) : null}
			</ui>
		</div>
	);
}

export default ToolTipContent;
