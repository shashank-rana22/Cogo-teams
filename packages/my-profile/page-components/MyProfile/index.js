import { Button, Modal, Loader } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

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
	const router = useRouter();

	const { t } = useTranslation(['profile']);

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
					<span className={styles.span}>{t('profile:welcome_label')}</span>
					{' '}
					{startCase(name)}
				</div>

				<div className={styles.change_password_container}>
					<div className={styles.notification_redirect}>
						<Button
							onClick={() => router.push('/notifications')}
						>
							{t('profile:notification_button')}
						</Button>
					</div>

					<Button
						className="primary sm"
						onClick={() => setChangepasswordModal(true)}
					>
						{t('profile:chanage_password_button')}
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
								<div className={styles.organization}>{t('profile:organization_hierarchy')}</div>

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
				<Modal.Header title={t('profile:update_password_label')} />

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
						{t('profile:cancel_button')}
					</Button>

					<Button
						disabled={apiLoading || !password}
						onClick={handleSubmit(onCreate, onError)}
						themeType="primary"

					>
						{t('profile:update_button')}
					</Button>

				</Modal.Footer>
			</Modal>
		</div>

	);
}

export default MyProfile;
