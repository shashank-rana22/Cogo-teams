import styles from '../styles.module.css';

function SlabContent({ item = {} }) {
	return (
		<div className={styles.slabs_container}>
			{item?.slabs?.map((slab) => (
				<div key={item?.id}>
					<div style={{ fontSize: '12px', marginRight: '5px' }}>
						{slab?.lower_limit}
						{' '}
						-
						{slab?.upper_limit}
						{' '}
						Days
					</div>
					<div className={styles.price_currency}>
						{`${slab?.currency} ${slab?.price}`}
					</div>
				</div>
			))}
		</div>
	);
}
export default SlabContent;
