import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import ANNOUNCEMENT_TYPE_MAPPING from '../constants/ANNOUNCEMENT_TYPE_MAPPING.json';
import useAnnouncementViewed from '../hooks/useAnnouncementViewed';

import Footer from './Footer';
import Preview from './Preview';
import styles from './styles.module.css';

function AnnouncementModal({ data = [] }) {
	const [singleModaldata, setSingleModaldata] = useState({});
	const [announcementNumber, setAnnouncementNumber] = useState(0);
	const [showModal, setShowModal] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (window.innerWidth < 768) {
			setIsMobile(true);
		}

		function handleResize() {
			setIsMobile(window.innerWidth < 768);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const { announcementViewed } = useAnnouncementViewed();

	const total = data?.length;

	useEffect(() => {
		setSingleModaldata(data?.[announcementNumber]);
	}, [announcementNumber, data]);

	const { announcement_type = '', title = '', content = '' } = singleModaldata || {};

	const getModalHeader = () => (
		<div className={styles.modal_header_container}>
			<div className={styles.type_tag}>{ANNOUNCEMENT_TYPE_MAPPING[announcement_type]}</div>
			<div className={styles.title}>{title}</div>
		</div>
	);

	return (
		<div className={styles.container}>
			{!isEmpty(total) && showModal ? (

				<Modal
					show={data.length > 0}
					size={isMobile ? 'fullscreen' : 'lg'}
					placement="center"
					closeOnOuterClick={false}
					onClose={() => setShowModal(false)}
					className={styles.modal}
				>
					<Modal.Header title={getModalHeader()} style={{ paddingTop: 0, paddingLeft: 0 }} />

					<Modal.Body className={styles.preview_modal_body}>
						<Preview
							data={singleModaldata}
							editorValue={content.toString('html')}
							isMobile={isMobile}
						/>
					</Modal.Body>

					<Modal.Footer>

						<Footer
							data={singleModaldata}
							total={total}
							announcementNumber={announcementNumber}
							setAnnouncementNumber={setAnnouncementNumber}
							setShowModal={setShowModal}
							announcementViewed={announcementViewed}
							isMobile={isMobile}
						/>

					</Modal.Footer>

				</Modal>

			) : null}
		</div>
	);
}

export default AnnouncementModal;
