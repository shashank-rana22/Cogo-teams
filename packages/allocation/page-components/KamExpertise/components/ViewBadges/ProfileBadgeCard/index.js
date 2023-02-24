import { Button, Modal, Select } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function ProfileBadgeCard() {
	const [show, setShow] = useState(false);
	const badgeUrl = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg';

	const starUrl = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/star-icon.svg';

	const onClose = () => setShow(false);

	return (
		<div className={styles.main_container}>
			<div className={styles.sub_container}>
				<p className={styles.heading}>Badges(4)</p>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => 	setShow(true)}
				>
					Select Badges To Preview
				</Button>
			</div>
			<div className={styles.badges_container}>
				<div className={styles.container}>
					<img className={styles.badge} src={badgeUrl} alt="badge-img" />
					<div className={styles.stars_container}>
						<img className={styles.small_star} src={starUrl} alt="badge-img" />
						<img className={styles.small_star} src={starUrl} alt="badge-img" />
						<img className={styles.small_star} src={starUrl} alt="badge-img" />
					</div>
				</div>
			</div>

			{/* <a className={styles.view_more}>View More</a> */}

			<Modal
				size="sm"
				show={show}
				onClose={onClose}
				placement="bottom"
				closeOnOuterClick
			>
				<Modal.Header title="Preview Badges" />
				<Modal.Body>
					<p className={styles.lable}>
						Select the mastery badge to preview on your profile
					</p>
					Select Mastery Badge
					<Select placeholder="Multimodal Mastery" />
				</Modal.Body>
				<Modal.Footer>
					<Button themeType="tertiary" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={onClose}>Save</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ProfileBadgeCard;
