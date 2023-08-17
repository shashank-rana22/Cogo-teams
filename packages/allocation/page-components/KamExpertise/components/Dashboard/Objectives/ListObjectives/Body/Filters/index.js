import { Button, Input, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import controls from '../../../../../../configurations/get-list-objectives-filter-controls';

import FilterForm from './FilterForm';
import styles from './styles.module.css';

const isFiltersEmpty = ({ filterVals, controls: newControls }) => {
	let show = false;

	const controlNames = newControls.map((item) => item?.name);

	controlNames.forEach((elem) => {
		if (!isEmpty(filterVals[elem])) {
			show = true;
		}
	});

	return show;
};

function Filters({
	params = {},
	setParams = () => { },
	debounceQuery = () => { },
}) {
	const showRedDot = isFiltersEmpty({ filterVals: params?.filters, controls });

	const [showFilterPopover, setShowFilterPopover] = useState(false);

	const [searchKey, setsearchKey] = useState('');

	const {
		control,
		handleSubmit = () => { },
		formState: { errors = {} },
		reset,
		setValue,
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
						setValue={setValue}
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
						{showRedDot ? (
							<div className={styles.red_dot} />
						) : null}
					</Button>
				</div>
			</Popover>
		</div>
	);
}

export default Filters;
