import { IcMArrowRotateDown, IcMBookingManagement } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useEffect, useState } from 'react';

import styles from '../Navbar/styles.module.css';

function Items({ item, resetSubnavs }) {
	const router = useRouter();
	const { pathname, query } = router;

	const [showSubNav, setShowSubNav] = useState(false);

	useEffect(() => { setShowSubNav(false); }, [resetSubnavs]);

	const handleClickOnItem = (itemdata) => {
		if (itemdata.href.includes('/v1')) {
			window.location.href = `/v1/${query.partner_id}${itemdata.href.replace('/v1', '')}`;
		} else {
			router.push(itemdata.href, itemdata.as);
		}

		if (itemdata.options?.length > 0) {
			setShowSubNav(!showSubNav);
		}
	};

	const splitasPathWithoutPartnerId = `/${pathname.split('/').slice(2, 5).join('/')}`;

	const isHref =	splitasPathWithoutPartnerId === item.as
		|| item?.options?.some((singleOption) => singleOption.as === splitasPathWithoutPartnerId);

	const Element = item.icon || IcMBookingManagement;

	const singleNav = (
		<div
			className={isHref ? styles.active_item : styles.list_item_inner}
			role="button"
			tabIndex={0}
			onClick={() => handleClickOnItem(item)}
		>

			<Element />
			<span>
				{item.title}
			</span>
			{item.options?.length > 0 && (
				<IcMArrowRotateDown
					className={`${styles.icon} ${showSubNav ? styles.active : ''}`}
				/>
			)}
		</div>
	);
	return (
		<div className={showSubNav ? styles.outer_container : ''}>
			<li key={item.title} className={styles.list_item}>
				{singleNav}
			</li>
			{showSubNav && item?.options?.map((singleOption) => {
				const isHrefMatch = splitasPathWithoutPartnerId === singleOption.as;
				const Elem = singleOption.icon || IcMBookingManagement;
				return (
					<li key={singleOption.title} className={styles.list_sub_item}>
						<div
							role="presentation"
							onClick={() => handleClickOnItem(singleOption)}
							className={isHrefMatch ? styles.active_item : styles.list_item_inner}
						>
							<Elem />
							<span>
								{singleOption.title}
							</span>
						</div>
					</li>
				);
			})}
		</div>
	);
}

export default Items;
