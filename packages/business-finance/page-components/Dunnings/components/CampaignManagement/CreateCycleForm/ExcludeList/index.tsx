import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import StyledTable from '../../../../../AccountReceivables/commons/styledTable';

import { config } from './config';
import { dummyData } from './dummyData';
import styles from './styles.module.css';

interface Props {
	uncheckedRows?:string[],
	setUncheckedRows?:Function
}

function ExcludeList({ uncheckedRows, setUncheckedRows }:Props) {
	const [search, setSearch] = useState('');

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
				<StyledTable
					data={dummyData.list}
					columns={config({
						uncheckedRows,
						setUncheckedRows,
					})}
				/>

			</div>
		</div>
	);
}

export default ExcludeList;
