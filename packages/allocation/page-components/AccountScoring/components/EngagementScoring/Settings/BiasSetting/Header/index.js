import { Button, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ editing = false, setEditing = () => {} }) {
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
				{
                    editing
                    	? (
	<div className={styles.btn}>
		<Button
			themeType="secondary"
			onClick={() => setEditing(!editing)}
		>
			Cancel

		</Button>

		<Button
			themeType="primary"
			onClick={() => setEditing(!editing)}
			style={{ marginLeft: '8px' }}
		>
			Save

		</Button>
	</div>
                    	) : (
	<Button
		themeType="secondary"
		onClick={() => setEditing(!editing)}
	>
		{' '}
		Edit
	</Button>
                    	)
                }

			</div>

		</div>
	);
}

export default Header;
