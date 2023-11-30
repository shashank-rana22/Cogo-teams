import { differenceInDays } from '@cogoport/utils';

import getValue from '../../../../../../utils/getValue';

import SERVICE_TYPE_ICON_MAPPING from './service-type-icon-mapping';
import styles from './styles.module.css';

const ZERO_DAYS_TO_EXPIRE = 0;
const DAYS_TO_EXPIRE = 4;

function SearchType({ item = {}, field = {}, type = '', serviceType = '' }) {
	if (type === 'expiry') {
		const daysToExpire = differenceInDays(item?.expiration_time, new Date());
		if (daysToExpire < ZERO_DAYS_TO_EXPIRE || item?.expired) {
			return <span className="expired">Expired</span>;
		}
		return daysToExpire < DAYS_TO_EXPIRE ? <span className="expiring">Expiring Soon</span> : null;
	}
	const service_type = getValue(item, field);

	const { icon: Icon, color, label = '' } = SERVICE_TYPE_ICON_MAPPING?.[service_type || serviceType] || {};

	if (!Icon) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.icon_container}>
				<Icon height={16} width={16} fill={color} />
			</div>

			<div className={styles.label} style={{ color }}>
				{label || '-'}
			</div>
		</div>
	);
}
export default SearchType;
