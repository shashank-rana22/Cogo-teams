import { Button } from '@cogoport/components';
import { InputController, MultiselectController } from '@cogoport/forms';

import controls from '../../../../configurations/Shipment/filter-controls';

import styles from './styles.module.css';

function Filter({ control, handleSubmit, handleClick, loading }) {
	return (
		<div className={styles.filter_container}>
			<div className={styles.search_bar}>
				<InputController
					placeholder="Enter a product name or a HS Code"
					name="hs_code"
					control={control}
				/>
			</div>

			{controls.map((item) => {
				const ele = { ...item };

				return (
					<MultiselectController
						{...ele}
						placeholder={ele.placeholder}
						options={ele.options}
						isClearable
						style={{ width: ele.width }}
						control={control}
						key={ele.name}
					/>
				);
			})}

			<Button
				size="md"
				themeType="primary"
				onClick={handleSubmit(handleClick)}
				disabled={loading}
				style={{ height: '40px' }}
			>
				Search
			</Button>

		</div>
	);
}
export default Filter;
