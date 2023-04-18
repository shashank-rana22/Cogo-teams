import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Footer({
	data = {},
	total = 0,
	announcementNumber = 0,
	setAnnouncementNumber = () => {},
	setShowModal = () => {},
	announcementViewed = () => {},
	isMobile = false,
}) {
	const router = useRouter();

	const { redirection_url = '' } = data;

	const handleViewed = async () => {
		await announcementViewed(data?.id);
		setShowModal(false);
	};

	const handleTakeMeThere = async (url) => {
		await announcementViewed(data?.id);
		setShowModal(false);
		router.push(url, url);
	};

	return (
		<div className={styles.buttons_container}>
			<div className={styles.prev_and_next}>
				<Button
					type="button"
					themeType="tertiary"
					size="md"
					disabled={announcementNumber === 0}
					style={{ marginRight: '20px' }}
					onClick={() => announcementNumber !== 0
                        && setAnnouncementNumber((prev) => prev - 1)}
				>
					Previous
				</Button>
				<Button
					type="button"
					button="type"
					themeType="tertiary"
					size="md"
					disabled={announcementNumber === total - 1}
					onClick={() => announcementNumber !== total - 1
                        && setAnnouncementNumber((prev) => prev + 1)}
				>
					Next
				</Button>
			</div>
			<div className={styles.ok_and_close}>
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
						{isMobile ? 'OK' : 'Ok, I Understood'}
					</Button>
				)}

			</div>
		</div>
	);
}

export default Footer;
