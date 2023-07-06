import { getFieldController } from '../../../../../../../../../common/Form/getFieldController';
import controls from '../../../../../../../configurations/organizational-details-form-controls';

import styles from './styles.module.css';

function OrganizationalDetails(props) {
	const { control } = props;

	return (
		<div className={styles.container}>
			<h4>2. Organizational Details</h4>

			<div className={styles.form_container}>
				{controls.map((formElement) => {
					const { name, label, type, ...rest } = formElement;

					const Element = getFieldController(type);

					if (!Element) return null;

					return (
						<div className={styles.element_container} key={name}>
							<p>{label}</p>

							<Element
								key={name}
								name={name}
								control={control}
								{...rest}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default OrganizationalDetails;
