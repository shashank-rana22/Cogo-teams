import { differenceInDays } from '@cogoport/utils';
import React from 'react';

import getValue from '../../../../../../utils/getValue';

import SERVICE_TYPE_ICON_MAPPING from './service-type-icon-mapping';
import styles from './styles.module.css';

function SearchType({ item = {}, field = {}, type = '' }) {
	if (type === 'expiry') {
		const daysToExpire = differenceInDays(item?.expiration_time, new Date());
		if (daysToExpire < 0 || item.expired) {
			return <span className="expired">Expired</span>;
		}
		return daysToExpire < 4 ? <span className="expiring">Expiring Soon</span> : null;
	}
	const service_type = getValue(item, field);

	const { icon: Icon, color, label = '' } = SERVICE_TYPE_ICON_MAPPING[service_type] || {};

	return (
		<div className={styles.container}>
			<div className={styles.icon_container}>
				<Icon height={16} width={16} fill={color} />
			</div>

			<div className={styles.label} style={{ color }}>
				{label}
			</div>
		</div>
	);
}
export default SearchType;
