import { cl, Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef, useEffect } from 'react';

import styles from './styles.module.css';

function CustomSelect({
	className = '',
	...props
}) {
	const {
		loading = false,
		options = [],
		valueKey = 'value',
		labelKey = 'label',
		onChange = () => {},
		value = '',
		renderLabel = () => {},
		disabled = false,
		onSearch = () => {},
		optionsHeader = null,
	} = props || {};

	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef(null);

	const selectRef = useRef(null);

	const handleClickOpen = () => {
		if (!disabled && !isOpen) {
			setIsOpen((prev) => !prev);
		}

		if (onSearch) {
			onSearch('');
		}
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (rootRef.current && !rootRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [rootRef]);

	return (
		<div
			className={cl`${className} ${styles.container} ${isOpen ? styles.show_options : ''}`}
			ref={rootRef}
		>
			<div
				className={styles.container}
				role="presentation"
				onClick={handleClickOpen}
			>
				<Select
					{...props}
					ref={selectRef}
					onSearch={onSearch}
				/>
			</div>

			<div className={cl`${styles.select_options_container} 
				${isOpen ? styles.select_options_container_open : ''}`}
			>
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
									) : options.map(
										(option) => (
											<li
												role="option"
												key={`${option?.[valueKey]}-${option?.[labelKey]}`}
												className={styles.option_item}
												onClick={() => {
													onChange(option?.[valueKey], option);
													setIsOpen(false);
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

			</div>
		</div>
	);
}

export default CustomSelect;
