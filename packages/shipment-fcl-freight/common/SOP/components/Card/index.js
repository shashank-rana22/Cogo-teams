import { cl } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Card({ children = null }) {
	const [open, setOpen] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<button onClick={() => setOpen(!open)} className={styles.header_button}>
					<div>
						Card
					</div>
					<div>
						{open ? <IcMArrowUp /> : <IcMArrowDown />}
					</div>
				</button>
			</div>

			<div className={cl`${styles.animated_container} ${open ? styles.enter : styles.exit}`}>
				{children}
			</div>
		</div>
	);
}
export default Card;
