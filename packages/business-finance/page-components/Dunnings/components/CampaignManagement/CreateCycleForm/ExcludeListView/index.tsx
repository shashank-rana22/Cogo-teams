import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import {  useState } from 'react';


import styles from './styles.module.css';
import useGetCustomerList from '../../hooks/useGetCustomerList';
import ExcludeList from './ExcludeList';

interface Props {
	uncheckedRows?:string[],
	setUncheckedRows?:Function,
	formData?:object,
}

function ExcludeListView({ uncheckedRows, setUncheckedRows,formData }:Props) {
	const [search, setSearch] = useState();
	const [page, setPage] = useState(1);
    const {customerList, loading} = useGetCustomerList({formData,search,page,setPage});

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
						onChange={(e:any) => setSearch(e)}
						className={styles.search}
					/>
				</div>
			</div>
			<div>

				<ExcludeList
					list={customerList?.list}
					page={page}
					setPage={setPage}
					totalRecords={customerList?.totalRecords}
					uncheckedRows={uncheckedRows}
					setUncheckedRows={setUncheckedRows}
					loading={loading}
				/>

			</div>
		</div>
	);
}

export default ExcludeListView;
