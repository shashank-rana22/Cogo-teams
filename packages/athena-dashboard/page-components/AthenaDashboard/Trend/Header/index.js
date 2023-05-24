import { Select } from '@cogoport/components';
import { RadioGroupController } from '@cogoport/forms';

import styles from './styles.module.css';

function Header({ countryname_value, controls, control }) {
	return (
		<div className={styles.header}>
			<div>
				Country/Region
				<Select
					value="INDIA"
					placeholder="Select here..."
					options={countryname_value}
					style={{ width: '250px' }}
					size="sm"
					disabled
					className={styles.multiselect}
				/>
			</div>
			{controls.map((item) => {
				const ele = { ...item };
				return (
					<div key={ele.name}>
						<div style={{ marginLeft: '10px' }}>
							{ele.label}
						</div>

						<RadioGroupController
							{...ele}
							name={ele.name}
							options={ele.options}
							control={control}
							style={{ padding: '0px' }}
						/>

					</div>
				);
			})}
		</div>
	);
}
export default Header;
