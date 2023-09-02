import { Button } from '@cogoport/components';
import { InputController, MultiselectController } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';

import getControls from '../../../../configurations/Shipment/filter-controls';

import styles from './styles.module.css';

function Filter({
	control,
	handleSubmit,
	handleClick,
	loading,
}) {
	const { t } = useTranslation(['athenaDashboard']);

	const controls = getControls({ t });

	return (
		<div className={styles.filter_container}>
			<div className={styles.search_bar}>
				<InputController
					placeholder={t('athenaDashboard:hs_code_placeholder')}
					name="hs_code"
					control={control}
				/>
			</div>

			{(controls || []).map((item) => {
				const ele = { ...item };

				return (
					<MultiselectController
						{...ele}
						placeholder={ele.placeholder}
						options={ele.options}
						isClearable
						style={{ width: ele.width }}
						control={control}
						key={ele.name}
					/>
				);
			})}

			<Button
				size="md"
				themeType="primary"
				onClick={handleSubmit(handleClick)}
				disabled={loading}
				style={{ height: '40px' }}
			>
				{t('athenaDashboard:search_button')}
			</Button>

		</div>
	);
}
export default Filter;
