import styles from './styles.module.css';

function NodeColumns({ index = 0, item = {}, type = '' }) {
	const { direct = 0, indirect = 0 } = item;
	const { direct: expecteCogopoint = 0, indirect: inexpectedCogopoints = 0 } = item;
	const subTitleOptions = [
		{
			title : 'Direct',
			name  : 'direct',
			count : type === 'total_cogopoints' ? direct : expecteCogopoint,
		},
		{
			title : 'Indirect',
			name  : 'indirect',
			count : type === 'total_cogopoints' ? indirect : inexpectedCogopoints,
		},
	];

	return (
		subTitleOptions.map((node) => (
			<div className={styles.node} key={node.name}>
				{index === 0 ? (
					<div className={styles.node_title}>
						{node.title}
					</div>
				) : ''}
				<div className={styles.node_count}>
					{node.count}
				</div>
			</div>
		))
	);
}

export default NodeColumns;
