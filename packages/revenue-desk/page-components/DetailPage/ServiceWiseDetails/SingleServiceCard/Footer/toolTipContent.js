import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function ToolTipContent({ data = {} }) {
	return (
		<div>
			<ui>
				<li>
					<span className={styles.price_text}>Min Price :</span>
					{' '}
					<span className={styles.wallet_text}>
						{formatAmount({
							amount   : data?.shipping_preferences?.min_price,
							currency : data?.shipping_preferences?.currency,
							options  : {
								style                 : 'currency',
								notation              : 'compact',
								compactDisplay        : 'short',
								minimumFractionDigits : 2,
							},
						})}
					</span>
				</li>
				<li>
					<span className={styles.price_text}>Max Price :</span>
					{' '}
					<span className={styles.wallet_text}>
						{formatAmount({
							amount   : data?.shipping_preferences?.max_price,
							currency : data?.shipping_preferences?.currency,
							options  : {
								style                 : 'currency',
								notation              : 'compact',
								compactDisplay        : 'short',
								minimumFractionDigits : 2,
							},
						})}
					</span>
				</li>
				<div style={{ marginTop: '10px' }}>
					<li>
						<span className={styles.price_text}>Preferred Shipping Lines :</span>
						{' '}
						{(data?.shipping_preferences?.preferred_shipping_lines || []).map((shipping_line) => (
							<div style={{ margin: '0 6px' }} key={shipping_line?.id}>
								<li><span className={styles.wallet_text}>{shipping_line?.business_name}</span></li>
							</div>
						))}
					</li>
				</div>
			</ui>
		</div>
	);
}

export default ToolTipContent;
