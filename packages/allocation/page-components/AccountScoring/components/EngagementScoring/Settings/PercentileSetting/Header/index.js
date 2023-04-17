import { Button, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ setEditing = () => {} }) {
	return (
		<div className={styles.header}>
			<div className={styles.heading}>
				<div className={styles.label}>Percentile Settings</div>

				<Tooltip
					className={styles.word_break}
					content="When the account lies in the respective percentile it would be assigned
					a score at that time based on the table given below to show the region in which
					the account lies whether (COLD , ICE COLD , WARM , HOT , FLAMING HOT)"
					placement="top"
				>
					<IcMInfo height={16} className={styles.info_icon} />
				</Tooltip>
			</div>

			<div>

				<Button
					themeType="secondary"
					onClick={() => setEditing((pv) => !pv)}
				>
					{' '}
					Edit
				</Button>
			</div>

		</div>
	);
}

export default Header;
