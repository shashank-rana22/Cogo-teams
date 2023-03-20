import { Toggle, Input, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({
	activeToggle,
	setActiveToggle,
	searchTasksVal,
	setSearchTasksVal,
	// shipmentDocumentsHookSetters,
	// shipmentFilters,
	shipment_data,
}) {
	return (
		<div className={styles.heading}>
			<div className={styles.sub_heading}>
				<Input
					value={searchTasksVal}
					size="md"
					placeholder="Search..."
					suffix={<IcMSearchlight style={{ fontSize: '16px' }} />}
					style={{ padding: '6px', marginRight: '6px' }}
					onChange={(e) => {
						setSearchTasksVal(e?.target?.value);
					}}
				/>

				{!activeToggle ? (
					<div className={styles.sub_heading}>
						<Select
							placeholder="Select Source"
							width="200px"
							style={{ padding: '6px', marginRight: '6px' }}
						/>
						<Select
							placeholder="Select Service"
							width="200px"
							style={{ padding: '6px', marginRight: '6px' }}
						/>

						{/* <div style={{ marginTop: '10px' }}>
							<Select
								placeholder="Select Date"
								options={dates.map((item) => ({ label: item, value: item }))}
								onChange={(item) => onDateChange(item)}
								value={value.dates_of_month}
								{...rest}
							/>
						</div> */}
					</div>
				) : null}

			</div>

			<Toggle
				name="myTransilates"
				size="md"
				offLabel="Check List"
				onLabel="Wallet"
				value={activeToggle}
				onChange={() => setActiveToggle(!activeToggle)}
			/>
			{/* <div className={styles.line} style={{ width: '100%' }} /> */}
		</div>
	);
}

export default Header;
