import { Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';

function Header() {
	const { user } = useSelector(({ profile }) => profile);
	return (
		<div className={styles.head_container}>
			<div>
				<h2 className={styles.heading}>
					Welcome,
					{' '}
					{user.name}
				</h2>

				<p className={styles.subheading}>
					You are viewing Incentive and Scoring Analytics
					{' '}
					<span className={styles.light}>for</span>
					{' '}
					<i>Cogo India</i>
				</p>
			</div>

			<div className={styles.button_container}>
				<Button
					type="button"
					size="lg"
					themeType="secondary"
					style={{ marginRight: '12px' }}
				>
					Public View Mode
				</Button>

				<Button
					type="button"
					size="lg"
					themeType="secondary"
				>
					Across All
				</Button>
			</div>
		</div>
	);
}

export default Header;
