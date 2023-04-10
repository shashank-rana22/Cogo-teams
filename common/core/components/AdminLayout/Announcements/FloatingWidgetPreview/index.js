import { Button, Loader } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import Preview from '../AnnouncementModal/Preview';
// import ANNOUNCEMENT_TYPE_MAPPING from '../constants/ANNOUNCEMENT_TYPE_MAPPING.json';

import styles from './styles.module.css';

function FloatingWidgetPreview(props) {
	const router = useRouter();

	const { data = {}, announcementViewed, setShowModal, loading = false } = props;

	const { title = '', content = '', redirection_url = '' } = data;

	const handleViewed = async () => {
		await announcementViewed(data?.id);
		setShowModal(false);
	};

	const handleTakeMeThere = async (url) => {
		await announcementViewed(data?.id);
		setShowModal(false);
		router.push(url, url);
	};

	if (loading) {
		return (
			<div className={styles.loader_container}><Loader themeType="primary" className={styles.loader} /></div>
		);
	}

	return (
		<div className={styles.container}>

			<div className={styles.content_container}>

				<div className={styles.header}>
					{/* <div className={styles.type_tag}>{ANNOUNCEMENT_TYPE_MAPPING[announcement_type]}</div> */}
					<div className={styles.title}>{title}</div>
				</div>

				<div className={styles.body}>
					<Preview data={data} editorValue={content.toString('html')} />
				</div>
			</div>

			<div className={styles.footer}>
				<div className={styles.buttons_container}>
					<Button
						type="button"
						themeType="secondary"
						size="md"
						style={{ marginRight: '20px' }}
						onClick={() => setShowModal(false)}
					>
						Close
					</Button>

					{redirection_url ? (
						<Button
							type="button"
							themeType="primary"
							size="md"
							onClick={handleTakeMeThere}
						>
							Ok, Take Me There
						</Button>
					) : (
						<Button
							type="button"
							themeType="primary"
							size="md"
							onClick={handleViewed}
						>
							Ok, I Understood
						</Button>
					)}

				</div>
			</div>
		</div>
	);
}

export default FloatingWidgetPreview;
