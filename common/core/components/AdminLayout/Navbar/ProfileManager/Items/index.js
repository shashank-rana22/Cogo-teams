/* eslint-disable max-len */
import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateDown, IcMNotifications } from '@cogoport/icons-react';
// import NewNotifications from '../../../../../../../packages/notifications/page-components/NewNotifications';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

// import AdminNotification from '../../AdminNotification';
import SwitchAccounts from '../../SwitchAccounts';

import styles from './styles.module.css';

const SESSION_DISABLED = ['logout', 'logout_all_accounts'];

const TOTAL_TIME = 1000;
const THIRTY_SECONDS = 30;
const ONE = 1;
const TWO = 2;
// const ZERO_COUNT = 0;
const MAX_COUNT = 100;

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
	item,
	resetSubnavs,
	setOpenPopover = () => {},
	timeLeft,
	loading,
	openPopover,
	refetch = () => {},
	checkIfSessionExpiring,
	// notificationCount = ZERO_COUNT,
	openNotificationPopover,
	setOpenNotificationPopover,
	notificationData,
	showCount,
	// notificationLoading,
	// trigger,
}) {
	const { t } = useTranslation(['common']);

	const notificationCount = notificationData?.is_not_seen_count;
	// const notificationCount = 2;

	const { user_data, userSessionMappings, query } = useSelector(({ profile, general }) => ({
		user_data           : profile?.user || {},
		userSessionMappings : profile?.user_session_mappings || [],
		query               : general?.query || {},
	}));

	const { partner_id = '' } = query || {};

	const [showSubNav, setShowSubNav] = useState(false);

	const redirect = () => {
		// eslint-disable-next-line no-undef
		window.location.href = '/v2/login?source=add_account';
	};

	const notificationRedirect = () => {
		window.location.href = `/v2/${partner_id}/notifications`;
	};

	const { picture = '', name = '' } = user_data;

	const handlePopover = () => {
		setOpenPopover(!openPopover);
	};

	const handleNotificationPopover = () => {
		setOpenNotificationPopover(!openNotificationPopover);
	};

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

	// console.log('notification data 1', notificationData);

	useEffect(() => {
		setShowSubNav(false);
		setOpenPopover(false);
		setOpenNotificationPopover(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resetSubnavs]);

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

										if (singleOption?.name
                                            === 'notifications') { notificationRedirect(); }
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

							{/* {
								openNotificationPopover && singleOption?.name === 'notifications' && (
									<div>
										<AdminNotification
											notificationLoading={notificationLoading}
											notificationData={notificationData}
											trigger={trigger}
										/>
									</div>
								)
							} */}
						</div>
					);
				})}
			</div>

			{
			// (notificationCount > ZERO_COUNT) && (
				<div className={styles.notifications_container}>
					{!showSubNav ? (
						<div className={styles.notifiction_icon}>
							<IcMNotifications width={16} height={16} fill="red" />
							{notificationCount && showCount && !openNotificationPopover ? (
								<div className={styles.new_notifications}>
									{notificationCount >= MAX_COUNT
										? `${MAX_COUNT}+` : notificationCount}
								</div>
							) : null}
						</div>
					) : null}

					<div style={showSubNav ? { width: '100%' } : {}}>
						<Button
							size="md"
							themeType="primary"
							onClick={handleNotificationPopover}
							disabled={loadingState}
							className={styles.button_styles}
							style={showSubNav ? { width: '100%' } : {}}
						>
							{notificationCount ? `
							${t('common:you_have')}
							${' '}
							${notificationCount}
							${' '}
							${t('common:new')}
							${' '}
							${notificationCount > ONE ? t('common:notifications') : t('common:notification')}` : 'You have no new Notifications'}
						</Button>
					</div>

				</div>
			// )
			}

			{/*
			{(notificationCount > ZERO_COUNT && showSubNav) && (
				<div className={styles.button_container}>
					<Button
						size="md"
						style={{ width: '100%', marginTop: 10 }}
						themeType="primary"
						onClick={handleNotificationPopover}
						disabled={loadingState}
					>
						{t('common:you_have')}
						{' '}
						{notificationCount}
						{' '}
						{t('common:new')}
						{' '}
						{notificationCount > ONE ? t('common:notifications') : t('common:notification')}
					</Button>
				</div>
			)} */}

			{showSubNav && (
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
			)}
		</>
	);
}

export default Items;
