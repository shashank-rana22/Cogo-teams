import { Table } from '@cogoport/components';

import AnalyticsFilter from '../../../common/AnalyticsFilter';
import TableColumns from '../List/TableColumn';

import styles from './styles.module.css';

function NetworkList() {
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

	return (
		<div className={styles.container}>
			<div className={styles.title}>Top 10 Networks</div>
			<AnalyticsFilter />
			<Table columns={TableColumns({ listType: 'network' })} data={data || []} loadingRowsCount={10} />
		</div>
	);
}
export default NetworkList;
