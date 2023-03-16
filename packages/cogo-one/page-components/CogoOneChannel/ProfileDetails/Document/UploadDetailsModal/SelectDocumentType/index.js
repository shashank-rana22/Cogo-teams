import React from 'react';

import { SELECT_TABS } from '../../../../../../constants';

import styles from './styles.module.css';

function SelectDocumentType({ setSelectedDocumentType = () => {} }) {
	return (
		<div className={styles.container}>
			{(SELECT_TABS || []).map((item) => (
				<div
					role="presentation"
					className={styles.card}
					onClick={() => setSelectedDocumentType(item?.value)}
				>
					{item?.label}
				</div>
			))}
		</div>
	);
}

export default SelectDocumentType;
