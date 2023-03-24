import { Button } from '@cogoport/components';

import useEndTest from '../../../hooks/useEndTest';

import styles from './styles.module.css';

function Footer({ setActiveState }) {
	const { endTest } = useEndTest({ setActiveState });

	return (
		<div className={styles.container}>
			<Button onClick={endTest} themeType="accent">Submit Test</Button>
		</div>
	);
}

export default Footer;
