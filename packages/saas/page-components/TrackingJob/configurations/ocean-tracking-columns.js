import { Button, Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useMemo } from 'react';

import styles from './styles.module.css';

const FIRST_INDEX = 1;
export const columns = ({
	handleShowModal,
	showData,
	setshowData,
	sortType,
	setSortType,
	activeTab,
}) => {
	const logo = ({ name }) => {
		if (name === 'BLPL') {
			return 'blpl';
		}
		if (name === 'Avana') {
			return 'avana';
		}
		return 'image';
	};

	const COLOR_MAPPING = {
		track_new       : '#CDF7D4',
		update_required : '#FFF4D0',
		seen            : '#caf0f8',
	};

	return useMemo(() => [
		{
			Header   : <p>SERIAL ID</p>,
			accessor : (item) => (
				<div>
					{item?.data?.serial_id ? (
						<div className="serialId">
							{`#${item?.data?.serial_id}`}
						</div>
					) : (
						''
					)}
				</div>
			),
			id: 'serial_id',
		},
		{
			Header   : <p>CONTAINER NO./BL NO</p>,
			accessor : ({ item }) => {
				const totalFunctionPills = item?.data?.tags.length;

				if (totalFunctionPills <= FIRST_INDEX) {
					(item?.data?.tags).map((items) => (
						<Pill
							key={items}
							className={styles.function_head}
							color="red"
						>
							{items}
						</Pill>
					));
				}

				const renderTooltip = item?.data?.tags.slice(FIRST_INDEX).map((item) => (
					<Pill
						key={item}
						className={styles.function_head}
						color="red"
					>
						{item}
					</Pill>
				));

				return (
					<section>
						<div className={styles.sub_functions_container}>
							{item?.data?.tags[GLOBAL_CONSTANTS.zeroth_index] && (
								<Pill className={styles.function_head} color="red">
									{item?.data?.tags[GLOBAL_CONSTANTS.zeroth_index]}
								</Pill>
							)}

							{totalFunctionPills > FIRST_INDEX && (
								<Tooltip content={renderTooltip} placement="top">
									<strong>
										(+
										{totalFunctionPills - FIRST_INDEX}
										)
									</strong>
								</Tooltip>
							)}

						</div>
					</section>
				);
			},
			id: 'container_no',
		},
		{
			id       : 'company_logo',
			Header   : <p className="shippingline">SHIPPING LINE</p>,
			accessor : (item) => (
				<div className="shippinglinedata">
					{item?.shipping_line?.logo_url && (
						<img
							className={logo({ name: item?.shipping_line?.short_name })}
							src={item?.shipping_line?.logo_url}
							alt=""
						/>
					)}
					<div className="title">{item?.shipping_line?.short_name}</div>
				</div>
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
								&& activeTab === 'ocean_tracking'
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
						date       : item?.data?.created_at,
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
								&& activeTab === 'ocean_tracking'
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
							date       : item?.data?.updated_at,
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
					update
				</Button>
			),
		},
		{
			Header   : <p>LAST UPDATED BY</p>,
			accessor : (item) => <span>{item?.performed_by?.name}</span>,
			id       : 'last_updated_by',
		},
		{
			Header   : <p>STATUS</p>,
			accessor : (item) => {
				let action = '';
				if (item?.data?.action) {
					action = (
						<div active={COLOR_MAPPING[item?.data?.action]}>
							{item?.data?.action === 'track_new' ? (
								<div className="newColor">New</div>
							) : (
								''
							)}
							{item?.data?.action === 'update_required' ? (
								<div className="updateColor" style={{ color: '#805b10' }}>
									Update
								</div>
							) : (
								''
							)}
							{item?.data?.action === 'seen' ? (
								<div className="seenColor">Seen</div>
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
