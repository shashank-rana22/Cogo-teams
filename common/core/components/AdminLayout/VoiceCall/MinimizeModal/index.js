import { IcMProfile, IcMCall, IcMExpand } from '@cogoport/icons-react';
import React, { useState } from 'react';

import secsToDurationConverter from '../utils/secsToDurationConverter';

import styles from './styles.module.css';

function MinimizeModal({
	status = '',
	callLoading = false,
	counter = 0,
	receiverUserDetails = {},
	hangUpCall = () => {},
	hangUpLoading = false,
	setCallState = () => {},
}) {
	const {
		mobile_number = '',
		mobile_country_code = '',
		userName = '',
	} = receiverUserDetails || {};

	const [isDragging, setDragging] = useState(false);
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [position, setPosition] = useState({ top: 10, left: 250 });

	const handleMouseDown = (e) => {
		setDragging(true);
		setOffset({
			x : e.clientX - position.left,
			y : e.clientY - position.top,
		});
	};

	const handleMouseMove = (e) => {
		if (!isDragging) return;

		const newX = e.clientX - offset.x;
		const newY = e.clientY - offset.y;

		const maxX = window.innerWidth - 280;
		const maxY = window.innerHeight - 50;
		const boundedX = Math.max(0, Math.min(newX, maxX));
		const boundedY = Math.max(0, Math.min(newY, maxY));

		setPosition({
			left : boundedX,
			top  : boundedY,
		});
	};

	const handleMouseUp = () => {
		setDragging(false);
	};

	const handleEndClick = (e) => {
		e.stopPropagation();
		if (!hangUpLoading && !callLoading) {
			hangUpCall();
		}
	};

	return (
		<div
			className={styles.container}
			role="presentation"
			style={{ top: position.top, left: position.left }}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
		>
			<div className={styles.icon_section}>
				<div className={styles.maximize_icon}>
					<IcMExpand onClick={(e) => {
						e.stopPropagation();
						setCallState((p) => ({ ...p, showCallModalType: 'fullCallModal' }));
					}}
					/>
				</div>
				<div className={styles.avatar}>
					<IcMProfile width={20} height={20} />
				</div>
			</div>
			<div
				className={styles.details}
				role="presentation"
			>
				<div className={styles.min_number}>
					{userName || `${mobile_country_code} ${mobile_number}`
				|| 'Unkown User'}
				</div>
				<div className={styles.status_container}>
					<div className={styles.min_duration}>
						{status ? secsToDurationConverter(status, counter) : 'Connecting...'}
					</div>
				</div>
			</div>

			{!callLoading && status && (
				<div
					onClick={handleEndClick}
					role="presentation"
					className={styles.end_call}
					style={{ cursor: (hangUpLoading || callLoading) ? 'not-allowed' : 'pointer' }}
				>
					<IcMCall
						className={styles.end_call_icon}
					/>
				</div>
			)}
		</div>
	);
}

export default MinimizeModal;
