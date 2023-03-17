import { cl, Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

function ManageServices({
	isChild = false,
	children = null,
	title = 'Manage Services',
	defaultOpen = false,
	showLabel = true,
	message = '',
	// styles = {},
}) {
	const [open, setOpen] = useState(defaultOpen);

	useEffect(() => {
		if (title === 'Manage Services') {
			setOpen(true);
		}
	}, []);

	let stylesChild = {};
	let stylesChildIcon = {};

	if (isChild) {
		stylesChild = {
			position : 'relative',
			bottom   : '20px',
			width    : '1278px',
			left     : '12px',
		};
		stylesChildIcon = {
			height: '20px !important',
		};
	}
	return (
		<div className="manage_service_root" style={{ ...stylesChild }}>
			{showLabel ? (
				<Button
					className={cl` ${styles.header} ${open ? '' : styles.header_closed}`}
					style={{ ...styles }}
					onClick={() => setOpen(!open)}
				>
					<div style={{ padding: '14px 20px' }}>
						{!isChild && <div className={styles.heading}>{title}</div>}
						{message ? <div className={styles.err_msz}>{message}</div> : null}
					</div>

					<div className={styles.flex_row}>
						<div className={styles.icon_wrapper}>
							{open ? (
								<IcMArrowRotateUp color="#5936F0" style={stylesChildIcon} />
							) : (
								<IcMArrowRotateDown color="#5936F0" style={stylesChildIcon} />
							)}
						</div>
					</div>
				</Button>
			) : null}

			<div type={open ? 'enter' : 'exit'}>
				<div>{children}</div>
			</div>
		</div>
	);
}

export default ManageServices;
