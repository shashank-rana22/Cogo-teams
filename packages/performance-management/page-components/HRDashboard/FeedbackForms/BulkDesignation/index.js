import { Checkbox, Button, Input } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetDepartmentMappings from '../../../../hooks/useGetDepartmentMappings';

import styles from './styles.module.css';

function BulkDesignation({
	setOpenBulkDesignation = () => {},
	setBulkDesignations = () => {}, bulkDesignations = [],
	department = '', designation = '',
}) {
	const [checkedDesignations, setCheckedDesignations] = useState(bulkDesignations);

	const { query = '', debounceQuery } = useDebounceQuery();
	const [searchValue, setSearchValue] = useState('');

	const { data = {} } = useGetDepartmentMappings({ department, searchValue: query });
	const { list = [] } = data;

	const newList = (list || []).filter((des) => {
		const { designation: newDes = '' } = des;

		return !checkedDesignations.includes(newDes);
	});

	const cancelBulkDesignation = () => {
		setOpenBulkDesignation(false);
	};

	const createBulkDesignation = () => {
		setBulkDesignations(checkedDesignations);
		setOpenBulkDesignation(false);
	};

	const addToDesignation = (val, role) => {
		if (val) {
			setCheckedDesignations([...checkedDesignations, role]);
		} else {
			setCheckedDesignations((pv) => pv.filter((des) => des !== role));
		}
	};

	const selectAll = (val) => {
		if (val) {
			setCheckedDesignations(list.map((des) => {
				const { designation: newDes = '' } = des;
				return newDes;
			}));
		} else {
			setCheckedDesignations(bulkDesignations);
		}
	};

	useEffect(() => debounceQuery(searchValue), [debounceQuery, searchValue]);

	return (
		<div className={styles.bulk_modal}>
			<div className={styles.filter}>
				<Input
					searchValue={searchValue}
					onChange={setSearchValue}
					placeholder="Search Designation"
				/>
				<Checkbox
					checked={(list || []).length === checkedDesignations.length}
					onChange={(val) => selectAll(val.target.checked)}
					label="Select All"
				/>
			</div>

			{!isEmpty(checkedDesignations) && (
				<div className={styles.designations} style={{ border: '1px solid #bdbdbd', marginTop: '12px' }}>
					{(checkedDesignations).map((des) => {
						if (des === designation) {
							return (
								<div className={styles.designation_card} key={des}>
									<Checkbox
										checked
										disabled
									/>
									<div className={styles.label}>{startCase(des)}</div>
								</div>
							);
						}
						return (
							<div className={styles.designation_card} key={des}>
								<Checkbox
									checked
									disabled={checkedDesignations.length === 1}
									onChange={(val) => addToDesignation(val.target.checked, des)}
								/>
								<div className={styles.label}>{startCase(des)}</div>
							</div>
						);
					})}
				</div>
			)}

			<div className={styles.designations}>
				{(newList || []).map((mapping) => {
					const { designation: newDes = '' } = mapping;

					return (
						<div className={styles.designation_card} key={newDes}>
							<Checkbox
								checked={checkedDesignations.includes(newDes)}
								onChange={(val) => addToDesignation(val.target.checked, newDes)}
							/>
							<div className={styles.label}>{startCase(newDes)}</div>
						</div>
					);
				})}

			</div>

			<div className={styles.button_container}>
				<Button
					themeType="tertiary"
					onClick={() => cancelBulkDesignation()}
					style={{ marginRight: '8px' }}
				>
					Cancel
				</Button>
				<Button themeType="primary" onClick={() => createBulkDesignation()}>Select</Button>
			</div>
		</div>
	);
}

export default BulkDesignation;
