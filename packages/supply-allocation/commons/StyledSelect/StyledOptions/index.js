import styles from './styles.module.css';

function StyledOptions({ options, onChange, setShowPopover }) {
	return (Object.entries(options)).map(([key, value]) => (
		<div className={styles.container} key={key}>
			<div
				role="presentation"
				className={styles.options_container}
				onClick={() => onChange({ selectedValue: key, setShowPopover })}
			>
				<div className={styles.label_text}>
					{value}
				</div>
			</div>
		</div>
	));
}

export default StyledOptions;
