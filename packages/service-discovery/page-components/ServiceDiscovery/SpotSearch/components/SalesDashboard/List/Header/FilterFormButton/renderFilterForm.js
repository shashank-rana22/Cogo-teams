import { Button } from '@cogoport/components';

import getElementController from '../../../../../../../../configs/getElementController';

import styles from './styles.module.css';

const ZERO_MARGIN_VALUE = 0;
const MARGIN_VALUE = 20;
const DEFAULT_SPAN = 12;
const PERCENT_FACTOR = 100;
const FLEX_OFFSET = 1;

function FilterForm({
	controls = {},
	handleSubmit = () => {},
	handleApply = () => {},
	handleReset = () => {},
	control = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>Search</div>

				<div className={styles.button_container}>
					<Button size="sm" themeType="primary" style={{ marginRight: 12 }} onClick={handleReset}>
						Reset
					</Button>

					<Button size="sm" themeType="secondary" onClick={handleSubmit(handleApply)}>
						Apply
					</Button>
				</div>
			</div>

			<div className={styles.form}>
				{controls.map((controlItem, index) => {
					const { label, type, name, span } = controlItem;

					const flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENT_FACTOR - FLEX_OFFSET;

					const Element = getElementController(type);

					return (
						<div
							key={`${name}_${label}`}
							className={styles.form_item}
							style={{
								width     : `${flex}%`,
								marginTop : index === ZERO_MARGIN_VALUE
									? ZERO_MARGIN_VALUE : MARGIN_VALUE,
							}}
						>
							<div className={styles.label}>
								{label || ''}
								{' '}
								{controlItem?.rules?.required ? (
									<div className={styles.required_mark}>*</div>
								) : null}
							</div>

							<Element
								{...controlItem}
								name={name}
								label={label}
								control={control}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default FilterForm;
