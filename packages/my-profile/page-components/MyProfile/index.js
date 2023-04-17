import { Button, Modal, Loader } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import useGetAllocationKamExpertiseProfile from '../../hooks/useGetAllocationKamExpertiseProfile';

import ChangePassword from './ChangePassword';
import useChangePassword from './ChangePassword/useChangePassword';
import Details from './Details';
import GrantOutlookAccess from './GreetingsHeader/GrantOutlookAccess';
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
		hideOrganizationHierarchy,
		patternError,
	} = useChangePassword({
		refetch,
		personDetails : detailsData,
		setShowModal  : setChangepasswordModal,
	});

	const {
		badgeListLoading = false,
		userBadges,
		profileBadgeRefetch,
	} = useGetAllocationKamExpertiseProfile(partner_user_id);

	const { name = '' } = detailsData || {};

	const { password = '' } = getValues();

	if (loading) {
		return (
			<div className={styles.loader_container}>
				<Loader className={styles.loader} />
			</div>
		);
	}

	return (
		<div className={styles.main_container_wrapper}>
			<div className={styles.greeting_container}>
				<div className={styles.main_heading}>
					<span className={styles.span}>Welcome!</span>
					{' '}
					{startCase(name)}
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
			</div>

			<div className={styles.main_container}>
				<div className={styles.container}>
					<div className={styles.header}>
						<Header
							badgeListLoading={badgeListLoading}
							userBadges={userBadges}
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
							badgeListLoading={badgeListLoading}
							userBadges={userBadges}
							profileBadgeRefetch={profileBadgeRefetch}
						/>

					</div>

				</div>

				{!hideOrganizationHierarchy
					? (
						<div>
							<div className={styles.organization_container}>
								<div className={styles.organization}>ORGANIZATION HIERARCHY</div>

								<Organization personDetails={detailsData} detailsLoading={loading} />
							</div>
						</div>
					)
					: null}
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
					password={password}
					patternError={patternError}

				/>
				<Modal.Footer>
					<Button
						onClick={() => setChangepasswordModal(false)}
						disabled={apiLoading}
						themeType="tertiary"
					>
						CANCEL
					</Button>

					<Button
						disabled={apiLoading || !password}
						onClick={handleSubmit(onCreate, onError)}
						themeType="primary"

					>
						UPDATE
					</Button>

				</Modal.Footer>
			</Modal>
		</div>

	);
}

export default MyProfile;
