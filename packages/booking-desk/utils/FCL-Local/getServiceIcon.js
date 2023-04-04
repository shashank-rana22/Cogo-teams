import { IcMFlocalCharges } from '@cogoport/icons-react';

import styles from './styles.module.css';

export const getServiceIcon = ({ showText = true } = {}) => (
	<div className={`${styles.icon_container} service-info-icon-container`}>
		<IcMFlocalCharges className="service-info-icon" />

		{showText ? (
			<div className={`${styles.icon_text} service-info-text`}>
				FCL Local
			</div>
		) : null}
	</div>
);
