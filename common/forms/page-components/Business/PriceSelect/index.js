import InputNumberController from '../../Controlled/InputNumberController';
import SelectController from '../../Controlled/SelectController';

import currencyOptions from './currencies';
import styles from './styles.module.css';

function PriceSelect({
	value = {},
	onChange = () => {},
	codeKey = 'currency',
	priceKey = 'price',
	name,
	width,
	id = 'select_price',
	inputType = 'text',
	type = 'text',
	disable_country_code = false,
	...rest
}) {
	const { [codeKey]: currency = '', [priceKey]: price = '' } = value || {};

	const handleCodeChange = (v) => {
		onChange({ ...(value || {}), [codeKey]: v });
	};

	const handleNumberChange = (e) => {
		onChange({ ...(value || {}), [priceKey]: e });
	};

	return (
		<div
			className={styles.row_container}
			style={width ? { width: '104%' } : {}}
		>
			<div className={styles.currency_code} style={{ paddingRight: 4 }}>
				<SelectController
					{...rest}
					value={currency || (value || {})[codeKey]}
					name={`${name}.currency`}
					onChange={handleCodeChange}
					placeholder="Select"
					showMessage={false}
					disabled={disable_country_code}
					inputId={`${id || ''}_${codeKey || 'country_code'}`}
					options={currencyOptions || []}
				/>
			</div>

			<div className={styles.price_number}>
				<InputNumberController
					{...rest}
					width="100%"
					name={`${name}.price`}
					id={`${id || ''}_${priceKey || 'number'}`}
					type={inputType || type}
					value={price || (value || {})[priceKey]}
					onChange={handleNumberChange}
				/>
			</div>
		</div>
	);
}

export default PriceSelect;
