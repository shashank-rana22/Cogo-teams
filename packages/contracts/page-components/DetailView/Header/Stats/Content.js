import { Button } from '@cogoport/components';

import Line from '../../../../common/Line';
import Margin from '../../../../common/MiniCard/Margin';
import Percentage from '../../../../common/MiniCard/Percentage';
import Price from '../../../../common/MiniCard/Price';

import styles from './styles.module.css';

function Content() {
	return (
		<div className={styles.main_container}>
			<div className={styles.information}>
				<Percentage />
				<Line />
				<Price />
				<Line />
				<Margin />
			</div>
			<div className={styles.button_container}>
				<Button themeType="secondary" size="md" onClick={() => {}}>
					Reject
				</Button>
				<Button themeType="primary" size="md" onClick={() => {}}>
					Approve
				</Button>
			</div>
		</div>
	);
}
export default Content;
