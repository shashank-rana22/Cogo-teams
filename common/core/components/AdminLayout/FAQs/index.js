import { Modal } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

import styles from './styles.module.css';
import TopicList from './TopicList';

function FAQs() {
	const [show, setShow] = useState(false);
	const { general:{ isMobile = false } } = useSelector((state) => state);

	const handleShow = () => {
		setShow(true);
	};

	const isDraggingRef = useRef(false);

	const onDrag = () => {
		isDraggingRef.current = true;
	};

	const onStop = () => {
		if (!isDraggingRef.current) {
			handleShow();
		}
		isDraggingRef.current = false;
	};

	return (
		<div className={styles.container}>
			<Draggable onStop={onStop} onDrag={onDrag}>
				<div size={400} className={styles.faq_icon}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/faq-icon-final.svg"
						style={{ background: '#ffffff' }}
						alt="faq-icon"
					/>
				</div>
			</Draggable>
			{show ? (
				<Modal
					className="primary lg"
					show={show}
					onClose={() => setShow(false)}
					placement={isMobile ? 'fullscreen' : 'right'}
					size={isMobile ? 'fullscreen' : ''}
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
