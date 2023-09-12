import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import GlobalConfigForm from '../../../common/GlobalConfigForm';
import useCreateConvenienceRateConfigs from '../../../hooks/useCreateConvenienceRateConfigs';

import styles from './styles.module.css';

function CreateEditGlobalConvenienceRates({ onClosingForm = () => {}, activeService = '' }) {
	const { onSave } = useCreateConvenienceRateConfigs({ onClosingForm, activeService });
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
				activeService={activeService}
				onSubmit={onSave}
				// onClosingForm={onClosingForm}
				// showGlobalConfigForm={showGlobalConfigForm}
			/>
		</div>
	);
}

export default CreateEditGlobalConvenienceRates;
