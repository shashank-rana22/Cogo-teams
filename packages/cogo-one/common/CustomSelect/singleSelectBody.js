import { cl } from '@cogoport/components';
import React from 'react';

import OptionsBody from './optionsBody';
import styles from './styles.module.css';

function SingleSelectBody(props) {
	const {
		loading = false,
		options = [],
		valueKey = 'value',
		labelKey = 'label',
		onChange = () => {},
		renderLabel = null,
		onSearch = () => {},
		optionsHeader = null,
		setIsOpen = () => {},
	} = props || {};

	return (
		<div className={cl`${styles.custom_header} ${cl.ns('custom_header')}`}>
			{optionsHeader}
			{loading
				? (
					<ul className={styles.options_container}>
						<li>
							<span className={styles.list_item}>Loading...</span>
						</li>
					</ul>
				)
				: (
					<ul className={styles.options_container}>
						<OptionsBody
							valueFilteredOptions={options}
							handleChange={onChange}
							setIsOpen={setIsOpen}
							valueKey={valueKey}
							labelKey={labelKey}
							onSearch={onSearch}
							renderLabel={renderLabel}
						/>
					</ul>
				)}
		</div>
	);
}

export default SingleSelectBody;
