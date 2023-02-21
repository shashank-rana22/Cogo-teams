import { cl } from '@cogoport/components';
import { snakeCase } from '@cogoport/utils';

import IconMapping from './IconMapping';
import styles from './styles.module.css';

function RightSideNav({
	activeSelect,
	setActiveSelect,
	openNewTab,
	loading,
}) {
	const handleClick = (val) => {
		if (val === 'spot_search' && !loading) {
			openNewTab('searches');
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
