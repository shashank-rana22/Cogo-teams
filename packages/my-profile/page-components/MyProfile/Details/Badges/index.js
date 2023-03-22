import { Placeholder, Modal, Button, Tooltip } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { IcCStar } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import usePostProfileMasteryBadge from '../../../hooks/usePostProfileMasteryBadge';

import styles from './styles.module.css';

function Badges({ badgeListLoading, userBadges = {}, profileBadgeRefetch }) {
	const [masteryId, setMasteryId] = useState('');

	const {
		profile: { partner = {} },
	} = useSelector((state) => state);

	const { partner_user_id = '' } = partner || {};

	const {
		onPostingMastery = () => {},
	} = usePostProfileMasteryBadge(profileBadgeRefetch);

	const router = useRouter();

	const { badges_got : badgesGot = [], badges_not_got: badgesNotGot = [] } = userBadges || {};

	let max_badges = 0;

	const [show, setShow] = useState(false);

	const onClose = () => setShow(false);

	const handleClick = () => {
		if (partner_user_id) {
			router.push(
				'/badges/[user_id]/?path=/my-profile',
				`/badges/${partner_user_id}/?path=/my-profile`,
			);
		}
	};

	const handleSave = () => {
		const masteryPayload = {
			mastery_badge_id: masteryId,
			partner_user_id,
		};

		onPostingMastery(masteryPayload);

		onClose();
	};

	if (badgeListLoading) {
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
					<Placeholder width={400} height={60} style={{ borderRadius: '8px' }} />
				</div>
			</div>
		);
	}

	if (!badgesGot && !badgesNotGot) {
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

				<div style={{ marginTop: '40px', color: '#4f4f4f' }}>
					No badges created yet!
				</div>
			</div>
		);
	}

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
						badgesGot?.map((item, index) => {
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
													{[1, 2, 3].fill('').map(() => (
														<IcCStar width={10} stroke="#FFDF33" />
													))}
												</div>
											</Tooltip>
										</div>
									) : null
							);
						})
					}
					{
						badgesNotGot?.map((item, index) => {
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
													{[1, 2, 3].fill('').map(() => (
														<IcCStar width={10} stroke="#FFDF33" />
													))}
												</div>
											</Tooltip>
										</div>
									) : null
							);
						})
					}
				</div>
				<div
					role="presentation"
					onClick={handleClick}
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
				<Modal.Body className={styles.modal_body}>
					<p className={styles.lable}>
						Select the mastery badge to preview on your profile
					</p>

					<AsyncSelect
						placeholder="Select Mastery"
						size="sm"
						value={masteryId}
						onChange={(value) => setMasteryId(value)}
						asyncKey="badge_name"
						microService="allocation"
						initialCall
						isClearable
						params={{
							filters: {
								status                       : 'active',
								expertise_configuration_type : 'badge_configuration',
							},
						}}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button themeType="tertiary" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSave}>Save</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Badges;
