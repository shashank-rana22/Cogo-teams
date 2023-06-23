import { Input } from '@cogoport/components';

import StyledSelect from '../../../../StyledSelect';

import CodeMargin from './CodeMargin';
import styles from './styles.module.css';

function ServiceMargin({
	serviceIndex,
	lineItemIndex,
	filteredMargins = {},
	item,
	onChangeLineItem = () => {},
	shouldEditMargin,
}) {
	const { type, value } = filteredMargins;

	const onChange = ({ selectedValue, setShowPopover }) => {
		onChangeLineItem({ selectedValue, setShowPopover, lineItemKey: 'type' });
	};

	return (
		<>
			<div className={styles.currency} style={{ width: '10%' }}>
				<StyledSelect
					defaultValue={type}
					onChange={onChange}
					disabled={!shouldEditMargin}
					options={[
						{
							label : ' Total',
							value : 'absolute_total',
						},
						{
							label : 'Unit',
							value : 'absolute_unit',
						},
					]}
				/>
			</div>

			<div className={styles.currency}>
				<Input
					size="sm"
					disabled={!shouldEditMargin}
					value={value}
					onChange={(selectedValue) => onChangeLineItem({ selectedValue, lineItemKey: 'value' })}
				/>
			</div>

			<div className={styles.currency}>
				<CodeMargin
					item={item}
					editedDemandMargin={filteredMargins}
					id_prefix={`${serviceIndex}_${lineItemIndex}`}
				/>
			</div>
		</>
	);
}

export default ServiceMargin;
