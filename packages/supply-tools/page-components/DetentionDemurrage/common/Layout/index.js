import FormElement from './FormElement';
import getWidthPercent from './getWidthPercent';
import styles from './styles.module.css';

function Layout({ controls = [], control = {} }) {
	return (
		<div className={styles.container}>
			{controls.map((ctrl) => {
				const { type = '', label = '', span = 6, ...restCtrl } = ctrl || {};

				const width = getWidthPercent(span);

				return (
					<div
						key={restCtrl.name}
						className={styles.element_container}
						style={{ width: `${width}%` }}
					>
						{label ? <div className={styles.label}>{label}</div> : null}

						{type ? <FormElement control={control} {...restCtrl} type={type} /> : null}
					</div>
				);
			})}
		</div>
	);
}

export default Layout;
