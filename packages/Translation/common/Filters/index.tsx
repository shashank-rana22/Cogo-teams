import React, { useState } from 'react';

import BulkUploadTranslation from '../../page-components/BulkUpload';
import CreateRoleModal from '../../page-components/CreateForm';
import { getElements } from '../../utils/getElements';
import { FilterProps } from '../interfaces';
import SearchInput from '../SearchInput';

import styles from './styles.module.css';
import { filterControls } from './utils/controls';

interface Props {
	filters: FilterProps;
	status: string;
	onChangeFilters: (v: object) => void;
	refetch: Function;
}

function Filters({
	filters,
	onChangeFilters = (v) => v,
	status,
	refetch,
}: Props) {
	const { search } = filters || {};
	const [show, setShow] = useState(false);

	return (
		<section className={styles.container} id="filters">
			<div className={styles.select_container}>
				{filterControls.map((control) => {
					const Element = getElements(control.type);
					return (
						<Element
							key={control.name}
							className={styles.select}
							value={filters[control.name]}
							onChange={(value) => onChangeFilters({
								...filters,
								[control.name] : value || undefined,
								pageIndex      : 1,
							})}
							{...control}
						/>
					);
				})}
			</div>
			<div className={styles.flex}>
				<SearchInput
					value={search || ''}
					onChange={(value) => onChangeFilters({
						...filters,
						search: value || undefined,
					})}
					size="md"
					placeholder="Search by Original Text "
				/>
				<BulkUploadTranslation show={show} setShow={setShow} refetch={refetch} />
				<CreateRoleModal status={status} refetch={refetch} />
			</div>
		</section>
	);
}

export default Filters;
