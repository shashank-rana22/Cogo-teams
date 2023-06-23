import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetCustomerList from '../../hooks/useGetCustomerList';

import ExcludeList from './ExcludeList';
import styles from './styles.module.css';

interface Props {
	uncheckedRows?: string[];
	setUncheckedRows?: Function;
	formData?: object;
	setFormData?: Function;
}

function ExcludeListView({ uncheckedRows, setUncheckedRows, formData, setFormData }:Props) {
	const [search, setSearch] = useState('');
	const { customerList, loading } = useGetCustomerList({ formData, search, setFormData });

	return (
		<div>
			<div className={styles.header}>
				<div>
					<div
						style={{ margin: '8px 0px 0px 24px' }}
					>
						Exclude Customers You Do Not Want In This Cycle By Unselecting Them.
					</div>

				</div>
				<div>
					<Input
						size="sm"
						placeholder="Search By Customer Name"
						suffix={<IcMSearchlight />}
						value={search}
						onChange={(e:string) => setSearch(e)}
						className={styles.search}
					/>
				</div>
			</div>
			<div>

				<ExcludeList
					data={customerList}
					uncheckedRows={uncheckedRows}
					setUncheckedRows={setUncheckedRows}
					loading={loading}
					setFilters={setFormData}
				/>

			</div>
		</div>
	);
}

export default ExcludeListView;
