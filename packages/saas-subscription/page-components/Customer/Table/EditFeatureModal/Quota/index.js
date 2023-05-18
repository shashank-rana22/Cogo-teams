import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import editQuotaControl from '../../../../../configuration/editQuotaControl';
import { getFieldController } from '../../../../../utils/getFieldController';

import styles from './styles.module.css';

function Quota({ quotaInfo = {} }) {
	const { id = '', service = '' } = quotaInfo || {};
	const { handleSubmit, control, formState: { errors } } = useForm();
	return (
		<div className={styles.container}>
			<h3>{startCase(service)}</h3>

			<div className={styles.form_container}>
				{editQuotaControl.map((element) => {
					const { name, label, type } = element;
					const Element = getFieldController(type);
					return (
						<div key={name}>
							<p>{label}</p>
							<Element control={control} {...element} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default Quota;
