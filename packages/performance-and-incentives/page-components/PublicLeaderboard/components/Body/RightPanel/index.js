import Block from './Block';
import styles from './styles.module.css';
import useGetActivityCount from './useGetActivityCount';

function RightPanel() {
	const { data } = useGetActivityCount();

	return (
		<div className={styles.container}>
			<p className={styles.heading}>ACTIVITY COUNT</p>

			<div className={styles.blocks}>
				{Object.entries(data).map(([block, block_data]) => (
					<Block
						key={block}
						block={block}
						data={block_data}
					/>
				))}
			</div>
		</div>
	);
}

export default RightPanel;
