import { useMemo } from 'react';

import styles from './styles.module.css';

function Header({ controls = [] }) {
	const keys = useMemo(
		() => Array(controls.length).fill(null).map(() => Math.random()),
		[controls.length],
	);
	return (
		<div className={styles.container}>
			{controls?.map((ctrl, i) => {
				const { flex = '16.7%' } = ctrl;

				return (
					<div className={styles.label} style={{ width: flex }} key={keys[i]}>
						{ctrl?.label}
					</div>
				);
			})}
		</div>
	);
}

export default Header;
