import { Checkbox } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const getColumns = ({ selectObject, setSelectObject, OBJECT_OF_IDS, loading, allElementsPresent }) => [
	{
		id     : 'select_options',
		Header : (
			<div role="presentation">
				<Checkbox
					checked={loading ? null : allElementsPresent}
					onChange={() => {
						if (allElementsPresent) {
							setSelectObject({});
						} else {
							setSelectObject({ ...OBJECT_OF_IDS });
						}
					}}
				/>
			</div>
		),
		accessor: (item) => (
			<div>
				<Checkbox
					checked={selectObject[item?.id]}
					onChange={() => {
						setSelectObject((pv) => ({
							...pv,
							[item?.id]: !pv?.[item?.id],
						}));
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
				{startCase(item?.role_name) || '-'}
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
