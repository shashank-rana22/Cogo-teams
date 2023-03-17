import { Modal, Button, Select, Tooltip } from '@cogoport/components';
import { IcCStar } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import styles from './styles.module.css';

function Badges({ badgeList = {} }) {
	const router = useRouter();

	const { badges_got = [], badges_not_got = [] } = badgeList || {};

	let max_badges = 0;

	const [show, setShow] = useState(false);

	const onClose = () => setShow(false);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p className={styles.heading}>Badges List</p>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => 	setShow(true)}
				>
					<b>Select Badges To Preview</b>
				</Button>
			</div>
			<div className={styles.content}>

				<div className={styles.badge_list}>
					{
						badges_got?.map((item, index) => {
							max_badges += 1;
							return (
								(index < 5 && max_badges < 6)
									? (
										<div key={item.id}>
											<Tooltip content={item.medal}>
												<div className={styles.badge}>
													<img src={item.image_url} alt="badge icon" />
												</div>
												<div className={styles.stars}>
													{Array(3).fill('').map(() => (
														<IcCStar width={10} stroke="#FFDF33" />
													))}
												</div>
											</Tooltip>
										</div>
									) : ''
							);
						})
					}
					{
						badges_not_got?.map((item, index) => {
							max_badges += 1;
							return (
								(index < 5 && max_badges < 6)
									? (
										<div key={item.id} style={{ opacity: 0.2 }}>
											<Tooltip content={item.medal}>
												<div className={styles.badge}>
													<img src={item.image_url} alt="badge icon" />
												</div>
												<div className={styles.stars}>
													{Array(3).fill('').map(() => (
														<IcCStar width={10} stroke="#FFDF33" />
													))}
												</div>
											</Tooltip>
										</div>
									) : ''
							);
						})
					}
				</div>
				<div
					role="presentation"
					onClick={() => {
						router.push('/badges');
					}}
					className={styles.view_more}
				>
					View More

				</div>
			</div>

			<Modal
				size="sm"
				show={show}
				onClose={onClose}
				placement="center"
				closeOnOuterClick
			>
				<Modal.Header title="Preview Badges" />
				<Modal.Body style={{ height: '300px' }}>
					<p className={styles.lable}>
						Select the mastery badge to preview on your profile
					</p>

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

export default Badges;
