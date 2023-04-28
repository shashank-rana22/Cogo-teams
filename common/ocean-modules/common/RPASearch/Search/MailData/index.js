import { Button, CheckBox, Radio, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';

import styles from './styles.module.css';

function Item({ item, onClick, values, multiple }) {
	const Element = multiple ? CheckBox : Radio;

	return (
		<div className={styles.container}>
			<div className={styles.row} style={{ width: '55%' }}>
				<div className={styles.label}>Subject: </div>

				<div className={styles.value}>{item?.subject}</div>
			</div>

			<div className={styles.row} style={{ width: '15%', flexDirection: 'column' }}>
				<div className={cl`${styles.value} ${styles.small}`}>
					{formatDistanceToNow(item.email_received_at || new Date(), {
						addSuffix: true,
					})}
				</div>

				<div className={styles.label} style={{ fontSize: 10 }}>{startCase(item?.entity_name)}</div>
			</div>

			<div
				className={styles.row}
				style={{
					width          : '30%',
					borderRight    : 'none',
					justifyContent : 'flex-end',
				}}
			>
				{item.file_url ? (
					<Button
						className="primary sm"
						style={{ marginLeft: 10 }}
						onClick={() => window.open(item.file_url, '_blank')}
					>
						View Document
					</Button>
				) : null}

				<div className={styles.styled_radio}>
					<Element
						className="primary lg"
						checked={values.includes(item.id)}
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
