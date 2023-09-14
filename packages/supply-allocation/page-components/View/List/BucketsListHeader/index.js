import styles from './styles.module.css';

function BucketsListHeader({ bucketControls = [] }) {
	return (
		<div className={styles.container}>
			{bucketControls.map(({ title, flexBasis }) => (
				<div
					key={title}
					className={styles.title}
					style={{ flexBasis }}
				>
					{title}
				</div>
			))}
		</div>
	);
}

export default BucketsListHeader;
