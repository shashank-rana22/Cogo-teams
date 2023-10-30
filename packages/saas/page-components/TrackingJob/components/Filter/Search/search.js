import { useForm } from '@cogoport/forms';
import { useEffect, useMemo } from 'react';

import Layout from '../../../../../common/Layout';
import getShowElements from '../showElement';

import getFilterControls from './search-controls';
import styles from './styles.module.css';

function SearchFilters({
	activeTab = '',
	setSearchString = () => {},
	setSerialId = () => {}, searchString = '', serialId = '',
}) {
	const controls = useMemo(() => getFilterControls({ setSearchString }), [setSearchString]);

	const { control, watch } = useForm({
		defaultValues: {
			airway_bill_no    : searchString,
			container_bill_no : searchString,
			truck_no          : searchString,
			serial_id         : serialId,
		},
	});

	const { serial_id, airway_bill_no, container_bill_no, truck_no } = watch();

	const q = useMemo(
		() => (
			airway_bill_no || container_bill_no || truck_no),
		[airway_bill_no, container_bill_no, truck_no],
	);

	useEffect(() => {
		setSerialId(serial_id);
	}, [serial_id, setSerialId]);

	useEffect(() => {
		setSearchString(q);
	}, [q, setSearchString]);

	const showElements = useMemo(() => getShowElements({ activeTab, controls }), [controls, activeTab]);

	return (
		<div className={styles.container_class}>
			<Layout controls={controls} control={control} showElements={showElements} />
		</div>
	);
}

export default SearchFilters;
