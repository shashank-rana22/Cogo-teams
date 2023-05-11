import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function Accordion({ title, children, open = false, showerror }) {
	const [active, setActive] = useState(open);

	function toggleActive() {
		setActive(!active);
	}

	const classname = active ? `${styles.accordion_active}` : styles.accordion;

	const activeclass = active ? styles.active : '';

	const activeheader = active ? `${styles.accordion_header} ${active}` : styles.accordion_header;

	return (
		<div className={classname}>
			<button
				type="button"
				className={activeheader}
				onClick={toggleActive}
			>
				<h3 className={styles.accordion_title}>{title}</h3>
				{showerror && <div className={styles.error}>Please Provide required fields</div>}
				<div>
					{active ? (
						<IcMArrowRotateDown />
					) : (
						<IcMArrowRotateUp />
					)}
				</div>
			</button>
			<div className={active ? styles.accordion_line_active : styles.accordion_line} />
			{active && (
				<div className={`${styles.description} ${activeclass}`}>
					<p className={styles.accordion_content}>
						{children}
					</p>
				</div>
			)}
		</div>
	);
}

export default Accordion;
