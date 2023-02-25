import { Button, Modal, Select } from '@cogoport/components';
import { IcCStar } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function ProfileBadgeCard() {
	const [show, setShow] = useState(false);
	const badgeUrl = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg';

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
					<img className={styles.badge} src={badgeUrl} alt="" />
					<div className={styles.stars_container}>
						<IcCStar width={24} stroke="#FFDF33" />
						<IcCStar width={24} stroke="#FFDF33" />
						<IcCStar width={24} stroke="#FFDF33" />
					</div>
				</div>
				<div className={styles.container}>
					<img className={styles.badge} src={badgeUrl} alt="" />
					<div className={styles.stars_container}>
						<IcCStar width={24} stroke="#FFDF33" />
						<IcCStar width={24} stroke="#FFDF33" />
						<IcCStar width={24} stroke="#FFDF33" />
					</div>
				</div>
			</div>

			{/* <a className={styles.view_more}>View More</a> */}

			<Modal
				size="sm"
				show={show}
				onClose={onClose}
				placement="center"
				closeOnOuterClick
			>
				<Modal.Header title="Preview Badges" />
				<Modal.Body>
					<p className={styles.lable}>
						Select the mastery badge to preview on your profile
					</p>
					Select Mastery Badge

					<Select placeholder="Multimodal Mastery" />

					Eu do culpa occaecat veniam aute incididunt
					ipsum eiusmod do excepteur exercitation. Non minim esse ex amet amet
					aliqua enim incididunt reprehenderit culpa commodo deserunt. Nisi minim
					aute labore cillum exercitation amet. Esse Lorem adipisicing dolor sunt
					culpa ipsum ut laborum incididunt nostrud. Ipsum fugiat duis cupidatat
					ipsum et ex. Et aliquip nostrud ad in sit.

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
