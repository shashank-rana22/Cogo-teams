import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../CreateCourse/commons/EmptyState';

import styles from './styles.module.css';

function Footer() {
	return (
		<div className={styles.container}>
			<Button size="md" themeType="tertiary">Schedule Time to Begin</Button>

			<div className={styles.btn_container}>
				<Button size="md" themeType="secondary">Skip For Now</Button>
				<Button size="md" themeType="accent">Mark As Complete</Button>
			</div>
		</div>
	);
}

export default Footer;
