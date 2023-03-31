import { Button } from '@cogoport/components';
import { IcMPreview } from '@cogoport/icons-react';
import React from 'react';

import openDocument from '../../../../../../commons/OpenDocument';

import styles from './styles.module.css';

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
