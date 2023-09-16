import { Button } from '@cogoport/components';
import { IcMFilter, IcMUndo } from '@cogoport/icons-react';
import { useState } from 'react';

import { getFieldController } from '../../../../commons/Form/getFieldController';
import controls from '../../configurations/filter-controls';
import getSearchControls from '../../configurations/search-control';
import sub_controls from '../../configurations/sub-filter-controls';

import styles from './styles.module.css';
import SubFiltersModal from './SubFiltersModal';

function MainFilters({
	control = [],
	handleSubmit = () => {},
	handleClick = () => {},
	loading = false,
	reset = () => {},
	watch = () => {},
	debounceQuery = '',
	setParams = () => {},

}) {
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);

	const searchControls = getSearchControls({ debounceQuery });

	const onClickOutside = () => {
		setOpen(false);
		setShow(false);
	};

	const onClickReset = () => {
		debounceQuery(null);
		reset();
		setParams((p) => ({
			...p,
			filters: {},
		}));
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
				<div className={styles.popoverDiv}>
					<Button themeType="tertiary" onClick={() => { setShow(true); }}>
						<IcMFilter onClick={() => setOpen(!open)} className={styles.icmFilter} />
					</Button>
					<SubFiltersModal
						control={control}
						onClickCancel={onClickOutside}
						handleSubmit={handleSubmit}
						handleClick={handleClick}
						loading={loading}
						sub_controls={sub_controls}
						watch={watch}
						show={show}
						onClickOutside={onClickOutside}
					/>
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
					<IcMUndo style={{ width: '16px', height: 'auto' }} />
				</Button>
			</div>
		</div>
	);
}
export default MainFilters;
