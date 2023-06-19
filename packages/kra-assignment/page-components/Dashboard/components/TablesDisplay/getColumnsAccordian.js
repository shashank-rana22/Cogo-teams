import { Checkbox } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import EqualArray from '../../../config/EqualArray';

// import styles from './styles.module.css';

const getColumnsAccordian = ({ selectArray, setSelectArray, ARRAY_OF_IDS, removeItem }) => [
	{
		id     : 'select_options',
		Header : (
			<div role="presentation">
				<Checkbox
					checked={EqualArray(selectArray, ARRAY_OF_IDS)}
					onChange={() => {
						if (EqualArray(selectArray, ARRAY_OF_IDS)) {
							setSelectArray([]);
						} else {
							setSelectArray([...ARRAY_OF_IDS]);
						}
					}}
				/>
			</div>
		),
		accessor: (item) => (
			<div>
				<Checkbox
					checked={selectArray.includes(item.id)}
					onChange={() => {
						if (!selectArray.includes(item.id)) { setSelectArray([...selectArray, item.id]); } else {
							removeItem(item.id);
						}
					}}
				/>
			</div>
		),
	},
	{
		Header   : 'EMPLOYEE NAME',
		accessor : (item) => (
			<div>
				{startCase(item?.name) || '-'}
			</div>
		),
	},
	{
		Header   : 'WEIGHTAGE',
		accessor : (item) => (
			<div>
				{item?.weightage || '-'}
			</div>
		),
	},
];

export default getColumnsAccordian;
