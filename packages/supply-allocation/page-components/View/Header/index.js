import { Tooltip } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import { IcMArrowBack, IcMPortArrow, IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import PieChart from '../../../commons/PieChart';

import styles from './styles.module.css';

const list = ['Persona Distribution', 'Weeky Distribution', 'Container Type'];

const commonLocationProps = {
	asyncKey : 'supply_fcl_searches',
	params   : {
		service_data_required: true,
	},
	getModifiedOptions: ({ options }) => (
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

function RenderLocation({
	name, editMode, control, type,	locationSearchId, setLocationSearchId,
}) {
	console.log('locationSearchId:', locationSearchId);
	return (
		<div style={{ width: '180px' }}>
			{editMode ? (
				<AsyncSelectController
					name={`${name.toLowerCase()}_location_id`}
					control={control}
					isClearable
					label={`Select ${name} SeaPort`}
					labelKey={`${type}_display_name`}
					valueKey={`${type}_location_id`}
					{...commonLocationProps}
					onChange={(_, item) => {
						setLocationSearchId(item.id);
					}}
				/>
			) : (
				<Tooltip
					content={<div className={styles.location_name_tooltip}>{name}</div>}
					placement="bottom"
					theme="light"
					style={{ marginBottom: '24px' }}
				>
					<div className={styles.location_name}>{name}</div>
				</Tooltip>
			)}
		</div>
	);
}

function Header({ graphData, count, originName, destinationName }) {
	const router = useRouter();
	const [editMode, setEditMode] = useState(false);
	const [locationSearchId, setLocationSearchId] = useState('');
	const { control } = useForm();

	const onClickBack = () => {
		router.push('/supply-allocation');
	};

	return (
		<>
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

				<RenderLocation
					name={originName}
					editMode={editMode}
					control={control}
					type="origin"
					locationSearchId={locationSearchId}
					setLocationSearchId={setLocationSearchId}

				/>

				<div>
					<IcMPortArrow className="port_arrow_icon" width={30} height={30} />
				</div>

				<RenderLocation
					name={destinationName}
					editMode={editMode}
					control={control}
					type="destination"
					locationSearchId={locationSearchId}
					setLocationSearchId={setLocationSearchId}
				/>

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

			<Graph graphData={graphData} count={count} />
		</>
	);
}

export default Header;
