import { Input, MultiSelect, SingleDateRange } from '@cogoport/components';
import { SelectController } from '@cogoport/forms';
import { useState } from 'react';

import filterControls from '../../../../configurations/filter-controls';
import { getElementController } from '../../../../utils/get-element-controls';

import styles from './styles.module.css';

function Filters(props) {
	const [value, onChange] = useState([]);
	const [date, setDate] = useState(new Date());

	const options = [

	];

	// const { formProps, controls } = props;

	// const {
	// 	control, formState: { errors },
	// } = formProps;
	return (
		<div className={styles.filter_container}>

			<div className={styles.filter}>
				{
					filterControls.map((controlItem) => {
						const el = { ...controlItem };

						const Element = getElementController(el.type);

						if (!Element) return null;

						// return (
						// 	<div style={{ width: `${Number(el.span) * 10}%` }} className={styles.form_group}>
						// 		<span>{el.label}</span>
						// 		<div style={{ width: '100%' }} className={styles.input_group}>
						// 			<Element
						// 				{...el}
						// 				key={el.name}
						// 				control={control}
						// 			/>

						// 			<div className={styles.error_message}>
						// 				{errors?.[el.name]?.message}
						// 			</div>
						// 		</div>
						// 	</div>
						// );
					})
				}
				<MultiSelect
					value={value}
					onChange={onChange}
					placeholder="Scope"
					options={options}
					isClearable
					style={{ width: '200px', margin: '0 4px 0 0' }}
				/>
				<SingleDateRange
					placeholder="Upload Date"
					dateFormat="MM/dd/yyyy"
					name="date"
					onChange={setDate}
					value={date}
					style={{ width: '200px', margin: '0 4px 0 0' }}
					isPreviousDaysAllowed

				/>
				{/* <SelectController
					control={control}
					isClearables
				/> */}
			</div>
			<div className={styles.search}>
				<Input
					placeholder="Search Filename"
					width="100%"
				/>
			</div>
		</div>
	);
}

export default Filters;
