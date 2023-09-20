import { Modal } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef, useEffect } from 'react';

import FloatingWidgetPreview from '../Announcements/FloatingWidgetPreview';
import useGetAnnouncementList from '../Announcements/hooks/useGetAnnouncementList';

import styles from './styles.module.css';
import TopicList from './TopicList';

const MOBILE_DEVICE = 768;
const SHIFT_X = 30;
const SHIFT_Y = 30;

function FAQs({
	faqNotificationApiLoading,
	fetchFaqNotification,
	faqNotificationData,
	refetch,
}) {
	const dispatch = useDispatch();
	const profileData = useSelector(({ profile }) => profile);

	const { showFaq = false } = profileData || {};

	const router = useRouter();
	const { asPath } = router;

	const hideSupportIcon = !asPath.includes('/cogo-one/omni-channel');

	const [show, setShow] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [announcementModalData, setAnnouncementModalData] = useState({});

	const props = useGetAnnouncementList();

	const announcementProps = {
		...props,
		setAnnouncementModalData,
		announcementModalData,
	};

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth < MOBILE_DEVICE);
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

		if (shiftX && shiftY)ballRef.current.style = `top: ${shiftY - SHIFT_Y}px;left: ${shiftX - SHIFT_X}px;`;
	}

	const handleClose = () => {
		setShow(false);
		dispatch(
			setProfileState({
				...profileData,
				showFaq: false,
			}),
		);
	};

	return (
		<div className={styles.container} draggable="false">
			{hideSupportIcon && (
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
			)}

			<div />

			{(show || showFaq) ? (
				<Modal
					className={`${styles.modal_wrapper} ${!isEmpty(announcementModalData) && styles.increase_width}`}
					show={show || showFaq}
					onClose={handleClose}
					placement={isMobile ? 'fullscreen' : 'right'}
					size={isMobile ? 'md' : ''}
				>

					<div className={styles.modal_content}>
						<div className={`${styles.topiclist_container} 
						${!isEmpty(announcementModalData) && styles.hide_list}`}
						>
							<TopicList
								faqNotificationData={faqNotificationData}
								faqNotificationApiLoading={faqNotificationApiLoading}
								fetchFaqNotification={fetchFaqNotification}
								setModalData={setAnnouncementModalData}
								refetch={refetch}
								setShow={setShow}
								announcementProps={announcementProps}
								selectedAnnouncement={announcementModalData?.id}
							/>
						</div>

						{!isEmpty(announcementModalData) && (
							<div className={styles.announcement_preview_container}>
								<FloatingWidgetPreview
									fetchAnnouncements={announcementProps.fetchAnnouncements}
									setModalData={setAnnouncementModalData}
									setShow={setShow}
									isViewed={announcementModalData?.is_viewed}
									currentId={announcementModalData?.id}
									isMobile={isMobile}
								/>
							</div>
						)}

					</div>
				</Modal>
			) : null}
		</div>
	);
}

export default FAQs;
