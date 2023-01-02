import { Placeholder } from '@cogoport/components';

import Line from '../../../../../common/Line';

import styles from './styles.module.css';

function Content() {
	return (
		<div className={styles.main_container}>
			<div className={styles.information}>
				<Placeholder />
				<Line />
				<Placeholder />
				<Line />
				<Placeholder />
			</div>
			<div className={styles.button_container}>
				<Placeholder />
				<Placeholder />
			</div>
		</div>
	);
}
export default Content;
