import { Button } from '@cogoport/components';
import { IcMFilter, IcMRefresh } from '@cogoport/icons-react';
import { useState } from 'react';

import { getFieldController } from '../../../../../commons/Form/getFieldController';
import controls from '../../../configurations/filter-controls';
import getSearchControls from '../../../configurations/search-control';

import styles from './styles.module.css';
import SubFiltersModal from './SubFiltersModal';

function MainFilters({
	control = [],
	loading = false,
	reset = () => {},
	debounceQuery = '',
	setParams = () => {},
	params = {},
	setFileName = () => {},
}) {
	const [show, setShow] = useState(false);

	const searchControls = getSearchControls({ debounceQuery });

	const onClickOutside = () => {
		setShow(false);
	};

	const onClickReset = () => {
		debounceQuery(null);
		reset();
		setParams((p) => ({
			...p,
			filters: {},
		}));
		setFileName('');
	};

	return (
		<div className={styles.filterContainer}>

			<div className={styles.leftFilters}>
				{controls.map((item) => {
					const { name, type, width } = item;

					const Element = getFieldController(type);

					if (!Element) return null;

					return (
						<Element
							{...item}
							name={name}
							isClearable
							prefix={null}
							style={{ width }}
							control={control}
							key={name}
							size="sm"
							className={styles.leftFiltersElement}
						/>
					);
				})}
			</div>
			<div className={styles.rightFilters}>
				<div>
					<Button themeType="tertiary" onClick={() => { setShow(true); }}>
						<IcMFilter className={styles.icmFilter} />
					</Button>
					{show
						? (
							<SubFiltersModal
								onClickCancel={onClickOutside}
								loading={loading}
								show={show}
								onClickOutside={onClickOutside}
								setParams={setParams}
								params={params}
							/>
						) : null}
				</div>
				<div className={styles.searchBar}>
					{searchControls.map((item) => {
						const { name, type, width } = item;
						const Element = getFieldController(type);

						if (!Element) return null;

						return (
							<Element
								{...item}
								name={name}
								isClearable
								prefix={null}
								style={{ width }}
								control={control}
								key={name}
								size="sm"
							/>
						);
					})}
				</div>
				<Button
					size="sm"
					themeType="secondary"
					disabled={loading}
					className={styles.icmUndo}
					onClick={onClickReset}
				>
					<IcMRefresh style={{ width: '16px', height: 'auto' }} />
				</Button>
			</div>
		</div>
	);
}
export default MainFilters;
