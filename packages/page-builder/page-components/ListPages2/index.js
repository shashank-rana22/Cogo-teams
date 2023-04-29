import React, { useRef } from 'react';

import Resizer from './Resizer';
import { Direction } from './Resizer/constants';
import styles from './styles.module.css';

function Panel({ children }) {
	const panelRef = useRef(null);

	const handleResize = (direction, movementX, movementY) => {
		const panel = panelRef.current;
		if (!panel) return;

		const { width, height, x, y } = panel.getBoundingClientRect();

		const resizeTop = () => {
			panel.style.height = `${height - movementY}px`;
			panel.style.top = `${y + movementY}px`;
		};

		const resizeRight = () => {
			panel.style.width = `${width + movementX}px`;
		};

		const resizeBottom = () => {
			panel.style.height = `${height + movementY}px`;
		};

		const resizeLeft = () => {
			panel.style.width = `${width - movementX}px`;
			panel.style.left = `${x + movementX}px`;
		};

		switch (direction) {
			case Direction.TopLeft:
				resizeTop();
				resizeLeft();
				break;

			case Direction.Top:
				resizeTop();
				break;

			case Direction.TopRight:
				resizeTop();
				resizeRight();
				break;

			case Direction.Right:
				resizeRight();
				break;

			case Direction.BottomRight:
				resizeBottom();
				resizeRight();
				break;

			case Direction.Bottom:
				resizeBottom();
				break;

			case Direction.BottomLeft:
				resizeBottom();
				resizeLeft();
				break;

			case Direction.Left:
				resizeLeft();
				break;

			default:
				break;
		}
	};

	return (
		<div className={styles.panel} ref={panelRef}>
			<div className={styles.panel__container}>
				<Resizer onResize={handleResize} />

				<div className={styles.panel__content}>
					{children}
				</div>
			</div>
		</div>
	);
}

export default Panel;
