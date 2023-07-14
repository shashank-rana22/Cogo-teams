import { Button, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ setEditing = () => {}, loading }) {
	return (
		<div className={styles.header}>
			<div className={styles.heading}>
				<div className={styles.label}>Bias Settings</div>

				<Tooltip
					className={styles.word_break}
					content="Bias is used to calculate the warmness of the KAM"
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
