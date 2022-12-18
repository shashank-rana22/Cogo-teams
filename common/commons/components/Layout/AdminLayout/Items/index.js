import { IcMArrowRotateDown } from '@cogoport/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import styles from '../Navbar/styles.module.css';

function Items({ item, resetSubnavs }) {
	const router = useRouter();
	const { asPath } = router;

	const [showSubNav, setShowSubNav] = useState(false);

	useEffect(() => { setShowSubNav(false); }, [resetSubnavs]);

	const handleClickOnItem = (itemdata) => {
		if (!itemdata.isSubNavs) {
			router.push(itemdata.href);
		} else {
			setShowSubNav(!showSubNav);
		}
	};

	const isHref = [asPath].includes(item.href);

	const singleNav = (
		<div
			className={isHref ? styles.active_item : styles.list_item_inner}
			role="button"
			tabIndex={0}
			onClick={() => handleClickOnItem(item)}
		>
			{item.isSubNavs && (
				<IcMArrowRotateDown
					className={`${styles.icon} ${showSubNav ? styles.active : ''}`}
				/>
			)}
			{item.icon}
			<span>
				{item.name}
			</span>
		</div>
	);
	return (
		<>
			<li key={item.name} className={styles.list_item}>
				{!item.isSubNavs ? (
					<Link href={item.href ?? ''}>
						{singleNav}
					</Link>
				) : singleNav }
			</li>
			{showSubNav && item?.options?.map((singleOption) => {
				const isHrefMatch = [asPath].includes(singleOption.href);
				return (
					<li key={singleOption.name} className={styles.list_sub_item}>
						<Link
							onClick={() => handleClickOnItem(singleOption)}
							className={isHrefMatch ? styles.active_item : styles.list_item_inner}
							href={singleOption.href ?? ''}
						>
							{singleOption.icon}
							<span>
								{singleOption.name}
							</span>
						</Link>
					</li>
				);
			})}
		</>
	);
}

export default Items;
