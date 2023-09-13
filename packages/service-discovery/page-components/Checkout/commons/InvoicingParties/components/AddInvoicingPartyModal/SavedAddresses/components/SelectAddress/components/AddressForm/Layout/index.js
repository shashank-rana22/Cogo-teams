import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

function Layout({
	control = {}, fields = [], showElements = {}, errors = {}, formValues = {}, controls = [],
}) {
	return (
		<div className={styles.layout}>
			{controls.map((controlItem) => {
				const { type, name, heading } = controlItem;

				const show = !(name in showElements)
					|| showElements[name];

				if (type === 'fieldArray' && show) {
					return (
						<div className={styles.width_100} key={name}>
							{heading ? (
								<div className={styles.heading}>
									{heading}
								</div>
							) : null}

							<FieldArray
								{...controlItem}
								{...fields[name]}
								error={errors?.[name]}
								control={control}
								showElements={showElements}
								formValues={formValues}
							/>
						</div>
					);
				}

				return (
					show ? (
						<Item
							key={name}
							control={control}
							error={errors?.[name]}
							formValues={formValues}
							{...fields[name]}
						/>
					) : null
				);
			})}

		</div>
	);
}
export default Layout;
