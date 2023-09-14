import { Button, Input, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getControls from '../../../../../../configurations/get-list-objectives-filter-controls';

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
	const { t } = useTranslation(['allocation']);

	const controls = getControls({ t });

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
					placeholder={t('allocation:search_by_objective_name')}
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
						{t('allocation:filter_label')}
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
