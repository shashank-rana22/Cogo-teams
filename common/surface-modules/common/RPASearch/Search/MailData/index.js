import { Checkbox, Radio, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';

import styles from './styles.module.css';

function Item({ item = {}, onClick = () => {}, values = [], multiple }) {
	const Element = multiple ? Checkbox : Radio;

	return (
		<div className={styles.container}>
			<div className={styles.subject}>
				<div className={styles.label}>Subject: </div>

				<div className={styles.value}>{item?.subject}</div>
			</div>

			<div className={styles.details}>
				<div className={cl`${styles.value} ${styles.small}`}>
					{formatDistanceToNow(item.email_received_at || new Date(), {
						addSuffix: true,
					})}
				</div>

				<div className={styles.label} style={{ fontSize: 10 }}>{startCase(item?.entity_name)}</div>
			</div>

			<div className={styles.row}>
				{item.file_url ? (
					<div
						className={styles.view_button}
						role="button"
						tabIndex={0}
						onClick={() => window.open(item.file_url, '_blank')}
					>
						View Document
					</div>
				) : null}

				<div className={styles.styled_radio}>
					<Element
						checked={values?.includes(item.id)}
						onChange={() => {
							onClick(item.id, item);
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default Item;
