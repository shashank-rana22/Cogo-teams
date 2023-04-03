import { saveAs } from 'file-saver';
import React from 'react';

import OrganizationDocuments from './OrganisationDocuments';
import styles from './styles.module.css';
import TradeDocuments from './TradeDocuments';

function Wallet({ forModal = false, activeWallet = '' }) {
	const handleView = (e, image_url) => {
		e.stopPropagation();
		window.open(image_url, '_blank');
	};

	const handleSave = (e, image_url) => {
		e.stopPropagation();
		if (image_url) {
			saveAs(image_url);
		}
	};

	return (
		<div className={styles.container}>
			{
			activeWallet === 'trade_documents'
				? 	(
					<TradeDocuments
						forModal={forModal}
						handleView={handleView}
						handleSave={handleSave}
					/>
				)

				: 	(
					<OrganizationDocuments
						forModal={forModal}
						handleView={handleView}
						handleSave={handleSave}
					/>
				)

		}
		</div>
	);
}

export default Wallet;
