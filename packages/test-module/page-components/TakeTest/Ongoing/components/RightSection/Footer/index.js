import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Footer() {
	return (
		<div className={styles.container}>
			<Button themeType="accent">Submit Test</Button>
		</div>
	);
}

export default Footer;
