import { Button } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useEffect, useState } from 'react';

import SwitchAccounts from '../../SwitchAccounts';

import styles from './styles.module.css';

const SESSION_DISABLED = ['logout', 'logout_all_accounts'];

function Items({
	item,
	resetSubnavs,
	setOpenPopover = () => {},
	timeLeft,
	loading,
	openPopover,
	refetch = () => {},
	checkIfSessionExpiring,
}) {
	const [showSubNav, setShowSubNav] = useState(false);
	const { user_data, userSessionMappings } = useSelector(({ profile }) => ({
		user_data           : profile?.user || {},
		userSessionMappings : profile?.user_session_mappings || [],
	}));

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { setShowSubNav(false); setOpenPopover(false); }, [resetSubnavs]);

	const redirect = () => {
		// eslint-disable-next-line no-undef
		window.location.href = '/v2/login?source=add_account';
	};

	const { picture = '', name = '' } = user_data;

	const handlePopover = () => {
		setOpenPopover(!openPopover);
	};

	let activeUser = {};
	(userSessionMappings || []).forEach((user) => {
		if (user_data?.id === user?.user_id) {
			activeUser = user;
		}
	});

	const { expire_at = '' } = activeUser || {};
	const expire_time = new Date(expire_at).getTime();

	const lessThan30Seconds = Number(timeLeft) >= Number(expire_time / 1000 - 30);

	const loadingState = checkIfSessionExpiring || lessThan30Seconds || loading;

	const singleNav = (
		<div
			className={styles.list_item_inner}
			role="presentation"
			onClick={() => setShowSubNav(!showSubNav)}
		>
			<div className={styles.inner_image_container}>
				<img
					src={picture
						|| 'https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/avatar-placeholder.webp'}
					alt="avatar-placeholder"
				/>
			</div>

			<span className={styles.profile_name}>
				{name}
			</span>
			<IcMArrowRotateDown
				style={{ marginRight: 10, transform: showSubNav ? 'rotate(360deg)' : 'rotate(270deg)' }}
			/>
		</div>
	);

	return (
		<>
			<div className={styles.container}>
				{singleNav}
				{
					(item || []).map((singleOption) => {
						const disable_check = SESSION_DISABLED.includes(singleOption?.name);

						if (singleOption?.name === 'switch_account' && userSessionMappings?.length <= 1) {
							return null;
						}

						return (
							<div
								className={styles.accordion}
								aria-expanded={showSubNav}
								key={singleOption.title}
								style={{
									pointerEvents : disable_check && loadingState ? 'none' : '',
									opacity       : disable_check && loadingState ? '0.2' : 1,
								}}
								aria-hidden
							>
								{!(singleOption?.name === 'logout_all_accounts'
								&& (userSessionMappings || []).length < 2) && (
									<div
										className={styles.active_item}
										onClick={() => {
											if (singleOption?.fun) {
												singleOption.fun();
											}
											if (singleOption.href) {
												// eslint-disable-next-line no-undef
												window.open(singleOption.href, '_blank');
											}
											if (singleOption?.name === 'switch_account') {
												handlePopover();
											}
										}}
										aria-hidden
									>
										{singleOption.icon()}
										<span>
											{singleOption.title}
										</span>
									</div>
								) }
								{
									openPopover
									&& singleOption?.name === 'switch_account' && (
										<div>
											<SwitchAccounts
												userMappings={userSessionMappings}
												refetch={refetch}
												setOpenPopover={setOpenPopover}
												loading={loading}
												checkIfSessionExpiring={checkIfSessionExpiring}
												timeLeft={timeLeft}
											/>
										</div>
									)
								}
							</div>
						);
					})
				}
			</div>

			{showSubNav && (
				<div className={styles.button_container}>
					<Button
						size="md"
						style={{ width: '100%', marginTop: 10 }}
						themeType="accent"
						onClick={redirect}
						disabled={loadingState}
					>
						Add Account
					</Button>
				</div>
			)}
		</>

	);
}

export default Items;
