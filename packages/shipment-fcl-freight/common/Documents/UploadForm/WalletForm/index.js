import { Input, Tabs, TabPanel, Modal } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Wallet from '../../Wallet';

import styles from './styles.module.css';

function WalletForm({
	showWalletDocs,
	activeWallet,
	setActiveWallet = () => {},
	showDoc,
	handleDocClick = () => {},
}) {
	const [searchDocs, setSearchDocs] = useState('');

	return (
		<div>
			<Modal.Header title="Document Wallet" />
			<div className={styles.main_container}>
				<div className={styles.header}>
					<div className={styles.search_container}>
						<Input
							className="primary md"
							value={searchDocs}
							placeholder="Search..."
							suffix={<IcMSearchlight style={{ fontSize: '1rem' }} />}
							onChange={(e) => {
								setSearchDocs(e);
							}}
						/>
					</div>
				</div>
				<Tabs
					activeTab={activeWallet}
					onChange={setActiveWallet}
					themeType="primary"
				>
					<TabPanel name="trade_documents" title="Trade Documents" />

					<TabPanel name="organization_documents" title="Organization Documents" />
				</Tabs>
				<Modal.Body>
					<Wallet
						showWalletDocs={showWalletDocs}
						searchDocsVal={searchDocs}
						showDoc={showDoc}
						handleDocClick={handleDocClick}
						activeWallet={activeWallet}
					/>
				</Modal.Body>
			</div>
		</div>
	);
}
export default WalletForm;
