import { Popover, cl, Button } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function KebabContent({
	setShowModal = () => {},
	invoice = {},
}) {
	const [show, setShow] = useState(false);

	const handleClick = (modalName) => {
		setShowModal(modalName);
		setShow(false);
	};

	return (
		<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>
			{invoice?.status === 'pending' ? (
				<Popover
					interactive
					placement="bottom"
					visible={show}
					className={styles.popover_content}
					onClickOutside={() => setShow(false)}
					content={(
						<Button
							themeType="tertiary"
							className={styles.text}
							onClick={() => handleClick('edit_invoice')}
						>
							Edit Invoice
						</Button>
					)}
				>
					<Button
						themeType="tertiary"
						className={styles.icon_more_wrapper}
						onClick={() => setShow(!show)}
					>
						<IcMOverflowDot width={16} height={16} />
					</Button>
				</Popover>
			) : (
				<div className={styles.empty_div} />
			)}
		</div>
	);
}

export default KebabContent;
