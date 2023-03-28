import { Modal } from '@cogoport/components';
import React, { useState, useRef, useEffect } from 'react';

import styles from './styles.module.css';
import TopicList from './TopicList';

function FAQs({
	faqNotificationApiLoading,
	fetchFaqNotification,
	faqNotificationData,
	refetch,
}) {
	const [show, setShow] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth < 768);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const ballRef = useRef();

	function handleIconDragStart(event) {
		event.stopPropagation();
	}

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
						onDragStart={handleIconDragStart}
					/>
				</div>
			</div>
			<div />
			{show ? (
				<Modal
					className={styles.modal_wrapper}
					show={show}
					onClose={() => setShow(false)}
					placement={isMobile ? 'fullscreen' : 'right'}
					size={isMobile ? 'md' : ''}
				>

					<div className={styles.topiclist_container}>
						<TopicList
							faqNotificationData={faqNotificationData}
							faqNotificationApiLoading={faqNotificationApiLoading}
							fetchFaqNotification={fetchFaqNotification}
							refetch={refetch}
						/>
					</div>
				</Modal>
			) : null}
		</div>
	);
}

export default FAQs;
