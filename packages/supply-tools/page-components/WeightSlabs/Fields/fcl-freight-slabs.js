import { Tooltip, Button } from '@cogoport/components';
import { IcCCogoassured } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const fclColumns = ({ handleAction, handleDeleteRecord }) => {
	const columns = [
		{
			span   : 0.5,
			render : (item) => (
				<div className={styles.title_back}>
					<Tooltip
						content={item?.is_cogo_assured && 'Cogo Assured'}
						placement="top"
					>
						<div>
							{item?.is_cogo_assured ? <IcCCogoassured width={24} height={24} /> : null}
						</div>
					</Tooltip>
				</div>
			),
			id: 'cogo_assured',
		},
		{
			label  : 'Origin Port',
			key    : 'origin_port',
			name   : 'origin_port',
			span   : 2,
			render : (item) => (
				<div className={styles.title_back}>
					<Tooltip
						content={
							item?.origin_location_name
								? item?.origin_location_name
								: 'ALL PORTS'
						}
					>
						<div className={styles.details}>
							{item?.origin_location_name
								? item?.origin_location_name
								: 'ALL PORTS'}
						</div>
					</Tooltip>
				</div>
			),
			id: 'origin',
		},
		{
			label  : 'Destination Port',
			key    : 'destination_port',
			name   : 'destination_port',
			span   : 2,
			render : (item) => (
				<div className={styles.title_back}>
					<Tooltip
						content={
							item?.destination_location_name
								? item?.destination_location_name
								: 'ALL PORTS'
						}
					>
						<div className={styles.details}>
							{item?.destination_location_name
								? item?.destination_location_name
								: 'ALL PORTS'}
						</div>
					</Tooltip>
				</div>
			),
			id: 'destination',
		},
		{
			label  : 'Container Details',
			key    : 'container_details',
			name   : 'container_details',
			span   : 1.5,
			render : (item) => (
				<div className={styles.title_back}>
					<div className={styles.details}>
						{item?.container_size || item?.commodity
							? `${
								item?.container_size ? `${item?.container_size}FT` : '-'
							} | ${item?.commodity ? startCase(item?.commodity) : '-'}`
							: 'ALL CARGO DETAILS'}
					</div>
				</div>
			),
			id: 'container_details',
		},
		{
			label  : 'Trade Type',
			key    : 'trade_type',
			name   : 'trade_type',
			span   : 1,
			render : (item) => (
				<div className={styles.title_back}>
					<div className={styles.details}>
						{item?.trade_type ? startCase(item?.trade_type) : 'ALL TRADE TYPE'}
					</div>
				</div>
			),
			id: 'trade_type',
		},
		{
			label  : 'Organization Category',
			key    : 'organization_category',
			name   : 'organization_category',
			span   : 2,
			render : (item) => (
				<div className={styles.title_back}>
					<div className={styles.details}>
						{`
						${
							item?.organization_category
								? startCase(item?.organization_category)
								: 'ALL ORGANIZATION CATEGORY'
						}
					`}
					</div>
				</div>
			),
			id: 'organization_category',
		},
		{
			label  : 'Max Weight',
			key    : 'max_weight',
			name   : 'max_weight',
			span   : 1,
			render : (item) => (
				<div className={styles.title_back}>
					<div className={styles.details}>{item.max_weight ? `${item.max_weight} MT` : '-'}</div>
				</div>
			),
			id: 'max_weight',
		},
		{
			label  : 'ACTIONS',
			key    : 'actions',
			name   : 'actions',
			span   : 2,
			render : (item) => (
				<div className={styles.button_container}>
					<Button
						onClick={() => {
							handleAction({ ...item, isEdit: true });
						}}
						themeType="primary"
						className={styles.button}
					>
						Update
					</Button>
					<Button
						onClick={() => {
							handleDeleteRecord({ ...item, status: 'inactive' });
						}}
						themeType="secondary"
						className={styles.button}
					>
						Delete
					</Button>
				</div>
			),

			id: 'remarkscheck',
		},
	];
	return columns;
};

export default fclColumns;
