import React from 'react';

const useGetColumns = () => {
	const columns = [
		{
			Header   : 'Employee Name',
			accessor : (item) => (
				<div>
					{item?.employee_name}
				</div>
			),
			id: 'employee_name',
		},
		{
			Header   : 'COGO ID',
			accessor : (item) => (
				<div>
					{item?.cogo_id}
				</div>
			),
			id: 'cogo_id',
		},
		{
			Header   : 'Designation',
			accessor : (item) => (
				<div>
					{item?.designation}
				</div>
			),
			id: 'designation',
		},
		{
			Header   : 'Contact No',
			accessor : (item) => (
				<div>
					{item?.contact_no}
				</div>
			),
			id: 'contact_no',
		},
		{
			Header   : 'Email Id',
			accessor : (item) => (
				<div>
					{item?.email_id}
				</div>
			),
			id: 'email_id',
		},
		{
			Header   : 'Chapter',
			accessor : (item) => (
				<div>
					{item?.chapter}
				</div>
			),
			id: 'chapter',
		},
		{
			Header   : 'Location',
			accessor : (item) => (
				<div>
					{item?.location}
				</div>
			),
			id: 'location',
		},
		{
			Header   : 'Reporting Manager',
			accessor : (item) => (
				<div>
					{item?.reporting_manager}
				</div>
			),
			id: 'reporting_manager',
		},
		{
			Header   : 'Status',
			accessor : (item) => (
				<div>
					{item?.status}
				</div>
			),
			id: 'status',
		},
	];

	return columns;
};

export default useGetColumns;
