import styles from './styles.module.css';

function ActionsType({
	id,
	style,
	options,
	onChange = () => null,
	value = '',
}) {
	return (
		<div
			id={id}
			className={styles.container}
			style={style}
		>
			{options?.map((labels) => {
				const {
					label, disabled, value:optionvalue, name, icon:Icon,
				} = labels;
				return (
					<div className={styles.checkbox_class} key={name}>
						<label className={styles.checkbox_container}>
							<input
								className={styles.hide_input}
								id={name}
								checked={value === optionvalue}
								value={optionvalue}
								onChange={(e) => onChange(e.target.value)}
								disabled={disabled}
								type="checkbox"
							/>
							{Icon && <Icon className={styles.icon_styles} />}
						</label>
						<div>{label}</div>
					</div>
				);
			})}

		</div>
	);
}

export default ActionsType;
