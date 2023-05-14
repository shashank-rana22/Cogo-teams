import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function Accordion({
	title = '',
	children = null,
	open = false,
	showerror = false,
}) {
	const [active, setActive] = useState(open);

	return (
		<div className={active ? `${styles.accordion_active}` : styles.accordion}>
			<button
				type="button"
				className={active ? `${styles.accordion_header} ${active}` : styles.accordion_header}
				onClick={() => {
					setActive(!active);
				}}
			>
				<h3 className={styles.accordion_title}>{title}</h3>
				{showerror ? <div className={styles.error}>Please Provide required fields</div> : null}
				<div>
					{active ? (
						<IcMArrowRotateDown />
					) : (
						<IcMArrowRotateUp />
					)}
				</div>
			</button>
			<div className={active ? styles.accordion_line_active : styles.accordion_line} />
			{active ? (
				<div className={`${styles.description} ${active ? styles.active : ''}`}>
					<p className={styles.accordion_content}>
						{children}
					</p>
				</div>
			) : null}
		</div>
	);
}

export default Accordion;
