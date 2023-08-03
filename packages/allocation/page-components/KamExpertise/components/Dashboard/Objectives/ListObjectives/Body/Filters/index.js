import { Button, Input, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import FilterForm from './FilterForm';
import styles from './styles.module.css';

function Filters({
	params = {},
	setParams = () => { },
	debounceQuery = () => { },
}) {
	const [showFilterPopover, setShowFilterPopover] = useState(false);

	const [searchKey, setsearchKey] = useState('');

	const {
		control,
		handleSubmit = () => { },
		formState: { errors = {} },
		reset,
	} = useForm();

	const handleChange = (v) => {
		setsearchKey(v);
		debounceQuery(v);
	};

	return (
		<div className={styles.filter_container}>
			<div className={styles.search_container}>
				<Input
					name="searchKey"
					size="md"
					placeholder="Search by Objective Name"
					value={searchKey}
					onChange={(val) => handleChange(val)}
				/>
			</div>

			<Popover
				visible={showFilterPopover}
				placement="bottom"
				trigger="click"
				caret={false}
				render={(
					<FilterForm
						control={control}
						handleSubmit={handleSubmit}
						reset={reset}
						errors={errors}
						params={params}
						setParams={setParams}
						setShowFilterPopover={setShowFilterPopover}
					/>
				)}
			>
				<div className={styles.btn_text}>
					<Button
						themeType="secondary"
						type="button"
						size="lg"
						onClick={() => setShowFilterPopover(!showFilterPopover)}
					>
						Filter
						<IcMFilter style={{ marginLeft: '8px' }} />
						{/* {!isEmpty(formValues) ? (
							<div className={styles.red_dot} />
						) : null} */}
					</Button>
				</div>
			</Popover>
		</div>
	);
}

export default Filters;
