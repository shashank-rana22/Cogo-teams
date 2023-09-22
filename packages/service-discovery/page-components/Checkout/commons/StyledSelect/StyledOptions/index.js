import styles from './styles.module.css';

function StyledOptions({ options, onChange, setShowPopover }) {
	return options.map((item) => {
		const { value: selectedValue, label } = item;

		return (
			<div className={styles.container} key={selectedValue}>
				<div
					role="presentation"
					className={styles.options_container}
					onClick={() => onChange({ selectedValue, setShowPopover })}
				>
					<div className={styles.label_text}>
						{label}
					</div>
				</div>
			</div>
		);
	});
}

export default StyledOptions;
