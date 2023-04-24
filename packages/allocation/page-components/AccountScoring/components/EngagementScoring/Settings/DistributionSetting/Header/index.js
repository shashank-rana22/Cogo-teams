import { Button, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ setEditing = () => {}, loading }) {
	return (
		<div className={styles.header}>
			<div className={styles.heading}>
				<div className={styles.label}>Account Distribution</div>

				<Tooltip
					className={styles.word_break}
					content="Multiplier to calculate warmness of the KAM based on the region they lie in"
					placement="top"
				>
					<IcMInfo height={16} className={styles.info_icon} />
				</Tooltip>
			</div>

			<div>
				<Button
					themeType="secondary"
					onClick={() => setEditing((pv) => !pv)}
					disabled={loading}
				>
					{' '}
					Edit
				</Button>
			</div>
		</div>
	);
}

export default Header;
