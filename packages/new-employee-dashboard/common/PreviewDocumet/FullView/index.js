import { Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import React from 'react';

import openDocument from '../../../utils/open-document';

import styles from './styles.module.css';

function FullView({ url, containerStyle = {} }) {
	return (
		<div className={styles.container} style={{ ...containerStyle }}>
			<Button
				onClick={() => openDocument(url)}
				style={{ borderRadius: 4 }}
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
