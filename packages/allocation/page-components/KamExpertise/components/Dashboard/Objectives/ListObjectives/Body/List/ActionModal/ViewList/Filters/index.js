import { Button, Input, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getControls from '../../../../../../../../../configurations/get-kam-list-filter-controls';

import FilterForm from './FilterForm';
import styles from './styles.module.css';

const isFiltersEmpty = ({ filterVals, controls }) => {
	let show = false;

	const controlNames = controls.map((item) => item?.name);

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

	const showRedDot = isFiltersEmpty({ filterVals: params?.filters, controls: getControls('', t) });

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
					{t('allocation:filter_label')}
					<IcMFilter style={{ marginLeft: '8px' }} />
					{showRedDot ? (
						<div className={styles.red_dot} />
					) : null}
				</Button>
			</Popover>

			<div className={styles.search_container}>
				<Input
					name="searchKey"
					size="md"
					placeholder={t('allocation:search_by_objective_name')}
					value={searchKey}
					onChange={(val) => handleChange(val)}
				/>
			</div>
		</div>
	);
}

export default Filters;
