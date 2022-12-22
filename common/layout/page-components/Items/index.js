import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { Link, useRouter } from '@cogoport/next';
import React, { useEffect, useState } from 'react';

import styles from '../Navbar/styles.module.css';

function Items({ item, resetSubnavs }) {
	const router = useRouter();
	const { asPath } = router;

	const [showSubNav, setShowSubNav] = useState(false);

	useEffect(() => { setShowSubNav(false); }, [resetSubnavs]);

	const handleClickOnItem = (itemdata) => {
		if (itemdata.options?.length > 0) {
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
			{item.options?.length > 0 && (
				<IcMArrowRotateDown
					className={`${styles.icon} ${showSubNav ? styles.active : ''}`}
				/>
			)}
			{item.icon}
			<span>
				{item.title}
			</span>
		</div>
	);
	return (
		<>
			<li key={item.title} className={styles.list_item}>
				{!item.options ? (
					<Link href={item.href ?? ''} as={`${item.as}`}>
						{singleNav}
					</Link>
				) : singleNav }
			</li>
			{showSubNav && item?.options?.map((singleOption) => {
				const isHrefMatch = [asPath].includes(singleOption.href);
				return (
					<li key={singleOption.title} className={styles.list_sub_item}>
						<Link
							onClick={() => handleClickOnItem(singleOption)}
							className={isHrefMatch ? styles.active_item : styles.list_item_inner}
							href={singleOption.href ?? ''}
							as={`${singleOption.as}`}
						>
							{singleOption.icon}
							<span>
								{singleOption.title}
							</span>
						</Link>
					</li>
				);
			})}
		</>
	);
}

export default Items;
