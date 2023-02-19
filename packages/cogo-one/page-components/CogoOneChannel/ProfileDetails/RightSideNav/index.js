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
}) {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const { organization_id } = activeVoiceCard || {};

	const { organization_id: org_id } = activeMessageCard || {};

	const ORG_ID = organization_id || org_id || '272a2072-7009-4df9-b852-185bfa49a541';

	const handleClick = (val) => {
		if (val === 'spot_search') {
			// eslint-disable-next-line no-undef
			window.location.href = `/${partnerId}/details/demand/${ORG_ID}?source=communication`;
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
