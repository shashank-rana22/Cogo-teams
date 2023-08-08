import styles from './styles.module.css';

const DEFAULT_NUMBER = 1;

const useGetColumns = () => [
	{
		Header   : <div className={styles.table_heading}>No.</div>,
		accessor : (item, index) => (
			<div className={styles.table_cell_item}>
				{index + DEFAULT_NUMBER}
			</div>
		),
		id: 'no',
	},
	{
		Header: (
			<div className={`${styles.table_heading} ${styles.table_heading_width}`}>
				KRA Name and Description
			</div>
		),
		accessor: (item) => (
			<>
				<div className={styles.table_cell_item_kra}>{item.kra_name}</div>
				{item.kra_description && (
					<div className={styles.table_cell_desc}>
						(
						{item.kra_description}
						)
					</div>
				)}
			</>
		),
		id: 'kra_name',
	},
	{
		Header   : <div className={styles.table_heading}>Weightage</div>,
		accessor : (item) => (
			<div className={styles.table_cell_item}>{item.weightage || '-'}</div>
		),
		id: 'weightage',
	},
	{
		Header   : <div className={styles.table_heading}>System Rating</div>,
		accessor : (item) => (
			<div className={styles.table_cell_item}>{item.system_rating || '-'}</div>
		),
		id: 'system_rating',
	},
	{
		Header   : <div className={styles.table_heading}>Manual Rating</div>,
		accessor : (item) => (
			<div className={styles.table_cell_item}>{item.system_rating || '-'}</div>
		),
		id: 'manual_rating',
	},
	{
		Header   : <div className={styles.table_heading}>Target</div>,
		accessor : (item) => (
			<div className={styles.table_cell_item}>{item.target || '-'}</div>
		),
		id: 'target',
	},
	{
		Header   : <div className={styles.table_heading}>Achieved</div>,
		accessor : (item) => (
			<div className={styles.table_cell_item}>{item.achieved_value || '-'}</div>
		),
		id: 'acheived',
	},
];

export default useGetColumns;
