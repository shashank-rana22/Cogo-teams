import { Button, Modal } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import ChangePassword from './ChangePassword';
import useChangePassword from './ChangePassword/useChangePassword';
import Details from './Details';
import Header from './Header';
import Organization from './Organization';
import styles from './styles.module.css';
import useMyDetails from './useMyDetails';

function MyProfile() {
	const {
		profile: { partner = {} },
	} = useSelector((state) => state);

	const { partner_user_id = '' } = partner || {};

	const {
		detailsData,
		refetch = () => {},
		loading = false,
		showMobileVerificationModal,
		setShowMobileVerificationModal,
		changePasswordModal,
		setChangepasswordModal,
	} = useMyDetails(partner_user_id);

	const {
		onCreate = () => {},
		onError = () => {},
		loading:apiLoading = false,
		control,
		errors,
		handleSubmit = () => {},
		getValues,
	} = useChangePassword({
		refetch,
		personDetails : detailsData,
		setShowModal  : setChangepasswordModal,
	});

	const { name = '' } = detailsData || {};

	return (
		<>
			<div className={styles.greeting_container}>
				<div className={styles.main_heading}>
					<span className={styles.span}>Welcome!</span>
					{' '}
					{name}
				</div>

				<div className={styles.change_password_container}>
					<Button
						className="primary sm"
						onClick={() => setChangepasswordModal(true)}
					>
						CHANGE PASSWORD
					</Button>
					{/* <GrantOutlookAccess /> */}
				</div>
			</div>

			<div className={styles.main_container}>
				<div className={styles.container}>
					<div className={styles.header}>
						<Header
							detailsData={detailsData}
							setRefetch={refetch}
							partner_user_id={partner_user_id}
							showMobileVerificationModal={showMobileVerificationModal}
							setShowMobileVerificationModal={setShowMobileVerificationModal}
						/>
					</div>

					<div className={styles.details}>
						<Details
							detailsData={detailsData}
							refetch={refetch}
							showMobileVerificationModal={showMobileVerificationModal}
							setShowMobileVerificationModal={setShowMobileVerificationModal}
						/>

					</div>

				</div>

				<div>
					<div className={styles.organization_container}>
						<div className={styles.organization}>ORGANIZATION HIERARCHY</div>
						<Organization personDetails={detailsData} detailsLoading={loading} />
					</div>
				</div>
			</div>
			<Modal
				show={changePasswordModal}
				onClose={() => setChangepasswordModal(false)}
				onOuterClick={() => setChangepasswordModal(false)}
			>
				<Modal.Header title="Update Password" />
				<ChangePassword
					control={control}
					errors={errors}
					getValues={getValues}

				/>
				<Modal.Footer>
					<Button
						onClick={() => setChangepasswordModal(false)}
						disabled={apiLoading}
						themeType="secondary"
						style={{ marginRight: '10px' }}
					>
						CANCEL
					</Button>

					<Button
						disabled={apiLoading}
						onClick={handleSubmit(onCreate, onError)}
						themeType="primary"
					>
						UPDATE
					</Button>

				</Modal.Footer>
			</Modal>
		</>

	);
}

export default MyProfile;
