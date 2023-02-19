import { Button, Modal, Avatar } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';
import { IcMDelete, IcCCamera, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import PersonDetails from './PersonalDetails';
import EditPersonalDetails from './PersonalDetails/EditPersonalDetails';
import useEditPersonalDetails from './PersonalDetails/EditPersonalDetails/useEditPersonalDetails';
import styles from './styles.module.css';
import useUpdatePartnerUser from './useUpdatePartnerUser';

function Greetings({
	detailsData,
	setRefetch = () => {},
	partner_user_id = '',
	showMobileVerificationModal,
	setShowMobileVerificationModal = () => {},
}) {
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

	const { name: locationName = '' } = lowest_geo_location || {};

	const { onCreate = () => {}, loading: apiLoading = false } = useEditPersonalDetails({
		refetch: setRefetch,
		detailsData,
		setShowModal,
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
						<img
							src={picture}
							alt="loading"
							className={styles.avatar_container}
						/>
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
			</div>

			<div>
				<div className={styles.greeting_text}>
					{startCase(name)}
					,
					{' '}
					<div className={styles.location_name}>{locationName}</div>
					<div className={styles.pills_container}>
						{startCase(status)}
					</div>
					<div className={styles.head}>

						<IcMEdit
							size={1.8}
							onClick={() => setEditNameModal(true)}
							style={{ cursor: 'pointer' }}
						/>

					</div>
				</div>
			</div>

			<Modal
				show={editNameModal}
				onClose={() => setEditNameModal(false)}
				onOuterClick={onOuterClick}
				size="md"
			>
				<Modal.Header title="Edit Name" />

				<Modal.Body>
					<EditPersonalDetails
						control={control}
						errors={errors}
						detailsData={detailsData}
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
							CANCEL
						</Button>
						<Button
							themeType="primary"
							disabled={apiLoading}
							onClick={handleSubmit(onCreate)}
						>
							UPDATE
						</Button>
					</>
				</Modal.Footer>
			</Modal>

			<PersonDetails
				detailsData={detailsData}
				showMobileVerificationModal={showMobileVerificationModal}
				setShowMobileVerificationModal={setShowMobileVerificationModal}
			/>

			<Modal
				show={showModal}
				onClose={onOuterClick}
				onOuterClick={onOuterClick}
			>
				<Modal.Header title="Change your profile picture" />

				<Modal.Body>
					<div className={styles.modal_container}>

						<div className={styles.picture_container}>
							<div>
								<div className={styles.upload_picture_container}>
									<div className={styles.upload_picture_text}>Upload picture</div>

									<UploadController
										{...control}
										control={control}
										errors={errors}
										name="profile_picture_url"
										accept=".png, .jpeg"

									/>
								</div>

							</div>

							{picture || watchProfilePicture ? (
								<img
									src={watchProfilePicture?.finalUrl || picture}
									alt="loading"
									className={styles.avatar_container}
								/>
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
									Remove Picture
								</div>
							</div>
						)}
						<div className={styles.button_container}>
							<Button
								className="secondary"
								onClick={onOuterClick}
								themeType="tertiary"
							>
								CANCEL
							</Button>
							<Button
								onClick={handleSubmit(onSubmit)}
								className="primary sm"
								type="submit"
								disable={loading}
							>
								SAVE
							</Button>
						</div>

					</div>

				</Modal.Footer>

			</Modal>

		</div>
	);
}
export default Greetings;
