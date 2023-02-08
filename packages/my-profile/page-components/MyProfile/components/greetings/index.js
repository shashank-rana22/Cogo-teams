// import getField from '@cogo/business-modules/form/components';
import { Button, Modal, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
// import Avatar from '@cogoport/front/components/admin/Avatar';
import { IcMDelete, IcCCamera } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import ChangePassword from '../ChangePassword';

import getControls from './controls';
import GrantOutlookAccess from './GrantOutlookAccess';
import styles from './styles.module.css';

function Greetings({
	detailsData,
	setRefetch = () => {},
	partner_user_id = '',
}) {
	// const updateUserApi = useRequest(
	// 	'post',
	// 	false,
	// 	'partner',
	// )('/update_partner_user');

	const [trigger] = useRequest({
		url    : 'update_partner_user',
		method : 'post',
	}, { manual: false });

	const { name = '', picture = '' } = detailsData || {};

	const [showModal, setShowModal] = useState(false);

	const [changePasswordModal, setChangepasswordModal] = useState(false);

	// const FileUploader = getField('file');

	const controls = getControls(detailsData);

	// const { fields, handleSubmit, watch, setValues } = useForm(controls);
	const { handleSubmit, watch, setValues } = useForm(controls);

	const watchProfilePicture = watch('profile_picture_url');

	const onOuterClick = () => {
		setShowModal(false);
		setValues({
			profile_picture_url: picture,
		});
	};

	const onSubmit = async (values) => {
		try {
			const payload = {
				picture : values?.profile_picture_url,
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
		<>
			<div className={styles.image_upload_container}>
				<div
					className={styles.image_container}
					// className="primary sm"
					role="presentation"
					style={{ marginTop: '20px' }}
					onClick={() => setShowModal(true)}
				>
					{picture ? (
						<img src={picture} alt="loading" className="img" />
					) : (
						<div className={styles.avatar_container}>
							{/* <Avatar name={name} /> */}
							Avatar
						</div>
					)}
				</div>
				<div className={styles.camera_icon}>
					<IcCCamera
						onClick={() => setShowModal(true)}
						height={35}
						width={35}
						fill="#FF00FF"
						className="icon"
					/>
				</div>
			</div>
			<div className={styles.greeting_text}>
				Welcome,
				{name}
				!
			</div>

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
				<div className={styles.change_picture_text}>Change your profile picture</div>

				<div className={styles.picture_container}>
					<div style={{ paddingLeft: '20px', paddingTop: '20px' }}>
						<div style={{ maxWidth: 300 }}>
							<div className={styles.upload_picture_text}>Upload picture</div>
							{/* <FileUploader {...fields.profile_picture_url} /> */}
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
							<div className={styles.upload_picture_text} role="presentation" onClick={onDeleteButton}>
								Remove Picture
							</div>
						</div>
					</div>

					{picture ? (
						<img
							src={watchProfilePicture || picture}
							alt="loading"
							className="img"
						/>
					) : (
						<div className={styles.avatar_container}>
							{/* <Avatar name={name} /> */}
							Avatar
						</div>
					)}
				</div>

				<div className={styles.button_container}>
					<Button
						className="primary sm"
						onClick={onOuterClick}
						style={{ background: '#FFFFFF', color: '#393F70' }}
					>
						CANCEL
					</Button>
					<Button
						onClick={handleSubmit(onSubmit)}
						className="primary sm"
						type="submit"
					>
						SAVE
					</Button>
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
		</>
	);
}
export default Greetings;
