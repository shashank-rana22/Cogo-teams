import { Button, Select } from '@cogoport/components';
import { useState } from 'react';

import styles from '../../styles.module.css';

function ExpiringRatesFilter({ numberOfSelectedRows = 0, setExtendExpiryShow, setSendEmailShow }) {
	const [expiringIn, setExpiringIn] = useState('');
	const [serviceProvider, setServiceProvider] = useState('');
	const [shippingLine, setShippingLine] = useState('');

	return (
		<div className={styles.filter}>
			<form>

				<div className={styles.filter_left}>
					<div>
						<div>
							Expiring in....
						</div>
						<Select
							placeholder="Type here..."
							name="expiringIn"
							options={[{ value: 'abc', label: 'abc' }]}
							onChange={setExpiringIn}
							value={expiringIn}
						/>
					</div>
					<div>
						<div>
							Service provider
						</div>
						<Select
							placeholder="Type here..."
							name="serviceProvider"
							onChange={setServiceProvider}
							options={[{ value: 'abc', label: 'abc' }]}
							value={serviceProvider}
						/>
					</div>
					<div>
						<div>
							Shipping Line
						</div>
						<Select
							name="shippingLine"
							placeholder="Type here..."
							onChange={setShippingLine}
							options={[{ value: 'abc', label: 'abc' }]}
							value={shippingLine}
						/>
					</div>

				</div>
			</form>
			{
				numberOfSelectedRows > 0 ? (
					<div className={styles.filter_right}>
						{numberOfSelectedRows}
						{' '}
						rates selected
						<Button
							size="md"
							themeType="primary"
							onClick={() => setExtendExpiryShow(true)}
						>
							{' '}
							Extend Expiry

						</Button>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => setSendEmailShow(true)}
						>
							{' '}
							Send Email to LSP&apos;s

						</Button>
					</div>
				) : (
					<div className={styles.filter_right}>
						<Button size="md" themeType="primary" disabled> Expand Expiry</Button>
						<Button size="md" themeType="primary" disabled> Send Email to LSP</Button>
					</div>
				)
            }
		</div>
	);
}

export default ExpiringRatesFilter;
