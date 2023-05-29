import styles from './styles.module.css';

function NoData({ showGrid, entity = 'Shipments' }) {
	return (
		<div>
			{showGrid && (
				<div className={styles.card_wrapper}>
					No
					{' '}
					{entity}
					{' '}
					Found
				</div>
			)}
		</div>
	);
}

export default NoData;
