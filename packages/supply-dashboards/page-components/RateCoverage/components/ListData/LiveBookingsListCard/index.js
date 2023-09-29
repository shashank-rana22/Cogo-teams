import { Pill, Tooltip, Button, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMFcl, IcMPortArrow } from '@cogoport/icons-react';

import useGetShipment from '../../../hooks/useGetShipment';
import AddRateModal from '../ListCard/AddRateModal';

import ServiceDetails from './Details';
import styles from './styles.module.css';

function LiveBookingsListCard({
	showAddRateModal = false, setShowAddRateModal = () => {},
	data = {}, filter = {}, getStats = () => {}, getListCoverage = () => {},
	source,
}) {
	const {
		created_at = '', updated_at = '', shipping_line = {},
		serial_id = '', assigned_to = {}, container_type = '', container_size = '', commodity = '', source_id = '',
	} = data || {};

	const { data:shipmemnt_data, getShipment = () => {} } = useGetShipment({ source_id });

	const handleDetailView = () => {
		if (source === 'live_bookings') {
			return getShipment();
		}
		return getListCoverage(null, source_id);
	};

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				{updated_at && (
					<div>
						Booked On :
						{' '}
						{formatDate({
							date       : updated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
							formatType : 'date',
						})}
					</div>
				)}
				{created_at && (
					<div>
						Created At :
						{' '}
						{formatDate({
							date       : created_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
							formatType : 'date',
						})}
					</div>
				)}
			</div>

			<div className={styles.body}>
				<div className={styles.top_left_details}>
					<div className={styles.service_icon}>
						<div style={{ margin: '5px 5px 0 0' }}><IcMFcl width="20px" height="20px" /></div>
						<div className={styles.service_name}>FCL</div>
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
							{shipping_line?.short_name}
						</Pill>
					</div>
				</div>
				<div>
					<Pill size="md" color="orange">
						TID:
						{' '}
						{serial_id}
					</Pill>
				</div>
				<div>
					<Pill size="md" color="blue">
						Assigned to:
						{' '}
						{assigned_to?.name}
					</Pill>
				</div>
			</div>

			<div className={styles.body}>
				<div className={styles.port_details}>
					<div className={styles.row}>
						<Tooltip
							content={(
								<div>
									{data?.origin_port?.name || data?.origin_airport?.name}
								</div>
							)}
							placement="top"
						>
							<p className={styles.port_name}>
								<div className={styles.column}>
									<p className={styles.port_code_color}>
										&#40;
										{data?.origin_port?.port_code || data?.origin_airport?.port_code}
										&#41;
									</p>
									<p>{data?.origin_port?.name || data?.origin_airport?.name}</p>
								</div>
							</p>
						</Tooltip>
						<IcMPortArrow style={{ margin: '0 100' }} />
						<Tooltip
							content={(
								<div>
									{data?.destination_port?.name || data?.destination_airport?.name}
								</div>
							)}
							placement="top"
						>
							<p className={styles.port_name}>
								<div className={styles.column}>
									<p className={styles.port_code_color}>
										&#40;
										{data?.destination_port?.port_code || data?.destination_airport?.port_code }
										&#41;
									</p>
									<p>{data?.destination_port?.name || data?.destination_airport?.name}</p>
								</div>
							</p>
						</Tooltip>
					</div>
				</div>
				<div className={styles.vertical_line} />

				<div className={styles.top_left_details}>
					<div>
						<Pill>
							{container_size}
							{' '}
							ft
						</Pill>
					</div>
					<div><Pill>{container_type}</Pill></div>
					<div><Pill>{commodity}</Pill></div>
				</div>

				<div className={styles.vertical_line} />
				<div className={styles.top_left_details}>
					<Popover
						placement="left"
						size="md"
						render={(
							<ServiceDetails
								shipmemnt_data={shipmemnt_data}
								data={data}
							/>
						)}
					>
						<Button
							size="sm"
							style={{ marginRight: '10px' }}
							themeType="secondary"
							onClick={handleDetailView}
						>
							View Details
						</Button>
					</Popover>
					<Button size="sm" onClick={() => setShowAddRateModal(!showAddRateModal)}>Add Rate</Button>
				</div>

			</div>
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

export default LiveBookingsListCard;
