import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function OrderConfirmation({ data = {}, office_location = '' }) {
	const { push } = useRouter();
	const { id } = data || {};
	return (
		<div className={styles.container}>
			<div className={styles.img}>
				<img src={GLOBAL_CONSTANTS.image_url.check_circle} alt="" />
			</div>
			<div className={styles.black_heading}>
				Your order is successfully placed
			</div>
			<div className={styles.grey_heading}>
				You will receive your order in 7 working days
			</div>
			<div className={styles.grey_heading}>
				Will be delivered to
				{' '}
				{office_location}
				{' '}
				office
			</div>
			<div className={styles.order_details}>
				<div className={styles.grey}>{data.order_ticket_id}</div>
				<div
					className={styles.color_dot}
				/>
				<div className={styles.grey}>
					{data.created_at ? formatDate({
						date       : data.created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'dateTime',
						separator  : ' | ',
					}) : '-'}

				</div>
			</div>

			<div className={styles.btn_footer}>
				<Button
					themeType="secondary"
					className={styles.cancel_btn}
					onClick={() => push('/cogo-store')}
				>
					Go to Store

				</Button>
				<Button
					themeType="accent"
					onClick={() => push(`/cogo-store/order-details?id=${id}`)}
				>
					View Orders
				</Button>
			</div>
		</div>
	);
}

export default OrderConfirmation;
