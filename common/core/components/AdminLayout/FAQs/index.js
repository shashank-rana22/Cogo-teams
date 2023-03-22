import { Modal } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React, { useState, useRef } from 'react';

import styles from './styles.module.css';
import TopicList from './TopicList';

function FAQs() {
	const [show, setShow] = useState(false);
	const { general:{ isMobile = false } } = useSelector((state) => state);

	const ballRef = useRef();

	function onDragHandler(ev) {
		const shiftX = ev.clientX;

		const shiftY = ev.clientY;

		if (shiftX && shiftY)ballRef.current.style = `top: ${shiftY - 30}px;left: ${shiftX - 30}px;`;
	}

	return (
		<div className={styles.container} draggable="false">
			<div draggable="false">
				<div
					size={400}
					className={styles.faq_icon}
					role="presentation"
					draggable="true"
					onDrag={(ev) => onDragHandler(ev)}
					ref={ballRef}
					onClick={() => { setShow(!show); }}
					onDragOver={(e) => e.preventDefault()}
				>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/faq-icon-final.svg"
						style={{ background: '#ffffff' }}
						alt="faq-icon"
						draggable="false"
						className={styles.FAQimage}
					/>
				</div>
			</div>
			<div />
			{show ? (
				<Modal
					className="primary lg"
					show={show}
					onClose={() => setShow(false)}
					placement={isMobile ? 'fullscreen' : 'right'}
					size={isMobile ? 'fullscreen' : ''}
					style={{ left: '99.5%' }}
				>
					<div className={styles.topiclist_container}>
						<TopicList />
					</div>
				</Modal>
			) : null}
		</div>
	);
}

export default FAQs;
