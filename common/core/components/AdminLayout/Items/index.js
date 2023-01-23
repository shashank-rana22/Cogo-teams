import { Loader } from '@cogoport/components';
import cl from '@cogoport/components/src/utils/classname-processor';
import { IcMArrowRotateDown, IcMDefault, IcMPin, IcCPin } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useEffect, useState } from 'react';

import styles from '../Navbar/styles.module.css';

function Items({ isPinned, item, resetSubnavs, pinUnpinNavs, newPinUnpinLoading }) {
	const router = useRouter();
	const { pathname, query, asPath } = router;

	const [showSubNav, setShowSubNav] = useState(false);
	const [pinLoadingState, setPinLoadingState] = useState(false);

	useEffect(() => { setShowSubNav(false); }, [resetSubnavs]);

	const splitAspath = asPath.split('/')?.[1];

	const handleClickOnItem = (itemdata) => {
		if (itemdata.options?.length > 0) {
			setShowSubNav(!showSubNav);
		} else if (itemdata?.href?.includes('/v2')) {
			const replaceHref = itemdata?.href?.replace('/v2', '');
			const replaceAs = itemdata?.as?.replace('/v2', '');
			router.push(replaceHref, replaceAs);
		} else if (process.env.NODE_ENV === 'production') {
			// eslint-disable-next-line no-undef
			window.location.href = `/${query.partner_id || splitAspath}${itemdata.as || itemdata.href}`;
		} else {
			router.push(itemdata.href, itemdata.as);
		}
	};

	const splitasPathWithoutPartnerId = `/${pathname.split('/').slice(2, 5).join('/')}`;

	const isHref =	splitasPathWithoutPartnerId === item.as
		|| item?.options?.some((singleOption) => singleOption.as === splitasPathWithoutPartnerId);

	const Element = item.icon || IcMDefault;

	const singleNav = (
		<div
			className={cl`
			${item.options?.length > 0 ? styles.has_options : ''} 
			${isHref ? styles.active_item : styles.list_item_inner}`}
			role="button"
			tabIndex={0}
			onClick={() => handleClickOnItem(item)}
		>
			{item.options?.length > 0 && (
				<IcMArrowRotateDown
					className={`${styles.icon} ${showSubNav ? styles.active : ''}`}
				/>
			)}
			<Element />
			<span>
				{item.title}
			</span>

			{!pinLoadingState ? (
				<div
					role="button"
					tabIndex={0}
					className={styles.pin}
					onClick={(e) => {
						e.stopPropagation();
						// setShowSubNav(!showSubNav);
						if (!newPinUnpinLoading) {
							pinUnpinNavs(!isPinned, item, setPinLoadingState);
						}
					}}
				>
					{isPinned ? <IcCPin /> : <IcMPin /> }
				</div>
			) : <Loader className={styles.loader} />}

		</div>
	);
	return (
		<div className={showSubNav ? styles.outer_container : ''}>
			<li key={item.title} className={styles.list_item}>
				{singleNav}
			</li>
			{showSubNav && item?.options?.map((singleOption) => {
				const isHrefMatch = splitasPathWithoutPartnerId === singleOption.as;
				return (
					<li key={singleOption.title} className={styles.list_sub_item}>
						<div
							role="presentation"
							onClick={() => handleClickOnItem(singleOption)}
							className={isHrefMatch ? styles.active_item : styles.list_item_subitem}
						>
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
