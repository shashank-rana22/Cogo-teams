// import getField from '@cogo/business-modules/form/components';
import { Button, Modal, Toast, Avatar } from '@cogoport/components';
import { useForm, UploadController } from '@cogoport/forms';
// import Avatar from '@cogoport/front/components/admin/Avatar';
import { IcMDelete, IcCCamera, IcMEdit } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import ChangePassword from '../ChangePassword';

// import getControls from './controls';
import GrantOutlookAccess from './GrantOutlookAccess';
import PersonDetails from './PersonalDetails';
import EditPersonalDetails from './PersonalDetails/EditPersonalDetails';
import styles from './styles.module.css';

function Greetings({
	detailsData,
	setRefetch = () => {},
	partner_user_id = '',
	showMobileVerificationModal,
	setShowMobileVerificationModal = () => {},
}) {
	// const updateUserApi = useRequest(
	// 	'post',
	// 	false,
	// 	'partner',
	// )('/update_partner_user');

	const [{ loading }, trigger] = useRequest({
		url    : '/update_partner_user',
		method : 'post',
	}, {
		manual: false,
	});

	const { name = '', picture = '', lowest_geo_location = {} } = detailsData || {};

	const { name:locationName = '' } = lowest_geo_location || {};

	const [showModal, setShowModal] = useState(false);

	const [editNameModal, setEditNameModal] = useState(false);

	const [changePasswordModal, setChangepasswordModal] = useState(false);

	// const FileUploader = getField('file');

	// const controls = getControls(detailsData);

	// const { fields, handleSubmit, watch, setValues } = useForm(controls);
	// const { handleSubmit, watch, setValues } = useForm(controls);
	const { handleSubmit, formState: { errors }, control, watch, setValue } = useForm();

	const watchProfilePicture = watch('profile_picture_url');

	const onOuterClick = () => {
		setShowModal(false);
		setEditNameModal(false);
		setValue('profile_picture_url', watchProfilePicture?.finalUrl || picture);
	};

	const onSubmit = async (values) => {
		try {
			const payload = {
				picture : values?.profile_picture_url?.finalUrl,
				id      : partner_user_id,
			};

			await trigger({
				data: payload,
			});

			setRefetch();
			// eslint-disable-next-line no-undef
			window.location.reload();

			setShowModal(false);
			Toast.success('Image updated successfully!');
		} catch (e) {
			Toast.error(e?.data);
		}
	};

	const onDeleteButton = async () => {
		try {
			const payload = {
				picture : null,
				id      : partner_user_id,
			};

			await trigger({
				data: payload,
			});

			setRefetch();
			// eslint-disable-next-line no-undef
			window.location.reload();

			setShowModal(false);
			Toast.success('Image updated successfully!');
		} catch (e) {
			Toast.error(e?.data);
		}
	};

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
					<div className={styles.location_name}>
						{locationName}
					</div>

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
							width={540}
						>
							<EditPersonalDetails
								detailsData={detailsData}
								setShowModal={setEditNameModal}
								refetch={setRefetch}
								partner_user_id={partner_user_id}
							/>
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

			<div className={styles.change_password_container}>
				<Button
					className="primary sm"
					onClick={() => setChangepasswordModal(true)}
				>
					CHANGE PASSWORD
				</Button>
				<GrantOutlookAccess />
			</div>

			<Modal
				show={showModal}
				onClose={onOuterClick}
				onOuterClick={onOuterClick}
			>
				<div className={styles.modal_container}>
					<div className={styles.change_picture_text}>Change your profile picture</div>

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
