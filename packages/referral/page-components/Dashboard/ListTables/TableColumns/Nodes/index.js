import nodeColumns from '../../../../../configurations/node-columns';

import styles from './styles.module.css';

function Nodes({ index = 0, item = {}, type = '' }) {
	const { directNode, holdedCogopoints, allotedCogopoints, networkNode } = nodeColumns({ item });

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
					{index === 0 ? (
						<div className={styles.node_title}>
							{node.title}
						</div>
					) : ''}
					<div className={styles.node_count}>
						{node.count}
					</div>
				</div>
			))}
		</>

	);
}

export default Nodes;
