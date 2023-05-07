import { Button, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ heading = '', tooltipData = '', onClose = () => {} }) {
	return (
		<div className={styles.header}>
			<div className={styles.heading}>
				<div className={styles.label}>{heading}</div>
				<Tooltip
					className={styles.word_break}
					content={tooltipData}
					placement="top"
				>
					<IcMInfo height={16} className={styles.info_icon} />
				</Tooltip>
			</div>

			<div className={styles.btn}>
				<Button
					themeType="secondary"
					onClick={onClose}
				>
					Cancel

				</Button>

				<Button
					type="submit"
					themeType="primary"
					style={{ marginLeft: '8px' }}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default Header;
