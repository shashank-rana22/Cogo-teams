import { Button } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import React, { useState } from 'react';

import { Refetch } from '../../../commons/Interfaces';
import useSaveVerifiedOrganization from '../../../hooks/useSaveVerifiedOrganization';

import styles from './styles.module.css';

interface OrgData {
	serial_id: number;
	legal_business_name: string;
	id: string;
}

interface RefetchInterface {
	refetch: Refetch;
}

function SearchCard({ refetch } : RefetchInterface) {
	const [orgData, setOrgData] = useState<OrgData>();
	const { createBpr, loadingOnSave } = useSaveVerifiedOrganization({ setOrgData, refetch });

	return (
		<div>
			<div className={styles.card}>
				<div className={styles.heading}>Manage BPR</div>

				<div className={styles.SearchContainer}>
					<div className={styles.SearchBySerialId}>
						<AsyncSelect
							name="id"
							asyncKey="list_trade_parties"
							valueKey="id"
							initialCall={false}
							onChange={(value, obj) => {
								setOrgData(obj);
							}}
							value={orgData?.id}
							placeholder="Search by serial id / business name"
							size="sm"
							isClearable
						/>
					</div>
				</div>

				{orgData && (
					<div className={styles.details_card}>
						<div className={styles.sub_container}>
							<div className={styles.id_container}>
								<div className={styles.label_text}>Serial Id</div>
								<div className={styles.value_text}>{orgData?.serial_id || 'N/A'}</div>
							</div>
							<div className={styles.name_container}>
								<div className={styles.label_text}>Bussiness Name</div>
								<div className={styles.value_text}>{orgData?.legal_business_name || 'N/A'}</div>
							</div>

							<Button
								disabled={loadingOnSave}
								size="md"
								onClick={() => createBpr(
									orgData?.serial_id,
									orgData?.legal_business_name,
									orgData?.id,
								)}
							>
								SAVE BPR
							</Button>
						</div>
					</div>
				)}
			</div>

		</div>
	);
}

export default SearchCard;
