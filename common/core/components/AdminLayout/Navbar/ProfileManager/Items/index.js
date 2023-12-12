// import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
// import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import SwitchAccounts from '../../SwitchAccounts';

import styles from './styles.module.css';

const SESSION_DISABLED = ['logout', 'logout_all_accounts'];

const TOTAL_TIME = 1000;
const THIRTY_SECONDS = 30;
// const MAX_NOTIFICATION_COUNT = 99;
const ZERO = 0;
const ONE = 1;
const TWO = 2;

function ProfileAvatar({ picture = '' }) {
	return (
		<div className={styles.inner_image_container}>
			<img
				src={picture || GLOBAL_CONSTANTS.image_url.user_avatar_image}
				alt="avatar-placeholder"
			/>
		</div>
	);
}

function SingleNav({
	name = '',
	setShowSubNav = () => {},
	showSubNav = false,
	picture = '',
}) {
	return (
		<div
			className={styles.list_item_inner}
			role="presentation"
			onClick={() => setShowSubNav(!showSubNav)}
		>
			<ProfileAvatar picture={picture} />

			<span className={styles.profile_name}>{name}</span>
			<IcMArrowRotateDown
				style={{
					marginRight : 10,
					transform   : showSubNav ? 'rotate(360deg)' : 'rotate(270deg)',
				}}
			/>
		</div>
	);
}

function Items({
	item = [],
	// resetSubnavs = false,
	setOpenPopover = () => {},
	timeLeft = '',
	loading = false,
	openPopover = false,
	refetch = () => {},
	checkIfSessionExpiring = false,
	notificationCount = ZERO,
	// notificationPopover = false,
	setNotificationPopover = () => {},
	// mobileShow = false,
}) {
	// const { t } = useTranslation(['common']);

	const {
		user_data,
		userSessionMappings,
		// query,
	} = useSelector(({ profile, general }) => ({
		user_data           : profile?.user || {},
		userSessionMappings : profile?.user_session_mappings || [],
		query               : general?.query || {},
	}));

	// const { partner_id = '' } = query || {};

	const [showSubNav, setShowSubNav] = useState(false);

	// const redirect = () => {
	// 	// eslint-disable-next-line no-undef
	// 	window.location.href = '/v2/login?source=add_account';
	// };

	const { picture = '', name = '' } = user_data;

	const handlePopover = () => {
		setOpenPopover(!openPopover);
		setNotificationPopover(false);
	};

	// const handleNotificationClick = () => {
	// 	if (mobileShow) {
	// 		window.location.href = `/v2/${partner_id}/notifications`;
	// 	} else {
	// 		setOpenPopover(false);
	// 		setNotificationPopover(!notificationPopover);
	// 	}
	// };

	let activeUser = {};
	(userSessionMappings || []).forEach((user) => {
		if (user_data?.id === user?.user_id) {
			activeUser = user;
		}
	});

	const { expire_at = '' } = activeUser || {};
	const expire_time = new Date(expire_at).getTime();

	const lessThan30Seconds = Number(timeLeft) >= Number(expire_time / TOTAL_TIME - THIRTY_SECONDS);

	const loadingState = checkIfSessionExpiring || lessThan30Seconds || loading;

	// useEffect(() => {
	// 	setShowSubNav(false);
	// 	setOpenPopover(false);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [resetSubnavs]);

	return (
		<>
			<div className={styles.container}>
				<SingleNav
					name={name}
					setShowSubNav={setShowSubNav}
					showSubNav={showSubNav}
					notificationCount={notificationCount}
					picture={picture}
				/>
				{(item || []).map((singleOption) => {
					const disable_check = SESSION_DISABLED.includes(
						singleOption?.name,
					);

					if (
						singleOption?.name === 'switch_account'
                        && userSessionMappings?.length <= ONE
					) {
						return null;
					}

					return (
						<div
							className={styles.accordion}
							aria-expanded={showSubNav}
							key={singleOption.title}
							style={{
								pointerEvents:
                                    disable_check && loadingState ? 'none' : '',
								opacity:
                                    disable_check && loadingState ? '0.2' : '1',
							}}
							aria-hidden
						>
							{!(
								singleOption?.name === 'logout_all_accounts'
                                && (userSessionMappings || []).length < TWO
							) && (
								<div
									className={styles.active_item}
									onClick={() => {
										if (singleOption?.fun) {
											singleOption.fun();
										}
										if (singleOption.href) {
											// eslint-disable-next-line no-undef
											window.open(
												singleOption.href,
												'_blank',
											);
										}
										if (
											singleOption?.name
                                            === 'switch_account'
										) {
											handlePopover();
										}
									}}
									aria-hidden
								>
									{singleOption.icon()}
									<span>{singleOption.title}</span>
								</div>
							)}
							{openPopover && singleOption?.name === 'switch_account' && (
								<div>
									<SwitchAccounts
										userMappings={userSessionMappings}
										refetch={refetch}
										setOpenPopover={setOpenPopover}
										loading={loading}
										checkIfSessionExpiring={
										checkIfSessionExpiring
                                            }
										timeLeft={timeLeft}
									/>
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* {showSubNav && (
				<div className={styles.button_container}>
					<Button
						size="md"
						style={{ width: '100%', marginTop: 10 }}
						themeType="accent"
						onClick={redirect}
						disabled={loadingState}
					>
						{t('common:add_account')}
					</Button>
				</div>
			)} */}

			{/* <div className={styles.button_container}>
				<Button
					size="md"
					className={styles.button_styles}
					themeType="primary"
					onClick={handleNotificationClick}
					disabled={loadingState}
				>
					{resetSubnavs || notificationPopover ? (
						`${t('common:you_have')} ${!notificationCount ? 'no' : notificationCount}
						${t('common:new')} ${
							notificationCount > ONE ? t('common:notifications') : t('common:notification')
						}`
					) : (
						<div className={styles.notification_wrapper}>
							<IcMNotifications height="24px" width="24px" />

							{notificationCount > ZERO ? (
								<div className={styles.notifications_badge}>
									{notificationCount > MAX_NOTIFICATION_COUNT
										? `${MAX_NOTIFICATION_COUNT}+`
										: notificationCount}
								</div>
							) : null}
						</div>
					)}
				</Button>
			</div> */}
		</>
	);
}

export default Items;
