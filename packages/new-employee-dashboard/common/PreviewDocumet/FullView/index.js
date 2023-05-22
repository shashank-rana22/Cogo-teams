import { Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
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
				<div style={{ display: 'flex', alignItems: 'center' }}>
					Preview
					<IcMEyeopen style={{ marginLeft: 4 }} fill="#fff" />
				</div>
			</Button>
		</div>
	);
}

export default FullView;
