import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function Card({
	children = null,
	label = 'Card',
	defaultOpen = false,
}) {
	const [open, setOpen] = useState(defaultOpen);

	useEffect(() => {
		setOpen(defaultOpen);
	}, [defaultOpen]);

	return (
		<div className={styles.container}>
			<button onClick={() => setOpen(!open)} className={styles.header_button}>
				<div className={styles.card_label}>{label}</div>
				<div>
					{open ? <IcMArrowUp /> : <IcMArrowDown />}
				</div>
			</button>

			<div className={`${styles.animated_container} ${open ? styles.enter : styles.exit}`}>
				{children}
			</div>
		</div>
	);
}
export default Card;
