import { IcMFair } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import RenderLocation from '../RenderLocation';

import styles from './styles.module.css';

function PortDetails({ data = {}, primary_service = {} }) {
	if (isEmpty(data)) { return null; }

	return (
		<div className={styles.container}>
			<div className={styles.icons_and_service}>
				<IcMFair />
				<span>AIR</span>
			</div>

			<RenderLocation primary_service={primary_service} />
		</div>
	);
}

export default PortDetails;
