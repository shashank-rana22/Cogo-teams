import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Footer() {
	return (
		<div className={styles.footer}>
			<div className={styles.label}>
				Total Reverts :
			</div>
			<div>
				{' '}
				<Placeholder />
			</div>
		</div>

	);
}
export default Footer;
