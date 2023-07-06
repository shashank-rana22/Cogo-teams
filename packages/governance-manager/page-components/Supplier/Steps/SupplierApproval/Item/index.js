import { Button } from '@cogoport/components';
import { IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Item({ title, verify, index, setOpen }) {
	return (
		<div className={styles.row}>
			<div className={styles.title}>{title}</div>
			<div className={styles.status_button}>
				{verify[index] ? (
					<div className={styles.status_text}>

						<IcCFtick width={20} height={20} fill="#5CAF3F" />
						<span style={{ marginLeft: '8px', color: '#5CAF3F' }}> Verified</span>
					</div>
				) : (
					<div className={styles.status_text}>
						<IcCFcrossInCircle width={20} height={20} fill="#EE3425" />
						<span style={{ marginLeft: '8px', color: '#EE3425' }}> Rejected</span>
					</div>
				)}
				<Button
					className={styles.button}
					size="md"
					themeType="accent"
					onClick={() => {
						setOpen(index + 1);
					}}
				>
					Open

				</Button>
			</div>

		</div>
	);
}
export default Item;
