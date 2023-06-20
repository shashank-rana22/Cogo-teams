import { useMemo } from 'react';

import styles from './styles.module.css';

const DEFAULT_SPAN = 12;
const PERCENT_FACTOR = 100;
const FLEX_OFFSET = 1;

function Header({ controls = [] }) {
	const keys = useMemo(
		() => Array(controls.length).fill(null).map(() => Math.random()),
		[controls.length],
	);
	return (
		<div className={styles.container}>
			{controls?.map((ctrl, i) => {
				const { span } = ctrl;

				const flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENT_FACTOR - FLEX_OFFSET;

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
