import { IcMArrowRotateDown } from '@cogoport/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import styles from '../Navbar/styles.module.css';

function Items({ item, resetSubnavs }) {
	const [showSubNav, setShowSubNav] = useState(false);
	useEffect(() => { setShowSubNav(false); }, [resetSubnavs]);
	const router = useRouter();
	const handleClickOnItem = (itemdata) => {
		if (!itemdata.issubnavs) {
			router.push(item.href);
		} else {
			setShowSubNav(!showSubNav);
		}
	};
	const singleNav = (
		<div
			className={styles.list_item_inner}
			role="button"
			tabIndex={0}
			onClick={() => handleClickOnItem(item)}
		>
			{item.issubnavs && (
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
				{!item.issubnavs ? (
					<Link href={item.href ?? ''} passHref>
						{singleNav}
					</Link>
				) : singleNav }
			</li>
			{ showSubNav && item?.options?.map((it) => (
				<li key={it.name} className={styles.list_sub_item}>
					<Link href={it.href} passHref>
						<div
							className={styles.list_item_inner}
							role="button"
							tabIndex={0}
							onClick={() => handleClickOnItem(it)}
						>
							{it.icon}
							<span>
								{it.name}
							</span>
						</div>
					</Link>
				</li>
			))}
		</>
	);
}

export default Items;
