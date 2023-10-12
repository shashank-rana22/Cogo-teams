import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function SingleSelectBody(props) {
	const {
		loading = false,
		options = [],
		valueKey = 'value',
		labelKey = 'label',
		onChange = () => {},
		value = '',
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
						{isEmpty(options)
							? (
								<li>
									<span className={styles.list_item}>No Results</span>
								</li>
							) : (options || [])?.map(
								(option) => (
									<li
										role="option"
										key={`${option?.[valueKey]}-${option?.[labelKey]}`}
										className={styles.option_item}
										onClick={() => {
											onChange(option?.[valueKey], option);
											setIsOpen(false);
											onSearch('');
										}}
										aria-selected={option?.[valueKey] === value}
									>
										{typeof renderLabel !== 'function'
											? (
												<span className={styles.list_item}>
													{option?.[labelKey]}
												</span>
											)
											: renderLabel(option, labelKey)}
									</li>
								),
							)}
					</ul>
				)}
		</div>
	);
}

export default SingleSelectBody;
