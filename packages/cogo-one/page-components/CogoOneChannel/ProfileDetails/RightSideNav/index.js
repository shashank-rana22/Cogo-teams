import { cl } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { snakeCase } from '@cogoport/utils';

import IconMapping from './IconMapping';
import styles from './styles.module.css';

function RightSideNav({
	activeSelect,
	setActiveSelect,
	activeMessageCard,
	activeVoiceCard,
	activeTab,
}) {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);

	const org_id = activeTab === 'message' ? activeMessageCard?.organization_id : activeVoiceCard?.organization_id;

	const ORG_ID = org_id || '272a2072-7009-4df9-b852-185bfa49a541';

	const handleClick = (val) => {
		if (val === 'spot_search') {
			// eslint-disable-next-line no-undef
			window.open(`/${partnerId}/details/demand/${ORG_ID}?source=communication`, '_blank');
		} else {
			setActiveSelect(val);
		}
	};

	return (
		<div className={styles.right_container}>
			{IconMapping.map((item) => {
				const { icon, name } = item;
				return (
					<div
						key={snakeCase(name)}
						className={cl`${styles.icon_div} ${activeSelect === name ? styles.active : ''}`}
						role="presentation"
						onClick={() => handleClick(name)}
					>
						{icon}
					</div>
				);
			})}
		</div>
	);
}
export default RightSideNav;
