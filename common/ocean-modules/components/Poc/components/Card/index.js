import { Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

const ICONS_DIMENSIONS = 14;

function Card({ title = '', showEdit = false, editAction = () => {}, children = null }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>{title}</div>
				{showEdit ? (
					<Button themeType="link" onClick={editAction}>
						<IcMEdit
							height={ICONS_DIMENSIONS}
							width={ICONS_DIMENSIONS}
						/>
					</Button>
				) : null}
			</div>
			<div className={styles.body}>{children}</div>
		</div>
	);
}
export default Card;
