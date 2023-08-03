import { Button, Input, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import FilterForm from './FilterForm';
import styles from './styles.module.css';

function Filters({
	setParams = () => { },
	debounceQuery = () => { },
}) {
	const [showFilterPopover, setShowFilterPopover] = useState(false);

	const [searchKey, setsearchKey] = useState('');

	const {
		control,
		handleSubmit = () => { },
		formState: { errors = {} },
		setValue,
	} = useForm();

	const handleChange = (v) => {
		setsearchKey(v);
		debounceQuery(v);
	};

	return (
		<div className={styles.filter_container}>
			<Popover
				placement="bottom"
				trigger="click"
				caret={false}
				visible={showFilterPopover}
				render={(
					<FilterForm
						control={control}
						handleSubmit={handleSubmit}
						setValue={setValue}
						errors={errors}
						setParams={setParams}
						setShowFilterPopover={setShowFilterPopover}
					/>
				)}
			>
				<Button
					themeType="secondary"
					type="button"
					size="lg"
					onClick={() => setShowFilterPopover(!showFilterPopover)}
				>
					Filter
					<IcMFilter style={{ marginLeft: '8px' }} />
				</Button>
			</Popover>

			<div className={styles.search_container}>
				<Input
					name="searchKey"
					size="md"
					placeholder="Search by Objective Name"
					value={searchKey}
					onChange={(val) => handleChange(val)}
				/>
			</div>
		</div>
	);
}

export default Filters;
