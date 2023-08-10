import { Button, Tooltip } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import { IcMArrowBack, IcMPortArrow, IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import PieChart from '../../../commons/PieChart';

import styles from './styles.module.css';

const list = ['Persona Distribution', 'Weeky Distribution', 'Container Type'];

const commonLocationProps = {
	asyncKey           : 'supply_fcl_searches',
	getModifiedOptions : ({ options }) => (
		options.map((option) => ({
			...option,
			origin_display_name      : option.origin_location.display_name,
			destination_display_name : option.destination_location.display_name,

		}))
	),
	renderLabel : (item) => item.origin_location.display_name,
	initialCall : true,
	placeholder : 'Search via port name/code...',
};

function Graph({ graphData, count }) {
	return (
		<div style={{ display: 'flex', gap: '16px', width: '100%' }}>
			{list.map((item) => (
				<PieChart key={item} data={graphData} chartName={item} count={count} />
			))}
		</div>
	);
}

function Header({ graphData, count, originName, destinationName }) {
	const router = useRouter();
	const [editMode, setEditMode] = useState(false);
	const [locationSearchId, setLocationSearchId] = useState('');
	const { control, watch, reset } = useForm();
	const { origin_location_id, destination_location_id } = watch();
	const onClickBack = () => {
		router.push('/supply-allocation');
	};
	const onClickSearch = () => {
		router.push(`/supply-allocation/view/${locationSearchId}`);
		reset();
	};
	return (
		<>
			{!editMode
				? (
					<div
						style={{
							display        : 'flex',
							justifyContent : 'space-between',
							alignItems     : 'center',
							background     : '#fff',
							padding        : '10px',
							marginBottom   : '10px',
						}}
					>
						<IcMArrowBack height={30} width={30} onClick={onClickBack} />

						<Tooltip
							content={<div className={styles.location_name_tooltip}>{originName}</div>}
							placement="bottom"
							theme="light"
							style={{ marginBottom: '24px' }}
						>
							<div className={styles.location_name}>{originName}</div>
						</Tooltip>

						<div>
							<IcMPortArrow className="port_arrow_icon" width={30} height={30} />
						</div>

						<Tooltip
							content={(
								<div className={styles.location_name_tooltip}>
									{destinationName}
								</div>
							)}
							placement="bottom"
							theme="light"
							style={{ marginBottom: '24px' }}
						>
							<div className={styles.location_name}>{destinationName}</div>
						</Tooltip>

						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div className={styles.sub_heading}>Avg Profitability</div>
							{!editMode ? <div className={styles.bold}>73%</div> : '--'}
						</div>

						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div className={styles.sub_heading}>% Fulfillment (On best rate)</div>
							{!editMode ? <div className={styles.bold}>67%</div> : '--'}
						</div>

						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div className={styles.sub_heading}>Forecasted Vol</div>
							{!editMode ? <div className={styles.volume}>600 TEU</div> : '--'}
						</div>

						<div
							style={{ cursor: 'pointer' }}
							role="presentation"
							onClick={() => setEditMode((prev) => !prev)}
						>
							<IcMEdit
								fill="#F68B21"
								width={14}
								height={14}
								style={{ marginRight: 12 }}
							/>
						</div>
					</div>
				) : (
					<div
						style={{
							display        : 'flex',
							alignItems     : 'center',
							background     : '#fff',
							padding        : '10px',
							marginBottom   : '10px',
							justifyContent : 'space-between',
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center' }}>

							<IcMArrowBack height={30} width={30} onClick={onClickBack} />
							<div style={{ width: '350px', marginRight: '20px', marginLeft: '20px' }}>
								<AsyncSelectController
									name="origin_location_id"
									control={control}
									isClearable
									labelKey="origin_display_name"
									valueKey="origin_location_id"
									{...commonLocationProps}
									onChange={(_, item) => {
										setLocationSearchId(item.id);
									}}
									params={{
										service_data_required: true,
										...(destination_location_id ? { filters: { destination_location_id } } : {}),
									}}
									renderLabel={(item) => item.origin_location.display_name}
								/>
							</div>
							<div style={{ marginRight: '20px' }}>
								<IcMPortArrow className="port_arrow_icon" width={30} height={30} />
							</div>
							<div style={{ width: '350px' }}>
								<AsyncSelectController
									name="destination_location_id"
									control={control}
									isClearable
									labelKey="destination_display_name"
									valueKey="destination_location_id"
									{...commonLocationProps}
									onChange={(_, item) => {
										setLocationSearchId(item.id);
									}}
									renderLabel={(item) => item.destination_location.display_name}
									params={{
										service_data_required: true,
										...(origin_location_id ? { filters: { origin_location_id } } : {}),
									}}
								/>

							</div>

						</div>

						<div style={{ display: 'flex' }}>

							<Button
								style={{ display: 'flex', marginRight: '20px' }}
								onClick={() => setEditMode((prev) => !prev)}
								themeType="secondary"
							>
								Cancel

							</Button>
							<Button themeType="accent" onClick={onClickSearch}>Search</Button>

						</div>
					</div>
				)}

			<Graph graphData={graphData} count={count} />
		</>
	);
}

export default Header;
