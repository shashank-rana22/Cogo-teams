import { Button, Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { SERVICE_ICON_MAPPING } from '../../../configurations/helpers/constants';

import AddRateModal from './AddRateModal';
import CardContent from './CardContent';
import CloseModal from './CloseModal';
import DetailsView from './DetailsView';
import styles from './styles.module.css';

function ListCard({
	data = {}, getListCoverage = () => {}, filter = {}, getStats = () => {}, showAddRateModal = false,
	setShowAddRateModal = () => {}, source = {},
}) {
	const [showCloseModal, setShowCloseModal] = useState(false);

	const originCode = (
		data?.origin_port
			|| data?.origin_airport
			|| data?.port
			|| data?.origin_location
	)?.port_code;

	const originName = (
		data?.origin_port
			|| data?.origin_airport
			|| data?.port
			|| data?.origin_location
			|| data?.location
			|| data?.airport
	)?.name;

	const destinationCode = (
		data?.destination_port
			|| data?.destination_airport
			|| data?.port
			|| data?.destination_location
	)?.port_code;

	const destinationName = (
		data?.destination_port
			|| data?.destination_airport
			|| data?.port
			|| data?.destination_location
	)?.name;

	const { sources = [], container_size, container_type, commodity, weight_slabs } = data;
	const service = filter?.service;

	const ITEM_LIST = [
		{ label: commodity && startCase(commodity) },
		{ label: container_size && `${container_size}ft` },
		{ label: container_type && startCase(container_type) },
		{ label: weight_slabs && startCase(weight_slabs) },
	];

	const handleAddRate = () => {
		setShowAddRateModal((prev) => !prev);
	};

	return (
		<div className={styles.container}>
			{['live_bookings', 'rate_feedback', 'rate_request']?.includes(source)
			&& (
				<div>
					<div className={styles.head}>
						{data?.updated_at && (
							<div>
								Booked On :
								{' '}
								{formatDate({
									date       : data?.updated_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
									formatType : 'date',
								})}
							</div>
						)}
						{data?.created_at && (
							<div>
								Created At :
								{' '}
								{formatDate({
									date       : data?.created_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
									formatType : 'date',
								})}
							</div>
						)}
					</div>

					<div className={styles.body}>
						<div className={styles.top_left_details}>
							<div className={styles.service_icon}>
								<div style={{ margin: '5px 5px 0 0' }}>{SERVICE_ICON_MAPPING[service]}</div>
								<div className={styles.service_name}>{startCase(service?.replace('_freight', ''))}</div>
							</div>
							<div>
								<Pill size="md" color="orange">
									Import
								</Pill>
							</div>
							<div>
								<Pill size="md" color="blue">
									Shipping Line :
									{' '}
									{data?.shipping_line?.short_name}
								</Pill>
							</div>
						</div>
						<div>
							<Pill size="md" color="orange">
								TID:
								{' '}
								{data?.serial_id}
							</Pill>
						</div>
						<div>
							<Pill size="md" color="blue">
								Assigned to:
								{' '}
								{data?.assigned_to?.name}
							</Pill>
						</div>
					</div>
				</div>
			)}

			{['critical_ports', 'expiring_rates', 'cancelled_shipments']?.includes(source)
			&& (
				<CardContent data={data} filter={filter} service={service} />
			)}

			<div className={styles.footer}>
				<div className={styles.port_details}>
					<div className={styles.row}>
						<Tooltip
							content={(
								<div>
									{originName}
								</div>
							)}
							placement="top"
						>
							<p className={styles.port_name}>
								<div className={styles.column}>
									<p className={styles.port_code_color}>
										&#40;
										{originCode}
										&#41;
									</p>
									<p>{originName}</p>
								</div>
							</p>
						</Tooltip>
						<IcMPortArrow style={{ margin: '0 100' }} />
						<Tooltip
							content={(
								<div>
									{destinationName}
								</div>
							)}
							placement="top"
						>
							<p className={styles.port_name}>
								<div className={styles.column}>
									<p className={styles.port_code_color}>
										&#40;
										{destinationCode}
										&#41;
									</p>
									<p>{destinationName}</p>
								</div>
							</p>
						</Tooltip>
						<div className={styles.line} />
					</div>
				</div>
				<div className={styles.vertical_line} />
				<div className={styles.shipment_details}>
					<div>
						<div className={styles.tags_container}>
							{(ITEM_LIST || [])?.map((val) => (
								<div key={val?.label}>
									{val?.label !== undefined && val?.label !== null
									&& (
										<Pill>
											{' '}
											{val?.label}
										</Pill>
									)}
								</div>

							))}
						</div>
						{!isEmpty(sources) && (
							<span>
								{(sources || []).map((val) => (
									<Pill size="md" color="#EEF0F0" key={val}>
										{startCase(val)}
									</Pill>
								))}
							</span>
						)}
					</div>
					<div className={styles.vertical_line} />
					<div className={styles.button_grp}>
						{['live_bookings', 'rate_feedback', 'rate_request']?.includes(source)
								&& (
									<DetailsView data={data} source={source} filter={filter} />
								)}

						{['critical_ports', 'expiring_rates', 'cancelled_shipments']?.includes(source)
							&& (
								<div>
									{!['aborted', 'completed'].includes(filter?.status) && (
										<Button themeType="secondary" onClick={() => { setShowCloseModal(true); }}>
											Close
										</Button>
									)}
								</div>
							)}

						<Button
							style={{ marginLeft: '16px' }}
							onClick={handleAddRate}
						>
							{filter?.status !== 'completed' ? 'Add Rate' : 'Edit Rate'}
						</Button>
					</div>
				</div>
			</div>

			{showCloseModal && (
				<CloseModal
					setShowModal={setShowCloseModal}
					showModal={showCloseModal}
					data={data}
					getListCoverage={getListCoverage}
					filter={filter}
					getStats={getStats}
				/>
			)}

			{showAddRateModal && (
				<AddRateModal
					showModal={showAddRateModal}
					setShowModal={setShowAddRateModal}
					filter={filter}
					data={data}
					getStats={getStats}
					getListCoverage={getListCoverage}
				/>
			)}

		</div>
	);
}
export default ListCard;
