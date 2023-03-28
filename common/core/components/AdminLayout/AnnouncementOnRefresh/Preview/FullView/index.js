import { Button } from '@cogoport/components';
import { IcMPreview } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const openDocument = (url) => {
	let modifiedUrl = `https://${url}`;
	if (url?.includes('http://') || url?.includes('https://')) {
		modifiedUrl = url;
	}

	window.open(modifiedUrl, '_blank');
};

function FullView({ url }) {
	return (
		<div className={styles.container}>
			<Button type="button" onClick={() => openDocument(url)} size="md" themeType="secondary">
				Preview
				<div className={styles.icon}>
					<IcMPreview height={16} width={16} />
				</div>
			</Button>
		</div>
	);
}

export default FullView;
