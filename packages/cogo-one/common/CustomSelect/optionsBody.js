import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function OptionsBody({
	valueFilteredOptions = [],
	handleChange = () => {},
	setIsOpen = () => {},
	valueKey = 'value',
	labelKey = 'label',
	onSearch = () => {},
	renderLabel = null,
}) {
	if (isEmpty(valueFilteredOptions)) {
		return (
			<li>
				<span className={styles.list_item}>
					No Results
				</span>
			</li>
		);
	}

	return (valueFilteredOptions || [])?.map(
		(option) => (
			<li
				className={cl`
                        ${styles.option_item}
                        ${cl.ns('multiselect_option_item')}`}
				role="presentation"
				key={`${option?.[valueKey]}-${option?.[labelKey]}`}
				onClick={() => {
					handleChange(option?.[valueKey], option);
					setIsOpen(false);
					onSearch('');
				}}
			>
				{(typeof renderLabel !== 'function')
					? (
						<span className={styles.list_item}>
							{option?.[labelKey]}
						</span>
					)
					: renderLabel(option, labelKey)}
			</li>
		),
	);
}

export default OptionsBody;
