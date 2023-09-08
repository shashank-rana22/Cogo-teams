import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import GlobalConfigForm from '../../../common/GlobalConfigForm';

import styles from './styles.module.css';

function CreateEditGlobalConvenienceRates({ onClosingForm = () => {}, activeService = '', showGlobalConfigForm = '' }) {
	return (
		<div
			className={styles.container}
		>
			<Button
				themeType="link"
				className={styles.back_div}
				onClick={onClosingForm}
				style={{ cursor: 'pointer' }}
			>
				<div className={styles.arrow_back}>
					<IcMArrowBack />
				</div>
				<div className={styles.back_text}>
					Back to All Convenience Fees
				</div>
			</Button>
			<GlobalConfigForm
				onClosingForm={onClosingForm}
				activeService={activeService}
				showGlobalConfigForm={showGlobalConfigForm}
			/>
		</div>
	);
}

export default CreateEditGlobalConvenienceRates;
