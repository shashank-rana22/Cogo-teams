import { Table } from '@cogoport/components';

import useGetTopTenReferralStats from '../../../../hooks/useGetTopTenReferralStats';
import TableColumns from '../List/TableColumn';

import styles from './styles.module.css';

function UserList() {
	const data = [
		{
			user_name        : 'hello',
			level            : 12,
			user_count       : 13,
			total_cogopoints : {
				direct   : 200,
				indirect : 100,
			},
			expected_cogopoints: {
				direct   : 700,
				indirect : 300,
			},
		},
		{
			user_name        : 'hello',
			level            : 12,
			user_count       : 13,
			total_cogopoints : {
				direct   : 200,
				indirect : 100,
			},
			expected_cogopoints: {
				direct   : 700,
				indirect : 300,
			},
		},
		{
			user_name        : 'hello',
			level            : 12,
			user_count       : 13,
			total_cogopoints : {
				direct   : 200,
				indirect : 100,
			},
			expected_cogopoints: {
				direct   : 700,
				indirect : 300,
			},
		},
		{
			user_name        : 'hello',
			level            : 12,
			user_count       : 13,
			total_cogopoints : {
				direct   : 200,
				indirect : 100,
			},
			expected_cogopoints: {
				direct   : 700,
				indirect : 300,
			},
		},
		{
			user_name        : 'hello',
			level            : 12,
			user_count       : 13,
			total_cogopoints : {
				direct   : 200,
				indirect : 100,
			},
			expected_cogopoints: {
				direct   : 700,
				indirect : 300,
			},
		},
		{
			user_name        : 'hello',
			level            : 12,
			user_count       : 13,
			total_cogopoints : {
				direct   : 200,
				indirect : 100,
			},
			expected_cogopoints: {
				direct   : 700,
				indirect : 300,
			},
		},
		{
			user_name        : 'hello',
			level            : 12,
			user_count       : 13,
			total_cogopoints : {
				direct   : 200,
				indirect : 100,
			},
			expected_cogopoints: {
				direct   : 700,
				indirect : 300,
			},
		},
		{
			user_name        : 'hello',
			level            : 12,
			user_count       : 13,
			total_cogopoints : {
				direct   : 200,
				indirect : 100,
			},
			expected_cogopoints: {
				direct   : 700,
				indirect : 300,
			},
		},
		{
			user_name        : 'hello',
			level            : 12,
			user_count       : 13,
			total_cogopoints : {
				direct   : 200,
				indirect : 100,
			},
			expected_cogopoints: {
				direct   : 700,
				indirect : 300,
			},
		},
		{
			user_name        : 'hello',
			level            : 12,
			user_count       : 13,
			total_cogopoints : {
				direct   : 200,
				indirect : 100,
			},
			expected_cogopoints: {
				direct   : 700,
				indirect : 300,
			},
		},
	];

	const { data: userData = [], loading = false } = useGetTopTenReferralStats();
	console.log('userData:', userData);
	return (
		<div className={styles.container}>
			<div className={styles.title}>Top 10 Users</div>
			<Table
				columns={TableColumns({ listType: 'users' })}
				data={data || []}
				loadingRowsCount={10}
				loading={loading}
			/>
		</div>
	);
}
export default UserList;
