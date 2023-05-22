import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function FullView({ url, containerStyle = {} }) {
	const openDocument = () => {
		let modifiedUrl = `https://${url}`;
		if (url?.includes('http://') || url?.includes('https://')) {
			modifiedUrl = url;
		}

		window.open(modifiedUrl, '_blank');
	};

	return (
		<div className={styles.container} style={{ ...containerStyle }}>
			<Button
				onClick={() => openDocument()}
				style={{
					borderRadius: 4,
				}}
			>
				<div>
					Preview
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/view-icon.svg"
						alt="preview"
						style={{ marginLeft: '4px', width: '15px' }}
					/>
				</div>
			</Button>
		</div>
	);
}

export default FullView;
