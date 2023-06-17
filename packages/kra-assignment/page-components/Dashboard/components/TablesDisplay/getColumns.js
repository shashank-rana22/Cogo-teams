import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getColumns = () => [
	{
		Header   : 'SELECT',
		accessor : (item) => (
			<div>
				{/* {startCase(item?.tribe_name) || '-'} */}
				SELECT
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
				{startCase(item?.tribe?.tribe_name) || '-'}
			</div>
		),
	},
	{
		Header   : 'SQUAD',
		accessor : (item) => (
			<div>
				{startCase(item?.squad?.squad_name) || '-'}
			</div>
		),
	},
	{
		Header   : 'CHAPTER',
		accessor : (item) => (
			<div>
				{startCase(item?.chapter?.chapter_name) || '-'}
			</div>
		),
	},
	{
		Header   : 'SUB CHAPTER',
		accessor : (item) => (
			<div>
				{startCase(item?.sub_chapter?.sub_chapter_name) || '-'}
			</div>
		),
	},
];

export default getColumns;
