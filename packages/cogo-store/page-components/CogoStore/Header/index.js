import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcALocation, IcMArrowNext, IcMClock } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import useGetProductFilterDetail from '../../../hooks/useGetProductFilterDetail';

import styles from './styles.module.css';

function Header() {
	const { push } = useRouter();
	const { data: productData } = useGetProductFilterDetail();
	const { user_details } = productData || {};
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
				<span
					className={styles.right_header_text}
					aria-hidden
					onClick={() => push('/cogo-store/order-history')}
				>
					<IcMClock height={14} style={{ marginRight: '4px' }} />
					Order history
				</span>

				<span
					className={styles.right_header_text}
					aria-hidden
					onClick={() => push('/cogo-store/my-cart')}
				>
					<img src={CART} alt="" height="14px" style={{ marginRight: '4px' }} />
					My Cart
				</span>
				{is_hr_admin ? (
					<span
						className={styles.right_header_text}
						aria-hidden
						onClick={() => push('/cogo-store/admin-view')}
					>
						Admin View
						<IcMArrowNext style={{ marginLeft: '3px', cursor: 'pointer' }} />
					</span>
				) : null}
			</div>
		</div>
	);
}

export default Header;
