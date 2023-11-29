/* eslint-disable max-lines-per-function */
import { Button, Pill, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';
import { differenceInSeconds } from 'date-fns';

import styles from './styles.module.css';
import CustomButton from './TableItems/CustomButton';
import FieldPair from './TableItems/FieldPair';
import PortPair from './TableItems/PortPair';
import SearchType from './TableItems/SearchType';
import ShipmentDetails from './TableItems/ShipmentDetails';

const TO_FIXED_DECIMAL_COUNT = 2;
const PERCENTAGE_FACTOR = 100;

const getTableColumnFunction = (key) => {
	const newFunction = {
		renderButton: (data, field) => (
			<CustomButton
				item={data}
				field={field}
			/>
		),
		renderSerialId: (itemData) => {
			const { serial_id = '-', performed_by_type } = itemData || {};

			return (
				<div>
					<strong>{serial_id}</strong>
					{performed_by_type ? (
						<div>{performed_by_type === 'user' ? 'Organic' : 'Inorganic'}</div>
					) : null}
				</div>
			);
		},
		renderSearchType: (itemData, field) => (
			<SearchType item={itemData} field={field} />
		),
		renderFieldPair: (itemData, field) => (
			<FieldPair
				item={{
					...itemData,
					...(itemData.booking_params?.rate_card || {}),
					...(itemData.spot_search || {}),
				}}
				field={field}
			/>
		),
		renderPortPair: (item, field, serviceType) => (
			<PortPair item={item} field={field} serviceType={serviceType} />
		),
		renderShipment: (item, field) => (
			<ShipmentDetails item={item} field={field} />
		),
		renderDislikePortPair: (item, field, serviceType) => (
			<PortPair
				item={{ ...item, ...item.booking_params?.rate_card }}
				field={field}
				serviceType={serviceType}
			/>
		),
		renderCreated: (itemData) => (
			<Tooltip
				content={(
					<>
						{formatDate({
							date       : itemData.created_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</>
				)}
				placement="top"
			>
				<span>
					{formatDate({
						date       : itemData.created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</span>
			</Tooltip>
		),
		renderSource: (itemData) => {
			const { source = '-' } = itemData || {};

			return (
				<Pill size="md" color="#F7FAEF">
					{source === 'direct' ? 'Sell Without Buy' : startCase(source)}
				</Pill>
			);
		},
		renderValidityEnd: ({ shipment_id, validity_end }) => {
			if (shipment_id) {
				return <span>NA</span>;
			}

			return (
				<div>
					{formatDate({
						date       : validity_end,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
					<br />
					{formatDate({
						date       : validity_end,
						timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
						formatType : 'time',
					})}
				</div>
			);
		},
		renderBookingStatus: (itemData) => {
			const { shipment_id, quotation_email_sent_at, validity_end } = itemData || {};

			const validityTime = differenceInSeconds(
				new Date(validity_end),
				new Date(),
			);

			if (shipment_id) {
				return <div className={styles.booking_status}><Pill size="md" color="green">Booked</Pill></div>;
			}

			if (quotation_email_sent_at && validityTime > GLOBAL_CONSTANTS.zeroth_index) {
				return (
					<div className={styles.booking_status}>
						<Pill size="md" color="yellow">Sent & Not Booked</Pill>
					</div>
				);
			}

			return (
				<div className={styles.booking_status}>
					<Pill size="md" color="red">Expired</Pill>
				</div>
			);
		},
		renderShipmentStatus: ({ state = '-' }) => (
			<div className={cl`${styles.status_tag} ${styles[state]}`}>
				<span>{startCase(state)}</span>
			</div>
		),
		renderLastMileStone: ({ last_completed_task }) => {
			const { task = '-' } = last_completed_task || {};

			if (!last_completed_task) return <div>-</div>;

			return <div>{startCase(task)}</div>;
		},
		renderNextMileStone: ({ next_pending_task }) => {
			const { task = '-' } = next_pending_task || {};

			if (!next_pending_task) return <div>-</div>;

			return <div>{startCase(task)}</div>;
		},
		renderSearchVolume: ({ search_count = 0, total_search_count = 1 }) => (
			<strong>
				{total_search_count ? (
					`${((search_count / total_search_count) * PERCENTAGE_FACTOR)
						.toFixed(TO_FIXED_DECIMAL_COUNT)}%`
				) : '-'}
			</strong>
		),
		renderConversionRate: ({ booking_count = 0, search_count = 1 }) => (
			<strong>
				{search_count ? (
					`${((booking_count / search_count) * PERCENTAGE_FACTOR).toFixed(TO_FIXED_DECIMAL_COUNT)}%`
				) : '-'}
			</strong>
		),
		renderLastSearched: ({ updated_at = '' }) => (
			<span>
				{formatDate({
					date       : updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</span>
		),
		renderPrice: ({ preferred_freight_rate = 0, preferred_freight_rate_currency = '' }) => {
			if (!preferred_freight_rate && !preferred_freight_rate_currency) {
				return '--';
			}

			return (
				<strong style={{ fontSize: '14px' }}>
					{formatAmount({
						amount   : preferred_freight_rate,
						currency : preferred_freight_rate_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 0,
						},
					})}
				</strong>
			);
		},
		renderDate: (item, field) => (
			<span>
				{formatDate({
					date       : item[field.key] || '',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</span>
		),
		renderContainerInfo: (itemData) => {
			const KEYS = {
				trucks_count               : 'x',
				truck_type                 : '|',
				trade_type                 : '|',
				weight                     : 'kgs x',
				volume                     : 'cbm |',
				containers_count           : 'x',
				container_size             : '|',
				container_type             : '|',
				commodity                  : '|',
				cargo_weight_per_container : 'MT',
			};

			const data = {
				...itemData,
				...(itemData?.booking_params || {}),
				...(itemData?.booking_params?.rate_card
				|| {}),
			};

			return Object.entries(KEYS).reduce(
				(acc, [keyname, v]) => (data[keyname] ? `${acc}${data[keyname]} ${v} ` : acc),
				'',
			);
		},
		renderStatus: ({ status = '' }) => (
			<strong>
				{startCase(status)}
			</strong>
		),
		renderRemarks: ({ remarks = [] }) => {
			if (isEmpty(remarks)) {
				return <b>No Remarks</b>;
			}

			return (
				<Tooltip
					interactive
					content={(
						<ul style={{ paddingLeft: '8px' }}>
							{remarks.map((string) => (
								<li style={{ margin: '8px 0' }} key={string}>{string}</li>
							))}
						</ul>
					)}
				>
					<Button type="button" themeType="linkUi">See remarks</Button>
				</Tooltip>
			);
		},
		renderClosingRemarks: ({ closing_remarks = [] }) => {
			if (isEmpty(closing_remarks)) {
				return <b>--</b>;
			}

			return (
				<Tooltip
					interactive
					content={(
						<ul style={{ paddingLeft: '8px' }}>
							{closing_remarks.map((string) => (
								<li style={{ margin: '8px 0' }} key={string}>{string}</li>
							))}
						</ul>
					)}
				>
					<Button type="button" themeType="linkUi">See closing remarks</Button>
				</Tooltip>
			);
		},
	};

	return newFunction[key];
};
export default getTableColumnFunction;
