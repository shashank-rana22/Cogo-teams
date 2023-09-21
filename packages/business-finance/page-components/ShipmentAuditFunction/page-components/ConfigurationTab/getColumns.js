import styles from './styles.module.css';

const getColumns = () => {
	const columns = [
		{
			id     : 'documentValue1',
			Header : (
				<div>Name</div>
			),
			accessor: (row) => (
				<div>
					{row?.document1}
				</div>
			),
		},
		{
			id     : 'documentValue2',
			Header : (
				<div className={styles.quantity}>Qty.</div>
			),
			accessor: (row) => (
				<div className={styles.quantity}>
					{row?.document2}
				</div>
			),
		},
		{
			id     : 'documentValue3',
			Header : (
				<div>Unit</div>
			),
			accessor: (row) => (
				<div>
					{row?.document3}
				</div>
			),
		},
		{
			id     : 'documentValue4',
			Header : (
				<div>Price</div>
			),
			accessor: (row) => (
				<div>
					{row?.document4}
				</div>
			),
		},
		{
			id     : 'documentValue5',
			Header : (
				<div>Margin</div>
			),
			accessor: (row) => (
				<div>
					{row?.document5}
				</div>
			),
		},
		{
			id     : 'documentValue6',
			Header : (
				<div>Ex. Rate</div>
			),
			accessor: (row) => (
				<div>
					{row?.document6}
				</div>
			),
		},
		{
			id     : 'documentValue7',
			Header : (
				<div>Tax</div>
			),
			accessor: (row) => (
				<div>
					{row?.document7}
				</div>
			),
		},
		{
			id     : 'documentValue8',
			Header : (
				<div>Cost</div>
			),
			accessor: (row) => (
				<div>
					{row?.document8}
				</div>
			),
		},

	];

	return columns;
};
export default getColumns;
