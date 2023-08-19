import { Button, Pill } from '@cogoport/components';

import styles from './styles.module.css';

function Footer({ eachItem = {} }) {
	console.log('eachItem', eachItem);
	return (
		<div className={styles.container}>
			<div className={styles.flex_div}>
				<Pill size="md" color="#C4DC91">Reverted</Pill>
				<Button size="md" themeType="secondary">Submit Feedback</Button>
			</div>
		</div>
	);
}

export default Footer;
