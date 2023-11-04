import { Accordion } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCross } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import Layout from '../../../../../common/Layout';
import deepEqual from '../../../utils/deepEqual';

import styles from './styles.module.css';

function Value({ name = '', value = {}, defaultValues = {}, onReset = () => {} }) {
	const show = value && ((value instanceof Date) || !isEmpty(value))
				&& Object.keys(defaultValues).includes(name) && !deepEqual(defaultValues[name], value);

	if (!show) {
		return null;
	}

	let formattedValue = startCase(value);

	if (value instanceof Date) {
		formattedValue = formatDate({
			date       : value,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MMM-yy'],
			formatType : 'date',
		});
	}

	if (name === 'transit_time') {
		formattedValue = `Transit Time - ${value?.[GLOBAL_CONSTANTS.zeroth_index]} to 
		${value?.[GLOBAL_CONSTANTS.one]} days`;
	}

	if (typeof value === 'object') {
		formattedValue = `${value.length} Selected`;
	}

	return (
		<span className={styles.filter_value_pill}>
			{formattedValue}

			<IcMCross className={styles.cross_icon} onClick={onReset} />
		</span>
	);
}

function FilterContent(props) {
	const {
		controls = [],
		control = () => {},
		watch = () => {},
		errors = {},
		setValue = () => {},
		handleSubmit = () => {},
		filters = {},
		openAccordian = '',
		handleReset = () => {},
		defaultValues = {},
	} = props;

	function AccordianContent({ label = '', name = '' }) {
		const onReset = () => {
			handleReset(name);
		};

		return (
			<div className={styles.label_container}>
				{label}

				<Value
					name={name}
					value={filters[name]}
					defaultValues={defaultValues}
					onReset={onReset}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				{controls.map((controlItem, index) => {
					const { label: itemLabel, controls: itemControls, name } = controlItem;

					const openedAccordian = openAccordian
						? openAccordian === name : index === GLOBAL_CONSTANTS.zeroth_index;

					return (
						<div className={styles.filter_item} key={controlItem?.label}>
							<Accordion
								type="text"
								title={<AccordianContent label={itemLabel} name={name} />}
								style={{ width: '100%' }}
								isOpen={openedAccordian}
							>
								<Layout
									controls={itemControls}
									control={control}
									watch={watch}
									errors={errors}
									handleSubmit={handleSubmit}
									setValue={setValue}
								/>
							</Accordion>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default FilterContent;
