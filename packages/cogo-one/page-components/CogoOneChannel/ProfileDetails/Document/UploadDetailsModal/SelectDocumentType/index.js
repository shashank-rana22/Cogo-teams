import React from 'react';

import { SELECT_TABS } from '../../../../../../constants';

import styles from './styles.module.css';

function SelectDocumentType({ setSelectedDocumentType = () => {}, singleItem = {} }) {
	const { is_pan_uploaded = false, is_gst_uploaded = false } = singleItem || {};

	const disable = {
		pan : is_pan_uploaded,
		gst : is_gst_uploaded,
	};

	return (
		<div className={styles.container}>
			{(SELECT_TABS || []).map((item) => (
				<div
					role="presentation"
					className={styles.card}
					disabled={disable[item?.value]}
					onClick={() => setSelectedDocumentType(item?.value)}
				>
					{item?.label}
				</div>
			))}
		</div>
	);
}

export default SelectDocumentType;
