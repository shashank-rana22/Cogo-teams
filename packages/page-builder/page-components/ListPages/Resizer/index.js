import React, { useState, useEffect } from 'react';

import { Direction } from './constants';
import styles from './styles.module.css';

function Resizer({ onResize }) {
	const [direction, setDirection] = useState('');
	const [mouseDown, setMouseDown] = useState(false);

	useEffect(() => {
		const handleMouseMove = (e) => {
			if (!direction) return;

			const ratio = window.devicePixelRatio;

			onResize(direction, e.movementX / ratio, e.movementY / ratio);
		};

		if (mouseDown) {
			window.addEventListener('mousemove', handleMouseMove);
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, [mouseDown, direction, onResize]);

	useEffect(() => {
		const handleMouseUp = () => setMouseDown(false);

		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, []);

	const handleMouseDown = (direct) => () => {
		setDirection(direct);
		setMouseDown(true);
	};

	return (
		<>
			<div
				role="presentation"
				className={styles.top_left}
				onMouseDown={handleMouseDown(Direction.TopLeft)}
			/>

			<div
				role="presentation"
				className={styles.top}
				onMouseDown={handleMouseDown(Direction.Top)}
			/>

			<div
				role="presentation"
				className={styles.top_right}
				onMouseDown={handleMouseDown(Direction.TopRight)}
			/>

			<div
				role="presentation"
				className={styles.right}
				onMouseDown={handleMouseDown(Direction.Right)}
			/>

			<div
				role="presentation"
				className={styles.right_bottom}
				onMouseDown={handleMouseDown(Direction.BottomRight)}
			/>

			<div
				role="presentation"
				className={styles.bottom}
				onMouseDown={handleMouseDown(Direction.Bottom)}
			/>

			<div
				role="presentation"
				className={styles.bottom_left}
				onMouseDown={handleMouseDown(Direction.BottomLeft)}
			/>

			<div
				role="presentation"
				className={styles.left}
				onMouseDown={handleMouseDown(Direction.Left)}
			/>
		</>
	);
}

export default Resizer;
