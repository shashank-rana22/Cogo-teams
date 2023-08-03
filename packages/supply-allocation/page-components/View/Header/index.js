import { AsyncSelectController, useForm } from '@cogoport/forms';
import { IcMArrowBack, IcMPortArrow, IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import PieChart from '../../../commons/PieChart';
import RenderLabelNew from '../../../commons/RenderLabelNew';
import dummyData from '../../../Dummy Data/reponsive-pie-data.json';

const list = ['Persona Distribution',
	'Weeky Distribution',
	'Container Type'];

const commonLocationProps = {
	asyncKey : 'list_locations',
	params   : {
		filters: {
			type: 'seaport',
		},
		page_limit : 10,
		sort_by    : 'name',
		sort_type  : 'asc',
		includes   : { default_params_required: true },
	},
	labelKey    : 'display_name',
	renderLabel : (item) => <RenderLabelNew data={item} />,
	initialCall : true,
	placeholder : 'Search via port name/code...',
};

function Graph() {
	return (
		<div style={{ display: 'flex', gap: '16px', width: '100%' }}>
			{list.map((item) => (
				<PieChart
					key={item}
					data={dummyData}
					chartName={item}

				/>
			))}
		</div>

	);
}

function Header() {
	const router = useRouter();

	const [isEditMode, setIsEditMode] = useState(false);

	const { control } = useForm({});

	const onClickBack = () => {
		router.push('/supply-allocation');
	};

	return (
		<>
			<div style={{
				display        : 'flex',
				justifyContent : 'space-between',
				alignItems     : 'center',
				background     : '#fff',
				padding        : '10px',
				marginBottom   : '10px',
			}}
			>
				<IcMArrowBack
					height={30}
					width={30}
					onClick={() => onClickBack()}
				/>

				<div style={{ width: '180px' }}>
					{isEditMode ? ('Shanghai (CNSHA), China') : (
						<AsyncSelectController
							name="origin_location_id"
							control={control}
							isClearable
							label="Select Origin SeaPort"
							{...commonLocationProps}
						/>
					)}

				</div>

				<div>
					<IcMPortArrow
						className="port_arrow_icon"
						width={30}
						height={30}
					/>
				</div>

				<div style={{ width: '180px' }}>
					{isEditMode ? ('Jawaharlal Nehru (INNSA), India') : (
						<AsyncSelectController
							name="destination_location_id"
							control={control}
							isClearable
							label="Select Origin SeaPort"
							{...commonLocationProps}
						/>
					)}

				</div>

				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div>Avg Profitability</div>
					<div>73%</div>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div>% Fulfillment (On best rate)</div>
					<div>67%</div>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div>Forecasted Vol</div>
					<div>600 TEU</div>
					{' '}

				</div>

				<div style={{ cursor: 'pointer' }} role="presentation" onClick={() => setIsEditMode((prev) => !prev)}>
					<IcMEdit fill="#F68B21" width={14} height={14} style={{ marginRight: 12 }} />
				</div>
			</div>

			<Graph />

		</>
	);
}
export default Header;
