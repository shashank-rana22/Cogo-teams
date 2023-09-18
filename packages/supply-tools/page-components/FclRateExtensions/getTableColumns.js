import { Button, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const ZERO_GRI_RATE = 0;
const CLUSTER_SPLIT_INDEX = 1;

function ActionFormat({ onUpdate = () => {}, onDelete = () => {}, row = {} }) {
	return (
		<div className={styles.action_container}>
			<Button onClick={() => onUpdate(row)}>Update</Button>
			<Button onClick={() => onDelete(row)} themeType="secondary">Delete</Button>
		</div>
	);
}

const getTableColumns = ({ onUpdate = () => {}, onDelete = () => {} }) => {
	const tableColumns = [
		{
			Header   : <div className={cl`${styles.head} ${styles.bold}`}>Extension Name</div>,
			accessor : (item) => (
				<Tooltip
					interactive
					content={item?.extension_name ? item?.extension_name : null}
				>
					<div className={styles.data}>{item?.extension_name ? item?.extension_name : null}</div>
				</Tooltip>
			),
			id: 'extension_name',
		},
		{
			Header   : <div className={cl`${styles.head} ${styles.bold}`}>Service Provider</div>,
			accessor : (item) => (
				<Tooltip
					interactive
					content={
						item?.service_provider?.business_name
							? item?.service_provider?.business_name
							: 'All'
					}
				>
					<div className={styles.data}>
						{item?.service_provider?.short_name
							? item?.service_provider?.short_name
							: 'All'}
					</div>
				</Tooltip>
			),
			id: 'service_provider_id',
		},
		{
			Header   : <div className={cl`${styles.head} ${styles.bold}`}>Shipping Line</div>,
			accessor : (item) => (
				<Tooltip
					interactive
					content={
						item?.shipping_line?.business_name
							? item?.shipping_line?.business_name
							: 'All'
					}
				>
					<div className={styles.data}>
						{item?.shipping_line?.short_name
							? item?.shipping_line?.short_name
							: 'All'}
					</div>
				</Tooltip>
			),
			id: 'shipping_line_id',
		},
		{
			Header   : <div className={cl`${styles.head} ${styles.bold}`}>Cluster Type</div>,
			width    : 1,
			accessor : (item) => (
				<div className={styles.head}>{item?.cluster_type ? startCase(item?.cluster_type) : '-'}</div>
			),
			id: 'cluster_type',
		},
		{
			Header   : <div className={cl`${styles.head} ${styles.bold}`}>Cluster Name</div>,
			width    : 1,
			accessor : (item) => (
				<div className={styles.head}>
					{item?.location_cluster?.cluster_name
						? startCase(item?.location_cluster?.cluster_name)
						: null}
					{item?.fcl_freight_commodity_cluster?.name
						? startCase(item?.fcl_freight_commodity_cluster?.name)
						: null}
					{item?.cluster_type === 'container'
						? item?.cluster_id.replace('_', ', ')
						: null}
				</div>
			),
			id: 'cluster_name',
		},
		{
			Header   : <div className={cl`${styles.head} ${styles.bold}`}>Cluster Reference Name</div>,
			width    : 1,
			accessor : (item) => (
				<div className={styles.head}>
					{item?.cluster_reference_name.split('.')?.[CLUSTER_SPLIT_INDEX] !== undefined
						? `${startCase(item?.cluster_reference_name.split('.')[GLOBAL_CONSTANTS.zeroth_index])}.${
							item?.cluster_reference_name.split('.')[CLUSTER_SPLIT_INDEX]
						}`
						: startCase(item?.cluster_reference_name)}
				</div>
			),
			id: 'destination_location_cluster',
		},
		{
			Header   : <div className={cl`${styles.head} ${styles.bold}`}>Trade Type</div>,
			width    : 1,
			accessor : (item) => <div className={styles.head}>{startCase(item?.trade_type) || '-'}</div>,
			id       : 'status',
		},
		{
			Header   : <div className={cl`${styles.head} ${styles.bold}`}>Charge Details</div>,
			width    : 1,
			accessor : (item) => (
				<div className={styles.head}>
					{`${
						item?.line_item_charge_code
							? startCase(item?.line_item_charge_code)
							: '-'
					} :
					${
						!Number.isNaN(item.gri_rate)
						&& (item.gri_rate || item.gri_rate === ZERO_GRI_RATE)
							? formatAmount({
								amount   : item.gri_rate,
								currency : item?.gri_currency,
								options  : {
									currencyDisplay       : 'symbol',
									style                 : 'currency',
									maximumFractionDigits : 0,
								},
							})
							: '-'
					}`}
				</div>
			),
			id: 'charge_detauils',
		},

		{ Header: 'Actions', accessor: (row) => <ActionFormat onUpdate={onUpdate} onDelete={onDelete} row={row} /> },
	];

	return tableColumns;
};

export default getTableColumns;
