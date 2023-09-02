import { Select } from '@cogoport/components';
import { RadioGroupController } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Header({
	countryNameValue,
	controls,
	control,
}) {
	const { t } = useTranslation(['athenaDashboard']);

	return (
		<div className={styles.header}>
			<div>
				{t('athenaDashboard:country_region')}
				<Select
					value="INDIA"
					placeholder={t('athenaDashboard:select_here')}
					options={countryNameValue}
					style={{ width: '250px' }}
					size="sm"
					disabled
					className={styles.multiselect}
				/>
			</div>
			{controls.map((item) => {
				const ele = { ...item };
				return (
					<div key={ele.name}>
						<div style={{ marginLeft: '10px' }}>
							{ele.label}
						</div>

						<RadioGroupController
							{...ele}
							name={ele.name}
							options={ele.options}
							control={control}
							style={{ padding: '0px' }}
						/>

					</div>
				);
			})}
		</div>
	);
}
export default Header;
