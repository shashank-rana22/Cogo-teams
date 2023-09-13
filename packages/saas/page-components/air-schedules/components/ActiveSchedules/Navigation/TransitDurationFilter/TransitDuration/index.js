import styles from './styles.module.css';

function TransitDuration({ durationValue, onChange }) {
	return (
		<div className={styles.transit}>
			<div className={styles.filter}>
				<text>0</text>
				<text style={{ textAlign: 'center' }}>
					{(durationValue / 60).toFixed(2)}
				</text>
				<text>60</text>
			</div>
			<input
				style={{ width: '100%' }}
				className={styles.slider}
				type="range"
				min="0"
				max="3600"
				value={durationValue}
				id="active_oc_sc_transit_time_input"
				onChange={({ target: { value: radius } }) => {
					onChange(radius);
				}}
			/>
		</div>
	);
}

export default TransitDuration;
