import styles from './styles.module.css';

const MINIMUM_VALUE = 0;

function NodeColumns({ index = MINIMUM_VALUE, item = {}, type = '' }) {
	const { cogopoints = {} } = item || {};
	const {
		network_cogopoint_earned = MINIMUM_VALUE,
		network_cogopoint_estimated = MINIMUM_VALUE,
		referral_cogopoint_earned = MINIMUM_VALUE,
		referral_cogopoint_estimated = MINIMUM_VALUE,
	} = cogopoints || {};

	const subTitleOptions = [
		{
			title : 'Direct',
			name  : 'direct',
			count : type === 'total_cogopoints' ? referral_cogopoint_earned : referral_cogopoint_estimated,
		},
		{
			title : 'Indirect',
			name  : 'indirect',
			count : type === 'total_cogopoints' ? network_cogopoint_earned : network_cogopoint_estimated,
		},
	];

	return (
		subTitleOptions.map((node) => (
			<div className={styles.node} key={node.name}>
				{index === MINIMUM_VALUE ? (
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
