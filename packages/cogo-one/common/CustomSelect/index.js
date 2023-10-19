import { cl, Select, MultiSelect } from '@cogoport/components';
import React, { useState, useRef, useEffect } from 'react';

import MultiSelectBody from './multiSelectBody';
import SingleSelectBody from './singleSelectBody';
import styles from './styles.module.css';

function CustomSelect({
	className = '',
	...props
}) {
	const {
		loading = false,
		disabled = false,
		onSearch = () => {},
		keyProp = '',
		selectType = 'single',
		value = [],
		selectedOptions = [],
		options = [],
	} = props || {};

	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef(null);

	const handleClickOpen = () => {
		if (!disabled && !isOpen) {
			setIsOpen((prev) => !prev);
		}

		if (onSearch) {
			onSearch('');
		}
	};

	const ActiveSelectComponent = selectType === 'single' ? Select : MultiSelect;

	useEffect(() => {
		const handleOuterClick = (e) => {
			if (rootRef.current && !rootRef.current.contains(e.target)) {
				setIsOpen(false);
				onSearch('');
			}
		};

		document.addEventListener('mouseup', handleOuterClick);

		return () => {
			document.removeEventListener('mouseup', handleOuterClick);
		};
	}, [onSearch, rootRef]);

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
				<ActiveSelectComponent
					{...props}
					key={`${disabled}_${keyProp}_${!isOpen ? loading : ''}`}
					onSearch={onSearch}
					value={value}
				/>
			</div>

			<div
				className={cl`${styles.select_options_container} 
				${isOpen ? styles.select_options_container_open : ''}`}
			>
				{selectType === 'single' ? (
					<SingleSelectBody
						{...props}
						setIsOpen={setIsOpen}
					/>
				) : (
					<MultiSelectBody
						{...props}
						setIsOpen={setIsOpen}
						value={value}
						options={isOpen ? options : selectedOptions}
						selectedOptions={selectedOptions}
					/>
				)}
			</div>
		</div>
	);
}

export default CustomSelect;
