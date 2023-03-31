import { Button, Input, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useList from '../../hooks/useList';

import styles from './styles.module.css';
import UploadModal from './UploadModal';
import { optionMonth } from './utils';

function SourceFile() {
	const [filters, setFilters] = useState({ month: '', entity: '', query: '' });
	const [uploadModal, setUploadModal] = useState(false);

	const { ListData, refetch } = useList({ filters });

	useEffect(() => { refetch(); }, [refetch]);

	const getCardData = (ListData || [{}]).map((item) => {
		const { uploadNumber, period, createdAt, cogoEntityId, uploadedByName } = item || {};
		const formatMonth = format(period, 'MMM yyyy');
		const formatDate = format(createdAt, 'dd MMM yyyy');
		const entityMapping = {
			'6fd98605-9d5d-479d-9fac-cf905d292b88' : 101,
			'c7e1390d-ec41-477f-964b-55423ee84700' : 201,
			'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1' : 301,
			'04bd1037-c110-4aad-8ecc-fc43e9d4069d' : 401,
			'b67d40b1-616c-4471-b77b-de52b4c9f2ff' : 501,
		};
		return ({
			id     : `#Upload_${uploadNumber}` || '-',
			month  : `Upload Month - ${formatMonth}` || '-',
			name   : `Uploaded By - ${uploadedByName}` || '-',
			entity : entityMapping[cogoEntityId] || '-',
			date   : formatDate || '-',
			button : 'View',
		});
	});

	return (
		<div className={styles.container}>
			<div className={styles.filter_flex}>
				<div className={styles.flex}>
					<div className={styles.select_container}>
						<Select
							value={filters?.month}
							onChange={(val:string) => { setFilters((prev) => ({ ...prev, month: val })); }}
							placeholder="Month"
							options={optionMonth}
							isClearable
							style={{ width: '150px' }}
						/>
					</div>

					<div className={styles.select_container}>
						<Select
							value={filters?.entity}
							onChange={(val:string) => { setFilters((prev) => ({ ...prev, entity: val })); }}
							placeholder="Entity"
							options={[{ label: 'All', value: 'all' },
								{ label: 'Entity 101', value: '101' },
								{ label: 'Entity 301', value: '301' }]}
							isClearable
							style={{ width: '150px' }}
						/>
					</div>

				</div>

				<div>
					<div className={styles.flex}>
						<div className={styles.input_container}>
							<Input
								value={filters?.query}
								onChange={(val:string) => { setFilters((prev) => ({ ...prev, query: val })); }}
								placeholder="Search"
								suffix={<IcMSearchlight height="20px" width="20px" style={{ marginRight: '8px' }} />}
							/>
						</div>

						<div>
							<Button onClick={() => { setUploadModal(true); }}>
								Upload
							</Button>

						</div>
					</div>
				</div>
				{uploadModal && <UploadModal uploadModal={uploadModal} setUploadModal={setUploadModal} />}
			</div>

			<div className={styles.card_container}>
				{getCardData.map((item) => (
					<div className={styles.card}>
						<div>{item.id}</div>

						<div>{item.month}</div>

						<div className={styles.name_data}>
							<div>{item.name}</div>
							<div className={styles.date_data}>{item.date}</div>
						</div>

						<div className={styles.basis}>
							Entity :

							<div className={styles.tag}>

								{item.entity}
							</div>

						</div>

						<div><Button themeType="secondary">{item.button}</Button></div>
					</div>
				))}

			</div>
		</div>
	);
}
export default SourceFile;
