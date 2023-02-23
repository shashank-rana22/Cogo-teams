import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';

import styles from './styles.module.css';

const data = [{
	id                  : 1,
	organization_name   : 'Devbug',
	registration_number : '59-570-3500',
	request_date        : '20-12-2022',
	address             : '1HFEWz33727gmxTKbXHxP2FwjRVL5sN6Lp',
	action              : '217.169.156.9',
}, {
	id                  : 2,
	organization_name   : 'Divape',
	registration_number : '50-895-5490',
	request_date        : '29-12-2022',
	address             : '1MLk3ntVb9mH43brrNzG5XzB55zgX4hSgQ',
	action              : '41.167.237.92',
}, {
	id                  : 3,
	organization_name   : 'Topiczoom',
	registration_number : '25-338-9613',
	request_date        : '03-10-2022',
	address             : '1HczbxaxTohi2KgTiJC8Y4ZFexRjR7nkWC',
	action              : '69.26.210.78',
}, {
	id                  : 4,
	organization_name   : 'Quimm',
	registration_number : '54-889-3357',
	request_date        : '09-06-2022',
	address             : '14Q3KDtN5ZiVcB8Ui2LMbcTqEbx88qgeVW',
	action              : '251.45.47.49',
}, {
	id                  : 5,
	organization_name   : 'Twitterbridge',
	registration_number : '52-480-1354',
	request_date        : '08-12-2022',
	address             : '16xVxSfTQTQr3V4mWgjtiaJjsKcnumcvJC',
	action              : '90.254.138.87',
}, {
	id                  : 6,
	organization_name   : 'Ozu',
	registration_number : '23-519-3230',
	request_date        : '22-10-2022',
	address             : '12n9woVnRrvErUSjJYfs6kkxqbpLETe4Ac',
	action              : '129.206.167.17',
}, {
	id                  : 7,
	organization_name   : 'Eamia',
	registration_number : '64-870-7686',
	request_date        : '17-12-2022',
	address             : '1M1s7APH9WKEoex7s7kP9UgjpYRo3PX2SU',
	action              : '209.153.30.110',
}, {
	id                  : 8,
	organization_name   : 'Innotype',
	registration_number : '50-179-1014',
	request_date        : '16-09-2022',
	address             : '18f4MPXZ8zQYot96F4CboRAtqwkFikTY5J',
	action              : '97.94.34.183',
}, {
	id                  : 9,
	organization_name   : 'Einti',
	registration_number : '28-783-8117',
	request_date        : '05-01-2023',
	address             : '1ANxU5rz9cWfHU95vs2gfPgBrTcNQPvxxw',
	action              : '232.30.102.222',
}, {
	id                  : 10,
	organization_name   : 'Roomm',
	registration_number : '23-874-1349',
	request_date        : '13-10-2022',
	address             : '18vUocgBuQafNfsNxtikXSeeAYwLz9qB6d',
	action              : '170.254.0.140',
}];

function EnrichmentTable({ columns }) {
	// const data = [{}];

	if (isEmpty(data)) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={280}
					width={440}
					emptyText="No records found"
					textSize="24px"
					flexDirection="column"
				/>
			</div>
		);
	}

	return (

		<div className={styles.table_container}>
			<Table
				className={styles.table}
				columns={columns}
				data={data}
				// loading={loading}
			/>
		</div>

	);
}

export default EnrichmentTable;
