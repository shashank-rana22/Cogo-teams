import { Accordion } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import FilterItem from './FilterItem';
import styles from './styles.module.css';

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
	} = props;

	function AccordianContent({ label = '', name = '' }) {
		const onReset = () => {
			handleReset(name);
		};

		return (
			<div className={styles.label_container}>
				{label}

				{filters[name] && !isEmpty(filters[name]) ? (
					<span className={styles.filter_value_pill}>
						{typeof filters[name] === 'object'
							? `${filters[name].length} Selected` : startCase(filters[name])}

						<IcMCross className={styles.cross_icon} onClick={onReset} />
					</span>
				) : null}
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
								<FilterItem
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
