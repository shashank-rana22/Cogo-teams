import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetCustomerList from '../../hooks/useGetCustomerList';

import ExcludeList from './ExcludeList';
import styles from './styles.module.css';

interface Props {
	uncheckedRows?: string[];
	setUncheckedRows?: React.Dispatch<React.SetStateAction<string[]>>;
	formData?: object;
	setFormData?: React.Dispatch<React.SetStateAction<object>>;
}

function ExcludeListView({ uncheckedRows, setUncheckedRows, formData, setFormData }:Props) {
	const [search, setSearch] = useState('');
	const { customerList, loading } = useGetCustomerList({ formData, search, setFormData });

	return (
		<div>
			<div className={styles.header}>
				<div>
					<div className={styles.exclude_text}>
						<h4>Exclude Customers You Do Not Want In This Cycle By Unselecting Them.</h4>
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
