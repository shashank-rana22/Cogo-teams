import { Tooltip } from '@cogoport/components';
import React, { useRef, useEffect, useState } from 'react';

import styles from './styles.module.css';

function OverflowCheck({ children }) {
	const containerRef = useRef(null);
	const [isOverflowing, setIsOverflowing] = useState(false);

	useEffect(() => {
		const container = containerRef?.current;
		if (container) {
			setIsOverflowing(container?.offsetWidth < container?.scrollWidth);
		}
	}, [children]);

	return (
		<div ref={containerRef}>
			{isOverflowing && typeof children !== 'object' ? (
				<div className={styles.tooltip_container}>
					<Tooltip
						content={children}
						placement="top"
						interactive
					>
						<div className={styles.tooltip_text} ref={containerRef}>{children}</div>
					</Tooltip>
				</div>
			) : children }
		</div>
	);
}

export default OverflowCheck;
