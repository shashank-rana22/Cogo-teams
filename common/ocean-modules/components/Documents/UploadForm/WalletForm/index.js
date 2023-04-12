import { Input, Tabs, TabPanel } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Wallet from '../../Wallet';

import styles from './styles.module.css';

function WalletForm({
	showWalletDocs,
	activeWallet,
	setActiveWallet,
	showDoc,
	handleDocClick,
}) {
	const [searchTask, setSearchTask] = useState('');

	return (
		<div>
			<div className={styles.main_container}>
				<div className={styles.header}>
					<div className={styles.heading}>Document Wallet</div>
					<div className={styles.search_container}>
						<Input
							className="primary md"
							value={searchTask}
							placeholder="Search..."
							suffix={<IcMSearchlight style={{ fontSize: '1rem' }} />}
							onChange={(e) => {
								setSearchTask(e);
							}}
						/>
					</div>
					<div className={styles.line} />
				</div>
				<Tabs
					activeTab={activeWallet}
					onChange={setActiveWallet}
					className={styles.tabs}
					themeType="primary"
				>
					<TabPanel name="trade_documents" title="Trade Documents" />

					<TabPanel name="organization_documents" title="Organization Documents" />
				</Tabs>
				<Wallet
					showWalletDocs={showWalletDocs}
					searchTasksVal={searchTask}
					showDoc={showDoc}
					handleDocClick={handleDocClick}
					activeWallet={activeWallet}
				/>
			</div>
		</div>
	);
}
export default WalletForm;
