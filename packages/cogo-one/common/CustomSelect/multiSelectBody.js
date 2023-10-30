import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useMemo } from 'react';

import OptionsBody from './optionsBody';
import styles from './styles.module.css';

function MultiSelect(props) {
	const {
		loading = false,
		options = [],
		valueKey = 'value',
		labelKey = 'label',
		selectedOptions = [],
		onChange = () => {},
		optionsHeader = null,
		renderLabel = null,
		value = [],
	} = props || {};

	const handleChange = (val, option) => {
		const newValue = [...(value || [])];
		const index = (value || [])?.findIndex((v) => v === val);
		const newOptions = [...selectedOptions];
		if (index === -1) {
			newValue.push(val);
			newOptions.push(option);
			onChange(newValue, newOptions);
		}
	};

	const handleRemove = (val) => {
		const newValue = [...(value || [])];
		const index = value?.findIndex((v) => v === val);
		const newOptions = [...selectedOptions];
		if (typeof index === 'number' && index > -1) {
			newValue.splice(index, 1);
			newOptions.splice(index, 1);
			onChange(newValue, newOptions);
		}
	};

	const valueFilteredOptions = useMemo(() => {
		if (!isEmpty(value)) {
			return options.filter((itm) => !value.includes(itm?.[valueKey]));
		}
		return options;
	}, [options, value, valueKey]);

	return (
		<div className={cl`${styles.custom_header} ${cl.ns('custom_header')}`}>
			{optionsHeader}
			<ul
				className={cl`
						${styles.options_container}
						${cl.ns('multiselect_options_container')}
					`}
			>
				<li className={styles.selected_items_container}>
					{selectedOptions?.map((item) => (
						<div className={styles.items} key={item?.[valueKey]}>
							<div className={styles.selected_options}>
								{item?.[labelKey]}
							</div>

							<div
								className={styles.cross}
								onClick={() => {
									handleRemove(item?.[valueKey]);
								}}
								role="presentation"
							>
								&#10005;
							</div>
						</div>

					))}
				</li>

				{loading ? (
					<li>
						<span className={styles.list_item}>
							Loading...
						</span>
					</li>
				) : (
					<OptionsBody
						valueFilteredOptions={valueFilteredOptions}
						handleChange={handleChange}
						valueKey={valueKey}
						labelKey={labelKey}
						renderLabel={renderLabel}
					/>
				)}
			</ul>
		</div>
	);
}

export default MultiSelect;
