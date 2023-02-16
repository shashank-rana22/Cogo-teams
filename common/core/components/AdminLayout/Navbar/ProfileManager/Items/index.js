import { Popover, Button } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useEffect, useState } from 'react';

import useGetUserSessionMappings from '../../../../../hooks/useGetUserSessionMappings';
import SwitchAccounts from '../SwitchAccounts';

import styles from './styles.module.css';

function Items({ item, resetSubnavs }) {
	const [showSubNav, setShowSubNav] = useState(false);
	const [openPopover, setOpenPopover] = useState(false);
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile?.user || {},
	}));

	useEffect(() => { setShowSubNav(false); setOpenPopover(false); }, [resetSubnavs]);

	const {
		data = [],
		refetch = () => {},
		loading,
		checkIfSessionExpiring,
		timeLeft,
	} = useGetUserSessionMappings();

	const { picture = '', name = '' } = user_data;

	const handlePopover = () => {
		setOpenPopover(!openPopover);
	};

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
				{item.map((singleOption) => (
					<div
						className={styles.accordion}
						aria-expanded={showSubNav}
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
						key={singleOption.title}
						aria-hidden
					>
						<Popover
							placement="bottom"
							trigger="click"
							caret={false}
							render={(
								<SwitchAccounts
									checkIfSessionExpiring={checkIfSessionExpiring}
									timeLeft={timeLeft}
									userMappings={data}
									loading={loading}
									refetch={refetch}
								/>
							)}
							visible={openPopover && singleOption.name === 'switch_account'}
							theme="light"
							interactive
							animation="shift-away"
						>
							<div className={styles.active_item}>
								{singleOption.icon()}
								<span>
									{singleOption.title}
								</span>
							</div>
						</Popover>
					</div>
				))}
			</div>

			{showSubNav && (
				<div className={styles.button_container}>
					<Button size="lg" themeType="accent">Add Account</Button>
				</div>
			)}
		</>

	);
}

export default Items;
