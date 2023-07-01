import { Button, Loader } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Preview from '../AnnouncementModal/Preview';
import ANNOUNCEMENT_TYPE_MAPPING from '../constants/ANNOUNCEMENT_TYPE_MAPPING.json';
import useAnnouncementViewed from '../hooks/useAnnouncementViewed';
import useGetSingleAnnouncement from '../hooks/useGetSingleAnnouncement';

import styles from './styles.module.css';

function FloatingWidgetPreview(props) {
	const router = useRouter();

	const { setModalData, isViewed = false, isMobile = false, fetchAnnouncements, currentId = '', setShow } = props;

	const { announcementViewed, announcementViewedloading } = useAnnouncementViewed(fetchAnnouncements);
	const { announcementDetails: data, loadingSingleAnnouncement: loading } = useGetSingleAnnouncement(currentId);

	const { title = '', content = '', redirection_url = '', announcement_type = '' } = data;

	const handleViewed = async () => {
		await announcementViewed(data?.id);
		setModalData({});
	};

	const handleTakeMeThere = async (url) => {
		await announcementViewed(data?.id);
		router.push(url, url);
		setModalData({});
		setShow(false);
	};

	if (loading) {
		return (
			<div className={styles.loader_container}><Loader themeType="primary" className={styles.loader} /></div>
		);
	}

	if (isEmpty(data)) {
		return (
			<div className={styles.nothing_to_preview}>Something went wrong! Please try again</div>
		);
	}

	return (
		<div className={styles.container}>

			<div className={styles.cross_icon}>
				<IcMCross width={20} height={20} onClick={() => setModalData({})} />
			</div>

			<div className={styles.content_container}>

				<div className={styles.header}>
					<div className={styles.type_tag}>{ANNOUNCEMENT_TYPE_MAPPING[announcement_type]}</div>
					<div className={styles.title}>{title}</div>
				</div>

				<div className={styles.body}>
					<Preview
						data={data}
						editorValue={content.toString('html')}
						fromFloatingWidget
						isMobile={isMobile}
					/>
				</div>
			</div>

			<div className={styles.footer}>
				<div className={styles.buttons_container}>
					<Button
						type="button"
						themeType="secondary"
						size="md"
						onClick={() => setModalData({})}
						disabled={announcementViewedloading}
					>
						Close
					</Button>

					{!isViewed && redirection_url ? (
						<Button
							type="button"
							themeType="primary"
							size="md"
							onClick={handleTakeMeThere}
							style={{ marginLeft: '20px' }}
							loading={announcementViewedloading}
						>
							Ok, Take Me There
						</Button>
					) : null}

					{!isViewed ? (
						<Button
							type="button"
							themeType="primary"
							size="md"
							onClick={handleViewed}
							style={{ marginLeft: '20px' }}
							loading={announcementViewedloading}
						>
							{isMobile ? 'Ok' : 'Ok, I Understood'}
						</Button>
					) : null}

				</div>
			</div>
		</div>
	);
}

export default FloatingWidgetPreview;
