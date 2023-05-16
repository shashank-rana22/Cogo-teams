import styles from './styles.module.css';

function Nodes({ item = {}, type = '' }) {
	const { immediate_child_count = 0, total_child_count = 0, cogopoints = {}	} = item;

	const {
		network_cogopoint_earned = 0,
		network_cogopoint_estimated = 0,
		referral_cogopoint_earned = 0,
		referral_cogopoint_estimated = 0,
	} = cogopoints;

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
			count : total_child_count - immediate_child_count,
		},

	];

	const allotedCogopoints = [
		{
			title : 'Direct',
			count : referral_cogopoint_earned,
		},
		{
			title : 'Indirect',
			count : network_cogopoint_earned,
		},

	];

	const holdedCogopoints = [
		{
			title : 'Direct',
			count : referral_cogopoint_estimated,
		},
		{
			title : 'Indirect',
			count : network_cogopoint_estimated,
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
				<div className={styles.node} key={node}>
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
