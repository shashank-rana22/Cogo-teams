import { useForm } from '@cogoport/forms';

import Layout from '../../../common/Layout';
import Caution from '../Caution';

import firstControls from './controls/firstControls';
import getSecondControls from './controls/getSecondControls';
import thirdControls from './controls/thirdControls';
import Footer from './Footer';
import styles from './styles.module.css';

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
