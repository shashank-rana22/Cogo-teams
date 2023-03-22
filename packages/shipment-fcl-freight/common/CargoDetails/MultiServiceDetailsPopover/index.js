import { Popover, Button } from '@cogoport/components';
import React, { useState } from 'react';

import RenderCargoPills from '../RenderCargoPills';

import styles from './styles.module.css';

function MultiServiceDetailsPopover({
	children,
	mainServices,
	renderBody: renderBodyProp = null,
	showSingle = false,
	placement = null,
	withButton = true,
}) {
	const [show, setShow] = useState(false);

	if (mainServices?.length <= 1 && !showSingle) {
		return null;
	}

	const renderBody = () => (
		mainServices?.map((item, idx) => (idx !== 0 ? (
			<div className={styles.container}>
				<RenderCargoPills detail={item} className="details" />
			</div>
		) : null)));

	return (
		<Popover
			theme="light"
			show={show}
			placement={placement || 'bottom'}
			interactive
			onOuterClick={() => setShow(false)}
			trigger="mouseenter"
			content={renderBodyProp ? renderBodyProp() : renderBody()}
		>
			{withButton ? (
				<Button
					style={{
						background : 'none',
						padding    : 2,
						color      : '#366EFD',
						border     : 'none',
						height     : 'auto',
					}}
					onClick={() => setShow(false)}
				>
					{children}
				</Button>
			) : (
				{ children }
			)}
		</Popover>
	);
}
export default MultiServiceDetailsPopover;
