import { getElementController } from './get-element-controller';
import styles from './styles.module.css';

function FormLayout({
	fields = [],
	control = {},
	errors = {},
}) {
	return (
		<section className={styles.form_container}>
			{fields.map((controlItem) => {
				const element = { ...controlItem };

				const Element = getElementController(element.type);

				if (!Element) return null;

				return (
					<div key={controlItem.name} className={styles.form_group}>
						<span className={styles.label}>{element.label}</span>

						<div className={styles.input_group}>
							<Element
								{...element}
								key={element.name}
								control={control}
								id={`enrichment_${element.name}_input`}
							/>

							{errors?.[element.name]?.message ? (
								<div className={styles.error_message}>
									{errors?.[element.name]?.message}
								</div>
							) : null}
						</div>
					</div>
				);
			})}
		</section>
	);
}

export default FormLayout;
