import { Modal } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import React, { useState, useRef, useEffect } from 'react';

import useAnnouncementViewed from '../Announcements/AnnouncementModal/useAnnouncementViewed';
import FloatingWidgetPreview from '../Announcements/FloatingWidgetPreview';
import useGetAnnouncementList from '../Announcements/hooks/useGetAnnouncementList';
import useGetSingleAnnouncement from '../Announcements/hooks/useGetSingleAnnouncement';

import styles from './styles.module.css';
import TopicList from './TopicList';

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
	const [announcementModalData, setAnnouncementModalData] = useState(false);

	const { announcementDetails, loadingSingleAnnouncement } =		useGetSingleAnnouncement(announcementModalData?.id);

	const props = useGetAnnouncementList();

	const { announcementViewed, announcementViewedloading } = useAnnouncementViewed(props?.fetchAnnouncements);

	const announcementProps = {
		...props,
		setAnnouncementModalData,
		announcementModalData,
	};

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

	const handleClose = () => {
		setShow(false);
		dispatch(
			setProfileState({
				...profileData,
				showFaq: false,
			}),
		);
	};

	const getModalSize = () => {
		if (isMobile) return 'md';
		if (announcementModalData) return 'fullscreen';
		return '';
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
					className={styles.modal_wrapper}
					show={show || showFaq}
					onClose={handleClose}
					placement={isMobile ? 'fullscreen' : 'right'}
					size={getModalSize()}
				>

					<div className={styles.modal_content}>
						<div className={styles.topiclist_container}>
							<TopicList
								faqNotificationData={faqNotificationData}
								faqNotificationApiLoading={faqNotificationApiLoading}
								fetchFaqNotification={fetchFaqNotification}
								refetch={refetch}
								announcementProps={announcementProps}
							/>
						</div>
						{announcementModalData && (
							<div className={styles.announcement_preview_container}>
								<FloatingWidgetPreview
									loading={loadingSingleAnnouncement}
									announcementViewedloading={announcementViewedloading}
									data={announcementDetails}
									announcementViewed={announcementViewed}
									setShowModal={setAnnouncementModalData}
									setShow={setShow}
									// isViewed={announcementModalData?.is_viewed}
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
