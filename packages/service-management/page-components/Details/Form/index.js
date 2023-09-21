import { useForm } from '@cogoport/forms';

import Layout from '../../../common/Layout';
import Caution from '../Caution';

import firstControls from './firstControls';
import Footer from './Footer';
import getSecondControls from './getSecondControls';
import styles from './styles.module.css';
import thirdControls from './thirdControls';

function Form({ supply_agent = '', organization_id = '', service = '' }) {
	const secondControls = getSecondControls({ supply_agent });
	const { control, handleSubmit } = useForm();
	return (
		<div>
			<div className={styles.flex}>
				<div className={styles.comp}>
					<Layout controls={firstControls} control={control} />
				</div>
				<div className={styles.comp}>
					<Layout controls={secondControls} control={control} />
				</div>
				<div className={styles.comp}>
					<Layout controls={thirdControls} control={control} />
				</div>
			</div>
			<Caution />
			<Footer organization_id={organization_id} service={service} handleSubmit={handleSubmit} />

		</div>
	);
}
export default Form;
