import { useForm } from '@cogoport/forms';
import React, { useState, useEffect, useMemo } from 'react';

import useCreateDeclarations from './api/useCreateDeclarations';
import useGetCalculatedTax from './api/useGetCalculatedTax';
import useGetSalaryDetails from './api/useGetSalaryDetails';
import useUpdateSalaryDetails from './api/useUpdateSalaryDetails';
import CalculatedTax from './calculated-tax';
import TaxDeclarations from './declarations';
import styles from './styles.module.css';
import TableCustom from './Table';
import TaxInput from './tax-input';

const columns = [
	{ Header: 'Compensation Type', accessor: 'heading' },
	{ Header: 'Year', accessor: 'yearlyValue' },
	{ Header: 'Month', accessor: 'monthlyValue' },

];
export function TaxCalculator() {
	const [taxShow, setTaxShow] = useState([]);
	const { handleSubmit, control, formState: { errors } } = useForm({
		defaultValues: {
			EightyC : 0,
			hra     : 0,
		},
	});
	const { getEmployeeSalaryDetails, getdata } = useGetSalaryDetails();
	const { getCalculatedTax, getTax } = useGetCalculatedTax();
	const { postEmployeeSalaryDetails } = useUpdateSalaryDetails({
		refetch: getEmployeeSalaryDetails,
		getCalculatedTax,
	});
	const { createDeclarations } = useCreateDeclarations({
		refetch: getEmployeeSalaryDetails,
		getCalculatedTax,
	});

	const onSubmit = async (data2) => {
		await postEmployeeSalaryDetails(data2);
		await	createDeclarations(data2);
		setTaxShow(getTax);
	};
	useEffect(() => {
		setTaxShow(getTax);
	}, [getTax]);
	const tableData = useMemo(() => Object.keys(getdata || {}).map((elem) => {
		const { heading, yearlyValue, monthlyValue, is_group } = getdata[elem];
		return (
			{
				heading,
				yearlyValue,
				monthlyValue,
				is_group,
			}
		);
	}), [getdata]);
	return (
		<div className={styles.container}>
			<div className={styles.heading}>TaxCalculator</div>

			<TaxInput control={control} errors={errors} />
			<TaxDeclarations
				createDeclarations={createDeclarations}
				handleSubmit={handleSubmit}
				errors={errors}
				control={control}
				onSubmit={onSubmit}
			/>
			<div className={styles.table_container}>
				<div className={styles.heading}>Compensation BreakDown</div>
				<TableCustom columns={columns} data={tableData} />
			</div>
			<div className={styles.table_container}>
				<div className={styles.heading}>Calculated Tax</div>
				<CalculatedTax getTax={taxShow} />
			</div>
		</div>
	);
}

export default TaxCalculator;
