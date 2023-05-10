import { cl } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import OpenCardContent from '../OpenCardContent';

import styles from './styles.module.css';

const dateFormatter = (date) => (new Date(date).toDateString()).split(' ');

export default function Card({ item, openItem, setOpenItem }) {
	const [bn_expiry_day, ...bn_expiry_date] = dateFormatter(item?.expiry);
	const [sailing_day, ...sailing_date] = dateFormatter(item?.schedule_departure);

	const isItemOpen = item && openItem?.id === item?.id;

	const handleOpenItemClick = () => {
		setOpenItem(isItemOpen ? null : item);
	};

	return (
		<>
			<tr className={styles.card_container}>
				<td>
					<div>{item?.origin_location?.port_code}</div>
					<b>{item?.origin_location?.name}</b>
				</td>

				<td>
					<div>{item?.destination_location?.port_code}</div>
					<b>{item?.destination_location?.name}</b>
				</td>

				<td className={styles.date_col}>
					<b>{bn_expiry_date.join(' ')}</b>
					<div>{bn_expiry_day}</div>
				</td>

				<td>
					<p>{`${item?.containers_count || ''} x ${item?.container_size || ''}`}</p>
					<p>{startCase(item?.container_type)}</p>
				</td>

				<td>{item?.shipping_line?.business_name}</td>

				<td>{item?.service_provider?.business_name}</td>

				<td className={styles.date_col}>
					<b>{sailing_date.join(' ')}</b>
					<div>{sailing_day}</div>
				</td>
			</tr>

			<tr className={cl`${styles.view_more_row} ${isItemOpen ? styles.item_open : ''}`}>
				<td colSpan={10}>
					{isItemOpen ? (
						<OpenCardContent item={item} />
					) : null}

					<div
						role="button"
						tabIndex={0}
						onClick={handleOpenItemClick}
						className={styles.show_more_less}
					>
						{isItemOpen ? 'Show Less' : 'Show More'}
						<IcMArrowDown className={styles.arrow_icon} />
					</div>
				</td>
			</tr>
		</>
	);
}
