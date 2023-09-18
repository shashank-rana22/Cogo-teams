import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header() {
	return (
		<>
			<h2 className={styles.heading}>
				Leaderboard
			</h2>

			<div className={styles.subheading}>
				<div>
					<span className={styles.light}>for</span>
					{' '}
					<i>Cogo India</i>
				</div>

				<Button size="md" themeType="link">
					Expand All
					{' '}
					<IcMArrowRight width={16} height={16} />
				</Button>
			</div>
		</>
	);
}

export default Header;
