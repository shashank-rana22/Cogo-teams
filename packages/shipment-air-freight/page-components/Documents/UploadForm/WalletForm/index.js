import { Input, Tabs, TabPanel, Modal } from '@cogoport/components';
import { IcMSearchlight, IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import Wallet from '../../Wallet';

import styles from './styles.module.css';

function WalletForm({
	showWalletDocs,
	activeWallet,
	setActiveWallet = () => {},
	handleDocClick = () => {},
}) {
	const [searchDocs, setSearchDocs] = useState('');

	return (
		<div>
			<Modal.Header title="Document Wallet" />

			<div className={styles.main_container}>
				<div className={styles.search_container}>
					<Input
						className="primary md"
						value={searchDocs}
						placeholder={`Search ${startCase(activeWallet)}`}
						suffix={searchDocs
							? <IcMCross className={styles.search_icon} onClick={() => setSearchDocs('')} />
							: <IcMSearchlight className={styles.search_icon} />}
						onChange={(e) => {
							setSearchDocs(e);
						}}
					/>
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
						handleDocClick={handleDocClick}
						activeWallet={activeWallet}
					/>
				</Modal.Body>
			</div>
		</div>
	);
}

export default WalletForm;
