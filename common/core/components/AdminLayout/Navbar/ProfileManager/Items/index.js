import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';

function Items({ item, resetSubnavs }) {
	const [showSubNav, setShowSubNav] = useState(false);
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile?.user || {},
	}));

	useEffect(() => { setShowSubNav(false); }, [resetSubnavs]);

	const { picture = '', name = '' } = user_data;

	const singleNav = (
		<div
			className={styles.list_item_inner}
			role="presentation"
			onClick={() => setShowSubNav(!showSubNav)}
		>
			<div className={styles.inner_image_container}>
				<img
					src={picture || 'https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/avatar-placeholder.webp'}
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
		<div className={styles.container}>
			{singleNav}
			{item.map((singleOption) => (
				<div
					role="presentation"
					className={styles.accordion}
					aria-expanded={showSubNav}
					onClick={() => {
						if (singleOption.fun) {
							singleOption.fun();
						}
					}}
					key={singleOption.title}
				>
					<div className={styles.active_item}>
						{singleOption.icon()}
						<span>
							{singleOption.title}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default Items;
