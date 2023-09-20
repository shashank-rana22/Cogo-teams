import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

export const columns = ({
	handleShowModal,
	showData,
	setshowData,
	sortType,
	setSortType,
	activeTab,
}) => {
	const colorMapping = {
		ongoing       : '#FFF4D0',
		completed     : '#CDF7D4',
		cargo_dropped : '#CDF7D4',
	};

	return useMemo(() => [
		{

			Header   : <p>SERIAL ID</p>,
			accessor : (item) => (
				<div>
					{item?.serial_id ? (
						<p className="serialId">
							{`${item?.serial_id}`}
						</p>
					) : (
						''
					)}
				</div>
			),
			id: 'serial_id',
		},
		{
			Header   : <p>Truck No./LR NO</p>,
			accessor : (item) => (
				<>
					{item?.truck_number ? (
						<p
							className="id"
							style={{ fontSize: '14px' }}
						>
							{`${item?.truck_number}`}

						</p>
					) : (
						''
					)}
				</>
			),
			id: 'truck_no',
		},
		{
			id       : 'service_provider',
			Header   : <p className="shippingline">Service Provider</p>,
			accessor : (item) => (
				<p className="shippinglinedata">
					<div className="title">{item?.service_provider?.business_name}</div>
				</p>
			),
		},
		{
			id     : 'created_at',
			Header : (
				<div>
					<p>
						CREATED AT
						{' '}
						<IcMArrowRotateDown
							onClick={() => {
								setshowData('created_at');
								setSortType(!sortType);
							}}
							className={`sort-icon ${
								showData === 'created_at'
								&& sortType
								&& activeTab === 'truck_tracking'
									? 'active'
									: 'inactive'
							}`}
							style={{
								width      : '14px',
								height     : '16px',
								marginLeft : '8px',
							}}
						/>
					</p>
				</div>
			),
			accessor: (item) => (
				<p>
					{formatDate({
						date       : item?.created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						formatType : 'date',
					})}
				</p>
			),
		},
		{
			id     : 'updated_at',
			Header : (
				<div>
					<p>
						LAST UPDATED AT
						<IcMArrowRotateDown
							onClick={() => {
								setshowData('updated_at');
								setSortType(!sortType);
							}}
							className={`sort-icon ${
								showData === 'updated_at'
								&& sortType
								&& activeTab === 'truck_tracking'
									? 'active'
									: 'inactive'
							}`}
							style={{
								width      : '14px',
								height     : '10px',
								marginLeft : '8px',
							}}
						/>
					</p>
				</div>
			),
			accessor: (item) => (
				<div>
					<p>
						{formatDate({
							date       : item?.updated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
							formatType : 'date',
						})}
					</p>
				</div>
			),
		},
		{
			id       : 'container_update',
			Header   : <p>ACTIONS</p>,
			accessor : (item) => (
				<Button onClick={() => handleShowModal(item)}>
					View Status
				</Button>
			),
		},
		{
			Header   : <p>STATUS</p>,
			accessor : (item) => {
				let action = '';
				if (item?.status) {
					action = (
						<div active={colorMapping[item.status]}>
							{item?.status === 'completed' ? (
								<div className="newColor">{startCase(item.status)}</div>
							) : (
								''
							)}
							{item?.status === 'ongoing' ? (
								<div className="updateColor">{startCase(item?.status)}</div>
							) : (
								''
							)}
							{item?.status === 'cargo_dropped' ? (
								<div className="updateColor">{startCase(item?.status)}</div>
							) : (
								''
							)}
						</div>
					);
				}
				return <span>{action}</span>;
			},

			id: 'actions',
		},
	]);
};
