import { Button, Input, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import FilterForm from './FilterForm';
import styles from './styles.module.css';

function Filters({
	filters = {},
	setFilters = () => {},
}) {
	const [showFilterPopover, setShowFilterPopover] = useState(false);

	const {
		control,
		handleSubmit = () => { },
		formState: { errors = {} },
	} = useForm();

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
						errors={errors}
						filters={filters}
						setFilters={setFilters}
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
					size="md"
					placeholder="Search by KAM Name"
					prefix={<IcMSearchlight />}
				/>
			</div>
		</div>
	);
}

export default Filters;
