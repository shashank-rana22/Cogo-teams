import { Button, Pill, Tags, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { SERVICE_ICON_MAPPING } from '../../../configurations/helpers/constants';

import AddRateModal from './AddRateModal';
import CloseModal from './CloseModal';
import styles from './styles.module.css';

const ITEM_LIST = ['container_size', 'container_type', 'commodity', 'weight_slabs'];

function ListCard({
	data = {}, getListCoverage = () => {}, filter = {}, getStats = () => {}, showAddRateModal = false,
	setShowAddRateModal = () => {},
}) {
	const { sources = [] } = data;
	const service = filter?.service === 'air_freight' ? 'AIR' : 'FCL';

	const items = (ITEM_LIST || []).map((item) => ({
		children : startCase(data[item]),
		disabled : false,
		color    : '#F7F7F7',
		tooltip  : false,
	}));

	const [showCloseModal, setShowCloseModal] = useState(false);

	const handleAddRate = () => {
		setShowAddRateModal((prev) => !prev);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.top_left_details}>
					<div className={styles.service_icon}>
						<div style={{ margin: '5px 5px 0 0' }}>{SERVICE_ICON_MAPPING[service]}</div>
						<div style={{ marginRight: '5px' }}>{service}</div>
					</div>
					<div className={styles.vertical_line} />
					<div>
						<Pill size="md" color="green">
							{filter?.service === 'fcl_freight' ? 'Shipping Line:' : 'Air Line:'}
							{data?.shipping_line?.short_name || data?.airline?.short_name}
						</Pill>
					</div>
					<div className={styles.vertical_line} />
					<div>
						{data?.service_provider?.business_name || data?.service_provider?.name}
					</div>
				</div>
				<div className={styles.pill_container}>
					{data?.serial_id
					&& (
						<div className={styles.pill}>
							<Pill size="md" color="#ffe7d5">
								<span>
									TID :
									{' '}
									{data?.serial_id}
								</span>
							</Pill>
						</div>
					)}
					{data?.assigned_to?.name
					&& (
						<div className={styles.pill}>
							<Pill size="md" color="#EEF0F0">
								<span>
									Assigned to :
									{' '}
									{data?.assigned_to?.name}
								</span>
							</Pill>
						</div>
					)}
					{data?.closed_by?.name
					&& (
						<div className={styles.pill}>
							<Pill size="md" color="#EEF0F0">
								<span>
									Closed by :
									{' '}
									{data?.closed_by?.name}
								</span>
							</Pill>
						</div>
					)}
					<div>
						Last Updated At:
						{' '}
						{data?.created_at ? formatDate({
							date       : data?.created_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
							formatType : 'date',
						}) : '_'}
					</div>
				</div>
			</div>

			<div className={styles.footer}>
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
						<div className={styles.line} />
					</div>
				</div>
				<div className={styles.vertical_line} />
				<div className={styles.shipment_details}>
					<div className={styles.col} style={{ width: '60%' }}>
						<div className={styles.tags_container}>
							<Tags
								size="sm"
								items={items.filter((item) => !!item.children)}
							/>
						</div>
						{!isEmpty(sources) && (
							<span>
								{(sources || []).map((source) => (
									<Pill size="md" color="#EEF0F0" key={source}>
										{startCase(source)}
									</Pill>
								))}
							</span>
						)}
					</div>
					<div className={styles.vertical_line} />
					<div className={styles.button_grp}>
						{!['aborted', 'completed'].includes(filter?.status) && (
							<Button themeType="secondary" onClick={() => { setShowCloseModal(true); }}>
								Close
							</Button>
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
