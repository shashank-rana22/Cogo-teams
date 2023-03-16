import { Tooltip, cl } from '@cogoport/components';
import { snakeCase } from '@cogoport/utils';

import IconMapping from './IconMapping';
import styles from './styles.module.css';

function RightSideNav({
	activeSelect,
	setActiveSelect,
	openNewTab,
	loading,
	disableQuickActions = false,
}) {
	const handleClick = (val) => {
		if (val === 'spot_search') {
			if (!loading) {
				openNewTab({ crm: 'searches', prm: 'searches' });
			}
		} else {
			setActiveSelect(val);
		}
	};

	const disabledSpotSearch = loading || disableQuickActions;

	return (
		<div className={styles.right_container}>
			{IconMapping.map((item) => {
				const { icon, name, content } = item;
				return (
					<div
						key={snakeCase(name)}
						className={cl`${styles.icon_div} ${
							activeSelect === name ? styles.active : ''
						}
						 ${
							disabledSpotSearch && item.name === 'spot_search'
								? styles.icon_div_load
								: ''
						}`}
						role="presentation"
						onClick={() => handleClick(name)}
					>
						<Tooltip content={content} placement="left">
							<div>{icon}</div>
						</Tooltip>
					</div>
				);
			})}
		</div>
	);
}
export default RightSideNav;
