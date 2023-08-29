import { Button, Select } from '@cogoport/components';
import React from 'react';

import AutomationWalletDetails from './Details';
import styles from './styles.module.css';

function AutomationWallet() {
	return (
		<>
			<div className={styles.container}>
				<div>
					<Select
						placeholder="Service Type"
					// options={serviceOptions}
					// value={filter?.service_type}
					// onChange={(val) => onChange(val, 'service_type')}
						size="sm"
						style={{ width: '150px' }}
					/>
				</div>
				<Button size="md" themeType="accent"> Create New Wallet </Button>
			</div>
			<div>
				<AutomationWalletDetails />
			</div>
		</>
	);
}

export default AutomationWallet;
