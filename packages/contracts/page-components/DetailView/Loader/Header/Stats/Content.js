import { Placeholder } from '@cogoport/components';

import Line from '../../../../../common/Line';

import styles from './styles.module.css';

function Content() {
	return (
		<div className={styles.main_container}>
			<div className={styles.information}>
				<Placeholder style={{ width: '80px', height: '60px' }} />
				<Line />
				<Placeholder style={{ width: '80px', height: '60px' }} />
				<Line />
			</div>
			<div className={styles.button_container}>
				<Placeholder style={{ width: '100px', height: '30px' }} />
			</div>
		</div>
	);
}
export default Content;
