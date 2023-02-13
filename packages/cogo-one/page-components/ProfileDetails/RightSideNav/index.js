import { cl } from '@cogoport/components';
import { useState } from 'react';

import IconMapping from './IconMapping';
import styles from './styles.module.css';

function RightSideNav() {
	const [activeSelect, setActiveSelect] = useState('profile');
	const handleClick = (val) => {
		setActiveSelect(val);
	};
	return (
		<div className={styles.right_container}>
			{IconMapping.map((item) => {
				const { icon, name } = item;
				return (
					<div
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
