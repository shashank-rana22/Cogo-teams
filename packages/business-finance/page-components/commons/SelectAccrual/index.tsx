import { ButtonIcon, Input } from '@cogoport/components';
import { IcMArrowRotateDown, IcMDelete } from '@cogoport/icons-react';

function SelectAccrual({ value, placeholder, setFilters }) {
	return (
		<div
			style={{ width: '160px' }}
		>
			<Input
				suffix={(
					value ? (
						<ButtonIcon
							size="md"
							icon={<IcMDelete />}
							onClick={() => {
								setFilters((prev) => ({
									...prev,
									service   : '',
									tradeType : '',
									colCheck  : '',
									rowCheck  : '',
									radio     : '',
									chip      : 'Segment',
								}));
							}}
							disabled={false}
							themeType="primary"
						/>
					) : (
						<ButtonIcon
							size="sm"
							icon={<IcMArrowRotateDown />}
							disabled={false}
							themeType="primary"
						/>
					)
				)}
				size="sm"
				placeholder={placeholder}
				value={value || ''}
			/>
		</div>
	);
}
export default SelectAccrual;
