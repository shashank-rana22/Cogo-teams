import { Button, Modal, Avatar } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';
import { IcMDelete, IcCCamera, IcMEdit } from '@cogoport/icons-react';

import ChangePassword from '../ChangePassword';

// import GrantOutlookAccess from './GrantOutlookAccess';
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
		changePasswordModal,
		setChangepasswordModal,
		onClickCancel,
	} = useUpdatePartnerUser({ picture, partner_user_id, setRefetch, detailsData });

	const { name: locationName = '' } = lowest_geo_location || {};

	const { onCreate = () => {}, loading: apiLoading = false } = useEditPersonalDetails({
		refetch: setRefetch,
		detailsData,
		setShowModal,
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
					{name}
					,
					{' '}
					<div className={styles.location_name}>{locationName}</div>
					<div className={styles.head}>
						<IcMEdit
							size={1.8}
							onClick={() => setEditNameModal(true)}
							style={{ cursor: 'pointer', marginTop: '4px' }}
						/>

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
										themeType="secondary"
										onClick={onClickCancel}
										style={{ marginRight: 10 }}
									>
										CANCEL
									</Button>
									<Button
										className="primary sm"
										disabled={apiLoading}
										onClick={handleSubmit(onCreate)}
									>
										UPDATE
									</Button>
								</>
							</Modal.Footer>
						</Modal>
					</div>
				</div>
			</div>

			<PersonDetails
				detailsData={detailsData}
				refetch={setRefetch}
				partner_user_id={partner_user_id}
				showMobileVerificationModal={showMobileVerificationModal}
				setShowMobileVerificationModal={setShowMobileVerificationModal}
			/>

			{/* <div className={styles.change_password_container}>
				<Button
					className="primary sm"
					onClick={() => setChangepasswordModal(true)}
				>
					CHANGE PASSWORD
				</Button>
				<GrantOutlookAccess />
			</div> */}

			<Modal
				show={showModal}
				onClose={onOuterClick}
				onOuterClick={onOuterClick}
			>
				<div className={styles.modal_container}>
					<div className={styles.change_picture_text}>
						Change your profile picture
					</div>

					<div className={styles.picture_container}>
						<div>
							<div className={styles.upload_picture_container}>
								<div className={styles.upload_picture_text}>Upload picture</div>

								<div className={styles.upload_controller}>
									<UploadController
										control={control}
										errors={errors}
										name="profile_picture_url"
									/>
								</div>
							</div>

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
									className={styles.upload_picture_text}
									role="presentation"
									onClick={onDeleteButton}
								>
									Remove Picture
								</div>
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
								<Avatar name={name} />
							</div>
						)}
					</div>

					<div className={styles.button_container}>
						<Button
							className="secondary"
							onClick={onOuterClick}
							style={{ background: '#FFFFFF', color: '#393F70' }}
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
			</Modal>

			<Modal
				show={changePasswordModal}
				onClose={() => setChangepasswordModal(false)}
				onOuterClick={onOuterClick}
			>
				<ChangePassword
					personDetails={detailsData}
					setShowModal={setChangepasswordModal}
					refetch={setRefetch}
				/>
			</Modal>
		</div>
	);
}
export default Greetings;
