import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcALocation, IcMArrowNext, IcMClock } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Header({ productData = {} }) {
	const { push } = useRouter();
	const { user_details, cart_items_count } = productData || {};
	const { name, office_location } = user_details || {};
	const { is_hr_admin } = productData || {};
	const { COGO_ICON, COPYRIGHT_ICON, CART } = GLOBAL_CONSTANTS.image_url;

	return (
		<div className={styles.heading}>
			<div className={styles.left_header}>
				<div
					className={styles.image_header}
					style={{ cursor: 'pointer' }}
					aria-hidden
					onClick={() => push('/cogo-store')}
				>
					{' '}
					<img
						src={COGO_ICON}
						alt="nofound"
					/>
					<img src={COPYRIGHT_ICON} alt="not found" />
				</div>

				<div className={styles.header_lines}>
					<span><IcALocation width={20} height={20} /></span>
					<div className={styles.text_section}>
						<div className={styles.upper_text}>
							Delivering to
							{' '}
							{name}
						</div>
						<div className={styles.lower_text}>
							{office_location}
							{' '}
							Office
						</div>
					</div>
				</div>
			</div>

			<div className={styles.right_header}>
				<div
					className={styles.right_header_text}
					aria-hidden
					onClick={() => push('/cogo-store/order-history')}
				>
					<IcMClock height={14} style={{ marginRight: '4px' }} />
					Order history
				</div>

				<div
					className={styles.right_header_text}
					aria-hidden
					onClick={() => push('/cogo-store/my-cart')}
					style={{ position: 'relative' }}
				>
					<img src={CART} alt="" height="14px" style={{ marginRight: '12px' }} />
					My Cart
					{cart_items_count > GLOBAL_CONSTANTS.zeroth_index
						? <div className={styles.cart_count}>{cart_items_count}</div> : null}
				</div>
				{is_hr_admin ? (
					<div
						className={styles.right_header_text}
						aria-hidden
						onClick={() => push('/cogo-store/admin-view')}
					>
						Admin View
						<IcMArrowNext style={{ marginLeft: '3px', cursor: 'pointer' }} />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Header;
