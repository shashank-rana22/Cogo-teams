import styles from './styles.module.css';

function Nodes({ type = '' }) {
	const directNode = [
		{
			title : 'Affiliate',
			count : 2,
		},
		{
			title : 'Active',
			count : 2,
		},
		{
			title : 'Inactive',
			count : 2,
		},
	];

	const networkNode = [
		{
			title : 'Levels',
			count : 2,
		},
		{
			title : 'Nodes',
			count : 200,
		},

	];

	const allotedCogopoints = [
		{
			title : 'Direct',
			count : 20000,
		},
		{
			title : 'Indirect',
			count : 600000,
		},

	];

	const holdedCogopoints = [
		{
			title : 'Direct',
			count : 20000,
		},
		{
			title : 'Indirect',
			count : 200000,
		},

	];
	const nodeMapping = {
		direct_node        : directNode,
		network_node       : networkNode,
		alloted_cogopoints : allotedCogopoints,
		holded_cogopoints  : holdedCogopoints,
	};
	const mappingData = nodeMapping[type];

	return (
		<>
			{(mappingData || []).map((node) => (
				<div className={styles.node}>
					<div className={styles.node_title}>
						{node.title}
					</div>
					<div className={styles.node_count}>
						{node.count}
					</div>
				</div>
			))}
		</>

	);
}

export default Nodes;
