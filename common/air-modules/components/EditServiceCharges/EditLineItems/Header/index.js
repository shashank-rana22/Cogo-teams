import { useMemo } from 'react';

import styles from './styles.module.css';

const TOTAL_SPAN = 12;
const FLEX_HUNDRED = 100;
const FLEX_ONE = 100;

function Header({ controls = [] }) {
	const keys = useMemo(
		() => Array(controls.length).fill(null).map(() => Math.random()),
		[controls.length],
	);
	return (
		<div className={styles.container}>
			{controls?.map((ctrl, i) => {
				const { span } = ctrl;

				const flex = ((span || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED - FLEX_ONE;

				return (
					<div className={styles.label} style={{ width: `${flex}%` }} key={keys[i]}>
						{ctrl?.label}
					</div>
				);
			})}
		</div>
	);
}

export default Header;
