import { Button } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';

function Items({ item, resetSubnavs, setOpenPopover = () => {}, openPopover }) {
	const [showSubNav, setShowSubNav] = useState(false);
	const { user_data, userSessionMappings } = useSelector(({ profile }) => ({
		user_data           : profile?.user || {},
		userSessionMappings : profile?.user_session_mappings,
	}));

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { setShowSubNav(false); }, [resetSubnavs]);

	const redirect = () => {
		// eslint-disable-next-line no-undef
		window.location.href = '/v2/login?source=add_account';
	};

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
						{ !(singleOption?.name === 'logout_all_accounts' && (userSessionMappings || []).length < 2) && (
							<div className={styles.active_item}>
								{singleOption.icon()}
								<span>
									{singleOption.title}
								</span>
							</div>
						) }

					</div>
				))}
			</div>

			{showSubNav && (
				<div className={styles.button_container}>
					<Button size="lg" themeType="accent" onClick={redirect}>Add Account</Button>
				</div>
			)}
		</>

	);
}

export default Items;
