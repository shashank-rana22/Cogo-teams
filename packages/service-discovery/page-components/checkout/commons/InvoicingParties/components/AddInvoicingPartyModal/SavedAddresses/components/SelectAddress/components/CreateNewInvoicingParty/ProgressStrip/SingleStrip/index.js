import styles from './styles.module.css';

const ONE = 1;

function SingleStrip({
	item = {},
	currentStep = '',
	progressSteps = [],
	count = 1,
}) {
	const status = currentStep === item?.key ? 'active' : 'inactive';

	return (
		<div className={styles.flex}>
			<div className={`${styles.count} ${styles[status]}`}>{count}</div>

			<span
				className={styles.title}
				style={{
					color      : status === 'active' ? '#333333' : '#828282',
					cursor     : count < ONE ? 'pointer' : 'default',
					fontWeight : status === 'active' ? '500' : 'normal',
				}}
			>
				{item?.label}
			</span>

			{count < progressSteps.length ? <div className={styles.line} /> : null}
		</div>
	);
}
export default SingleStrip;
