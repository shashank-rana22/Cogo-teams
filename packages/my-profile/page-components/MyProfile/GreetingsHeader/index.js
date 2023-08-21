/* eslint-disable max-lines-per-function */
import { Placeholder, Button, Modal, Avatar, Tooltip } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete, IcCCamera, IcMEdit } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import BadgeGotList from './BadgeGotList';
import PersonDetails from './PersonalDetails';
import EditPersonalDetails from './PersonalDetails/EditPersonalDetails';
import useEditPersonalDetails from './PersonalDetails/EditPersonalDetails/useEditPersonalDetails';
import styles from './styles.module.css';
import useUpdatePartnerUser from './useUpdatePartnerUser';

function Greetings({
	badgeListLoading = false,
	userBadges,
	detailsData,
	setRefetch = () => {},
	partner_user_id = '',
	showMobileVerificationModal,
	setShowMobileVerificationModal = () => {},
}) {
	const { t } = useTranslation(['profile']);

	const {
		name = '',
		picture = '',
		lowest_geo_location = {},
		status = '',
	} = detailsData || {};

	const {
		onOuterClick,
		setShowModal,
		onSubmit,
		setEditNameModal,
		editNameModal,
		control,
		errors,
		handleSubmit,
		showModal,
		onDeleteButton,
		watchProfilePicture,
		loading,
		onClickCancel,
	} = useUpdatePartnerUser({ picture, partner_user_id, setRefetch, detailsData });

	const { badges_got : badgesGot = [], grouped_badges_got : groupedBadgesGot = {} } = userBadges || {};

	const { badge_configuration = [] } = groupedBadgesGot || {};

	const mastery_element = badge_configuration.filter((
		item,
	) => item.status === 'profile')?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { name: locationName = '' } = lowest_geo_location || {};

	const { onCreate = () => {}, loading: apiLoading = false } = useEditPersonalDetails({
		refetch: setRefetch,
		detailsData,
		setShowModal,
		editNameModal,
		setEditNameModal,
		partner_user_id,
	});

	return (
		<div className={styles.main_container}>
			<div className={styles.empty_background} />

			<div className={styles.image_upload_container}>
				<div
					className={styles.image_container}
					role="presentation"
					style={{ marginTop: '6px' }}
					onClick={() => setShowModal(true)}
				>
					{picture ? (
						<div className={styles.image_container}>
							<img
								src={picture}
								alt="loading"
								className={styles.avatar_container}
							/>
						</div>
					) : (
						<div className={styles.avatar_container}>
							<Avatar personName={name} size="140px" />
						</div>
					)}
				</div>
				<div className={styles.camera_icon}>
					<IcCCamera
						onClick={() => setShowModal(true)}
						height={28}
						width={28}
						fill="#000000"
						className="icon"
					/>
				</div>

				{ badgeListLoading && (
					<div className={styles.preview_badge}>
						<Placeholder type="circle" radius="48px" />
					</div>
				)}

				{ !isEmpty(mastery_element) && !badgeListLoading
				&& (
					<div className={styles.preview_badge}>
						<img
							src={mastery_element.image_url}
							alt="current badge"
							height="40px"
						/>
					</div>
				)}
			</div>

			<div className={styles.badges}>
				<BadgeGotList
					badgesGot={badgesGot}
					badgeListLoading={badgeListLoading}
				/>
			</div>

			<div>
				<div className={styles.greeting_text}>

					<Tooltip content={name}>
						<div
							className={styles.name_wrapper}
						>
							{startCase(name)}

						</div>
					</Tooltip>
					,
					{' '}
					<div className={styles.location_name}>{locationName}</div>
					<div className={styles.pills_container}>
						{startCase(status)}
					</div>
					<div className={styles.head}>

						<IcMEdit
							size={1.8}
							onClick={() => setEditNameModal(
								(prev) => ({ ...prev, from: 'name', state: true }),
							)}
							style={{ cursor: 'pointer' }}
						/>

					</div>
				</div>
			</div>

			<Modal
				show={editNameModal.state}
				onClose={() => setEditNameModal((prev) => ({ ...prev, state: false }))}
				onOuterClick={onOuterClick}
				size="md"
			>
				<Modal.Header title={t('profile:edit_name_title')} />

				<Modal.Body>
					<EditPersonalDetails
						control={control}
						errors={errors}
						detailsData={detailsData}
						editNameModal={editNameModal}

					/>
				</Modal.Body>
				<Modal.Footer>
					<>
						<Button
							disabled={apiLoading}
							themeType="tertiary"
							onClick={onClickCancel}
							style={{ marginRight: '6px' }}

						>
							{t('profile:cancel_button')}
						</Button>
						<Button
							themeType="primary"
							disabled={apiLoading}
							onClick={handleSubmit(onCreate)}
						>
							{t('profile:update_button')}
						</Button>
					</>
				</Modal.Footer>
			</Modal>

			<PersonDetails
				detailsData={detailsData}
				showMobileVerificationModal={showMobileVerificationModal}
				setShowMobileVerificationModal={setShowMobileVerificationModal}
				editNameModal={editNameModal}
				setEditNameModal={setEditNameModal}
			/>

			<Modal
				show={showModal}
				onClose={onOuterClick}
				onOuterClick={onOuterClick}
			>
				<Modal.Header title={t('profile:change_your_profile_title')} />

				<Modal.Body>
					<div className={styles.modal_container}>

						<div className={styles.picture_container}>
							<div>
								<div className={styles.upload_picture_container}>
									<div className={styles.upload_picture_text}>{t('profile:upload_picture')}</div>

									<UploadController
										control={control}
										errors={errors}
										name="profile_picture_url"
										accept=".png, .jpeg"
										defaultValues={detailsData?.picture}

									/>
								</div>

							</div>

							{picture || watchProfilePicture ? (
								<div className={styles.image_container}>
									<img
										src={watchProfilePicture?.finalUrl || picture}
										alt="loading"
										className={styles.avatar_container}
									/>
								</div>
							) : (
								<div className={styles.avatar_container}>
									<Avatar personName={name} size="140px" />
								</div>
							)}
						</div>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<div className={styles.footer}>
						{(picture || watchProfilePicture)
						&& (
							<div className={styles.file_upload_container}>
								<div className={styles.delete_icon}>
									<IcMDelete
										height={18}
										width={20}
										className="icon"
										onClick={onDeleteButton}
									/>
								</div>

								<div
									role="presentation"
									onClick={onDeleteButton}
									className={styles.remove_picture_text}
								>
									{t('profile:remove_picture')}
								</div>
							</div>
						)}
						<div className={styles.button_container}>
							<Button
								className="secondary"
								onClick={onOuterClick}
								themeType="tertiary"
								disabled={loading}
							>
								{t('profile:cancel_button')}
							</Button>
							<Button
								onClick={handleSubmit(onSubmit)}
								className="primary sm"
								type="submit"
								loading={loading}
							>
								{t('profile:save_button')}
							</Button>
						</div>

					</div>

				</Modal.Footer>

			</Modal>

		</div>
	);
}
export default Greetings;
