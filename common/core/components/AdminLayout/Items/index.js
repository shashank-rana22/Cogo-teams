import { Loader } from '@cogoport/components';
import { IcMArrowRotateDown, IcMDefault, IcMPin, IcCPin } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import styles from '../Navbar/styles.module.css';

import useAddRemovePin from './useAddRemovePin';

const FIRST_INDEX = 1;
const SLICE_START_INDEX = 2;
const SLICE_END_INDEX = 5;

function Items({ isPinned, item, resetSubnavs, partner_user_id,	setPinnedNavKeys, showPin, inCall = false }) {
	const router = useRouter();
	const { query, asPath } = router;

	const [showSubNav, setShowSubNav] = useState(false);
	const {
		newPinUnpinLoading = false,
		pinUnpinNavs = () => {},
	} = useAddRemovePin({ partner_user_id, setPinnedNavKeys });

	useEffect(() => { setShowSubNav(false); }, [resetSubnavs]);

	const splitAspath = asPath.split('/')?.[FIRST_INDEX];

	const { options = [] } = item || {};
	const openNewTab = (as = '', href = '') => {
		// eslint-disable-next-line no-undef
		window.open(
			`/${query.partner_id || splitAspath}${as || href}`,
			'_blank',
			'noreferrer',
		);
	};
	const handleClickOnItem = (itemdata) => {
		if (!isEmpty(itemdata?.options)) {
			setShowSubNav(!showSubNav);
		} else if (itemdata?.href?.includes('/v2')) {
			const replaceHref = itemdata?.href?.replace('/v2', '');
			const replaceAs = itemdata?.as?.replace('/v2', '');
			if (inCall) {
				openNewTab(replaceAs, replaceHref);
			} else {
				router.push(replaceHref, replaceAs);
			}
		} else if (process.env.NODE_ENV === 'production') {
			if (inCall) {
				openNewTab(itemdata.as, itemdata.href);
			} else {
				// eslint-disable-next-line no-undef
				window.location.href = `/${query.partner_id || splitAspath}${itemdata.as || itemdata.href}`;
			}
		} else if (inCall) {
			openNewTab(itemdata.as, itemdata.href);
		} else {
			router.push(itemdata.href, itemdata.as);
		}
	};
	const pathWithoutPartnerId = `/${asPath.split('/').slice(SLICE_START_INDEX, SLICE_END_INDEX).join('/')}`;

	const isSubActive = options?.some((singleOption) => singleOption.as?.replace('/v2', '') === pathWithoutPartnerId);

	const isHref = pathWithoutPartnerId === item?.as?.replace('/v2', '') || isSubActive;

	const Element = item.icon || IcMDefault;

	const singleNav = (
		<div
			className={`
			${!isEmpty(item.options) ? styles.has_options : ''}
			${isHref ? `${styles.list_item_inner} ${styles.active_item}` : styles.list_item_inner}`}
			role="button"
			tabIndex={0}
			onClick={() => handleClickOnItem(item)}
		>
			{!isEmpty(item.options) && (
				<IcMArrowRotateDown
					className={`${styles.icon} ${showSubNav ? styles.active : ''}`}
				/>
			)}

			<Element />
			<span>
				{item.title}
			</span>

			{showPin
				&& (!newPinUnpinLoading ? (
					<div
						role="button"
						tabIndex={0}
						className={styles.pin}
						onClick={(e) => {
							e.stopPropagation();
							if (!newPinUnpinLoading) {
								pinUnpinNavs(!isPinned, item);
							}
						}}
					>
						{isPinned ? <IcCPin /> : <IcMPin /> }
					</div>
				) : <Loader className={styles.loader} />)}

		</div>
	);

	return (
		<div className={showSubNav ? styles.outer_container : ''}>
			<li key={item.title} className={styles.list_item}>
				{singleNav}
			</li>
			{showSubNav && options?.map((singleOption) => {
				const isHrefMatch = pathWithoutPartnerId === singleOption.as?.replace('/v2', '');
				return (
					<li key={singleOption.title} className={styles.list_sub_item}>
						<div
							role="presentation"
							onClick={() => handleClickOnItem(singleOption)}
							className={isHrefMatch ? `${styles.list_item_subitem} 
							${styles.active_option}` : styles.list_item_subitem}
						>
							<span>
								{singleOption.title}
							</span>
							{singleOption.title === 'My Tickets'
								? <div className={styles.count}>{100}</div> : null}
						</div>
					</li>
				);
			})}
		</div>
	);
}

export default Items;
