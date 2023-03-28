import { Toast, Placeholder, Modal, Button, Tooltip } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { IcCStar } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import usePostProfileMasteryBadge from '../../../hooks/usePostProfileMasteryBadge';

import styles from './styles.module.css';

function Badges(props) {
	const { badgeListLoading, userBadges = {}, profileBadgeRefetch } = props;

	const {
		masteryId,
		setMasteryId,
		showModal,
		setShowModal,
		onCloseModal,
		onRedirectingToProfile,
		onSaveProfileMastery,
	} = usePostProfileMasteryBadge({ profileBadgeRefetch });

	const { badges_got : badgesGot = [], badges_not_got: badgesNotGot = [] } = userBadges;

	let max_badges = 0;

	if (badgeListLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<p className={styles.heading}>Badges</p>

					<Button
						size="md"
						themeType="secondary"
						onClick={() => 	setShowModal(true)}
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

	if (isEmpty(badgesGot) && isEmpty(badgesNotGot)) {
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<p className={styles.heading}>Badges</p>

					<Button
						size="md"
						themeType="secondary"
						onClick={() => Toast.default('You dont have any mastery!')}
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
				<p className={styles.heading}>Badges</p>

				<Button
					size="md"
					themeType="secondary"
					onClick={() => 	setShowModal(true)}
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
													{[1, 2, 3].map((itm) => (
														<div key={itm}>
															<IcCStar width={10} stroke="#FFDF33" />
														</div>
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
													{[1, 2, 3].map((itm) => (
														<div key={itm}>
															<IcCStar width={10} stroke="#FFDF33" />
														</div>
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
					onClick={onRedirectingToProfile}
					className={styles.view_more}
				>
					View More
				</div>
			</div>

			<Modal
				size="sm"
				show={showModal}
				onClose={onCloseModal}
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
					<Button themeType="tertiary" onClick={onCloseModal}>
						Cancel
					</Button>

					<Button onClick={onSaveProfileMastery}>Save</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Badges;
