import { Button, Select } from '@cogoport/components';
import React, { useState } from 'react';

import CreateWallet from './CreateWallet';
import AutomationWalletDetails from './Details';
import styles from './styles.module.css';

function AutomationWallet() {
	const [createWallet, setCreateWallet] = useState(false);

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
				<Button
					size="md"
					themeType="accent"
					onClick={() => setCreateWallet(!createWallet)}
				>
					Create New Wallet
				</Button>
			</div>
			<div>
				<AutomationWalletDetails />
			</div>
			{createWallet && <CreateWallet createWallet={createWallet} setCreateWallet={setCreateWallet} />}
		</>
	);
}

export default AutomationWallet;
