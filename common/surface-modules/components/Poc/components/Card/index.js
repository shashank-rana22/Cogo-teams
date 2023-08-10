import { Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Card({ title = '', showEdit = false, editAction = () => {}, children = null }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>{title}</div>
				{showEdit ? (
					<Button themeType="link" onClick={editAction}>
						<IcMEdit
							height={14}
							width={14}
						/>
					</Button>
				) : null}
			</div>
			<div className={styles.body}>{children}</div>
		</div>
	);
}
export default Card;
