import { Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function ThemeToggle() {
	// eslint-disable-next-line no-undef
	const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
	const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';

	useEffect(() => {
		// eslint-disable-next-line no-undef
		document.body.dataset.theme = activeTheme;
		// eslint-disable-next-line no-undef
		window.localStorage.setItem('theme', activeTheme);
	}, [activeTheme]);

	return (
		<Button
			className={styles.toggle_button}
			aria-label={`Change to ${inactiveTheme} mode`}
			title={`Change to ${inactiveTheme} mode`}
			type="button"
			onClick={() => setActiveTheme(inactiveTheme)}
		>
			<span
				className={styles.toggle_thumb}
				style={{
					transform: activeTheme === 'dark'
						? 'translate3d(calc(var(--toggle-width) - var(--toggle-height)), 0, 0)'
						: 'none',
				}}
			/>
			<span>🌙</span>
			<span>☀️</span>
		</Button>
	);
}

export default ThemeToggle;
