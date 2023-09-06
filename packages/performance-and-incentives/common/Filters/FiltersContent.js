import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { getFieldController } from '../Form/getFieldController';

import styles from './styles.module.css';

function FilterContent(props) {
	const { t } = useTranslation(['allocation']);

	const {
		heading,
		controls = [],
		formProps = {},
		onApplyingFilters,
		onResettingFilters,
	} = props;

	const { control: formControls } = formProps;

	return (
		<section>
			<div className={styles.header}>
				<div className={styles.heading}>{heading}</div>

				<div className={styles.button_container}>
					<Button
						themeType="secondary"
						size="sm"
						onClick={onResettingFilters}
					>
						{t('allocation:reset_button')}
					</Button>

					<Button
						themeType="primary"
						size="sm"
						onClick={onApplyingFilters}
						style={{
							marginLeft: '10px',
						}}
					>
						{t('allocation:apply_button')}
					</Button>
				</div>
			</div>

			{controls.map((control) => {
				const Element = getFieldController(control.type) || null;

				if (!Element) return null;

				return (
					<div key={control.name} className={styles.field_container}>
						<span className={styles.label}>{control.label}</span>

						<Element
							{...control}
							control={formControls}
							key={control.name}
							id={`${control.name}_input`}
						/>
					</div>
				);
			})}
		</section>
	);
}

export default FilterContent;
