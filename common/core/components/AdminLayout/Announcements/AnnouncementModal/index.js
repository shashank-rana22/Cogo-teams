import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import Footer from './Footer';
import Preview from './Preview';
import styles from './styles.module.css';
import useAnnouncementViewed from './useAnnouncementViewed';

const ANNOUNCEMENT_TYPE_MAPPING = {
	general        : 'General',
	product_update : 'Product Release / Update',
	announcement   : 'Announcement',
	tasks          : 'Tasks',
};

function AnnouncementModal({ data = [] }) {
	const [singleModaldata, setSingleModaldata] = useState({});
	const [announcementNumber, setAnnouncementNumber] = useState(0);
	const [showModal, setShowModal] = useState(true);

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
					size="lg"
					placement="center"
					closeOnOuterClick={false}
					onClose={() => setShowModal(false)}
				>
					<Modal.Header title={getModalHeader()} style={{ paddingTop: 0, paddingLeft: 0 }} />

					<Modal.Body className={styles.preview_modal_body}>
						<Preview
							data={singleModaldata}
							editorValue={content.toString('html')}
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
						/>

					</Modal.Footer>

				</Modal>

			) : null}
		</div>
	);
}

export default AnnouncementModal;
