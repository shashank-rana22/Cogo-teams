import { Checkbox } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import EqualArray from '../../../config/EqualArray';

// import styles from './styles.module.css';

const getColumns = ({ selectArray, setSelectArray, ARRAY_OF_IDS, removeItem, loading }) => [
	{
		id     : 'select_options',
		Header : (
			<div role="presentation">
				<Checkbox
					checked={loading ? null : EqualArray(selectArray, ARRAY_OF_IDS)}
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
		Header   : 'EMPLOYEE',
		accessor : (item) => (
			<div>
				{startCase(item?.name) || '-'}
			</div>
		),
	},
	{
		Header   : 'ROLE',
		accessor : (item) => (
			<div>
				{startCase(item?.role) || '-'}
			</div>
		),
	},
	{
		Header   : 'TRIBE',
		accessor : (item) => (
			<div>
				{startCase(item?.tribe_name) || '-'}
			</div>
		),
	},
	{
		Header   : 'SQUAD',
		accessor : (item) => (
			<div>
				{startCase(item?.squad_name) || '-'}
			</div>
		),
	},
	{
		Header   : 'CHAPTER',
		accessor : (item) => (
			<div>
				{startCase(item?.chapter_name) || '-'}
			</div>
		),
	},
	{
		Header   : 'SUB CHAPTER',
		accessor : (item) => (
			<div>
				{startCase(item?.sub_chapter_name) || '-'}
			</div>
		),
	},
];

export default getColumns;
