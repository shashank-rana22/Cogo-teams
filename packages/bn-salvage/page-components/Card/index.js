import { cl } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import OpenCardContent from '../OpenCardContent';

import styles from './styles.module.css';

const dateFormatter = (date) => (new Date(date).toDateString()).split(' ');

export default function Card({ item, openItem, setOpenItem, refetchList }) {
	const {
		id,
		origin_location,
		destination_location,
		expiry,
		containers_count,
		container_size,
		container_type,
		shipping_line,
		service_provider,
		schedule_departure,
	} = item || {};

	const [bn_expiry_day, ...bn_expiry_date] = dateFormatter(expiry);
	const [sailing_day, ...sailing_date] = dateFormatter(schedule_departure);

	const isItemOpen = id && openItem?.id === id;

	const handleOpenItemClick = () => {
		setOpenItem(isItemOpen ? null : item);
	};

	let containerSize = container_size || '';
	containerSize = containerSize.includes('HC') ? containerSize.replace('HC', 'ft HC') : `${containerSize}ft`;

	return (
		<>
			<tr className={styles.card_container}>
				<td>
					<div>{origin_location?.port_code}</div>
					<b>{origin_location?.name}</b>
				</td>

				<td>
					<div>{destination_location?.port_code}</div>
					<b>{destination_location?.name}</b>
				</td>

				<td className={styles.date_col}>
					<b>{bn_expiry_date.join(' ')}</b>
					<div>{bn_expiry_day}</div>
				</td>

				<td>
					<p>{`${containers_count || ''} x ${containerSize}`}</p>
					<p>{startCase(container_type)}</p>
				</td>

				<td>{shipping_line?.business_name}</td>

				<td>{service_provider?.business_name}</td>

				<td className={styles.date_col}>
					<b>{sailing_date.join(' ')}</b>
					<div>{sailing_day}</div>
				</td>
			</tr>

			<tr className={cl`${styles.view_more_row} ${isItemOpen ? styles.item_open : ''}`}>
				<td colSpan={10}>
					{isItemOpen ? (
						<OpenCardContent item={item} refetchList={refetchList} />
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
