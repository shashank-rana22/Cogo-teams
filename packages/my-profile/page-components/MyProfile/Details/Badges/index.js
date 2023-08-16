import { Placeholder, Modal, Button, Tooltip } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { IcMStarfull } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import BADGE_STARS_CLASSNAME_MAPPING from '../../../../constants/badge-stars-mapping';
import usePostProfileMasteryBadge from '../../../../hooks/usePostProfileMasteryBadge';

import styles from './styles.module.css';

const BADGE_LENGTH_ONE = 1;
const BADGE_LENGTH_TWO = 2;
const BADGE_LENGTH_THREE = 3;
const BADGE_LENGTH_FIVE = 5;
const BADGE_LENGTH_SIX = 6;

function Badges(props) {
	const { t } = useTranslation(['profile']);

	const {
		profile: { partner = {} },
	} = useSelector((state) => state);

	const { partner_user_id = '' } = partner;

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
					<Placeholder width={100} height={24} style={{ borderRadius: '4px' }} />

					<Placeholder width={200} height={24} style={{ borderRadius: '4px' }} />
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
					<p className={styles.heading}>{t('profile:badges')}</p>

					<Button
						size="md"
						themeType="secondary"
						disabled
						style={{ border: '0' }}
					>
						<b>{t('profile:badges_to_preview')}</b>
					</Button>
				</div>

				<Tooltip
					content={t('profile:empty_badges_message')}
					placement="top"
					className={styles.tooltip}
				>
					<div className={styles.empty}>
						{[...Array(BADGE_LENGTH_FIVE).keys()].map((item) => (
							<div key={item} className={styles.empty_boxes} />
						))}
					</div>
				</Tooltip>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p className={styles.heading}>{t('profile:badges')}</p>

				<Button
					size="md"
					themeType="secondary"
					onClick={() => 	setShowModal(true)}
				>
					<b>{t('profile:badges_to_preview')}</b>
				</Button>
			</div>

			<div className={styles.content}>
				<div className={styles.badge_list}>
					{badgesGot?.map((item, index) => {
						const {	id = '', medal = '', badge_name	= '', image_url } = item;

						const badgeClassName = BADGE_STARS_CLASSNAME_MAPPING[medal]?.upper_limit;

						max_badges += BADGE_LENGTH_ONE;

						return (
							(index < BADGE_LENGTH_FIVE && max_badges < BADGE_LENGTH_SIX)
								? (
									<div key={id}>
										<Tooltip content={`${badge_name} ${startCase(medal || '')}`}>
											<div className={styles.badge}>
												<img src={image_url} alt="badge icon" />
											</div>

											<div className={styles.stars}>
												{[BADGE_LENGTH_ONE, BADGE_LENGTH_TWO, BADGE_LENGTH_THREE].map((itm) => (
													<div key={itm}>
														<IcMStarfull
															width={10}
															fill={itm <= badgeClassName ? '#FFDF33' : '#BDBDBD'}
														/>
													</div>
												))}
											</div>
										</Tooltip>
									</div>
								) : null
						);
					})}

					{badgesNotGot?.map((item, index) => {
						const {	id = '', medal = '', badge_name	= '', image_url = '' } = item;

						const badgeClassName = BADGE_STARS_CLASSNAME_MAPPING[medal]?.upper_limit;

						max_badges += BADGE_LENGTH_ONE;

						return (
							(index < BADGE_LENGTH_FIVE && max_badges < BADGE_LENGTH_SIX)
								? (
									<div key={id} style={{ opacity: 0.2 }}>
										<Tooltip content={`${badge_name} ${startCase(medal || '')}`}>
											<div className={styles.badge}>
												<img src={image_url} alt="badge icon" />
											</div>

											<div className={styles.stars}>
												{[BADGE_LENGTH_ONE, BADGE_LENGTH_TWO, BADGE_LENGTH_THREE].map((itm) => (
													<div key={itm}>
														<IcMStarfull
															width={10}
															fill={itm <= badgeClassName ? '#FFDF33' : '#BDBDBD'}
														/>
													</div>
												))}
											</div>
										</Tooltip>
									</div>
								) : null
						);
					})}
				</div>

				<div
					role="presentation"
					onClick={onRedirectingToProfile}
					className={styles.view_more}
				>
					{t('profile:view_more_label')}
				</div>
			</div>

			<Modal
				size="sm"
				show={showModal}
				onClose={onCloseModal}
				placement="center"
				closeOnOuterClick
			>
				<Modal.Header title={t('profile:preview_badges_label')} />

				<Modal.Body className={styles.modal_body}>
					<p className={styles.lable}>
						{t('profile:preview_badge_on_profile')}
					</p>

					<AsyncSelect
						placeholder={t('profile:select_mastery_placeholder')}
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
								partner_user_id,
							},
						}}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button
						themeType="tertiary"
						onClick={onCloseModal}
						style={{ marginRight: '4px' }}
					>
						{t('profile:cancel_badge_button')}
					</Button>

					<Button
						onClick={onSaveProfileMastery}
						disabled={!masteryId}

					>
						{t('profile:save_badge_button')}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Badges;
