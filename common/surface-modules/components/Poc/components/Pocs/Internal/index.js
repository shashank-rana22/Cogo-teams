import { Button, Loader } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import getInternalPocData from '../../../helpers/getInternalPocData';

import Stakeholders from './Stakeholders';
import styles from './styles.module.css';

function Internal({ data = [], setAddPoc = () => { }, loading = false, rolesPermission = {} }) {
	const internalData = getInternalPocData(data) || {};
	const canAddPoc = !!rolesPermission?.add_internal_poc;

	const keysLength = Object.keys(internalData)?.length;
	const keys = useMemo(
		() => Array(keysLength).fill(null).map(() => Math.random()),
		[keysLength],
	);

	return (
		<div>
			{loading ? <Loader /> : (
				<>
					<div className={styles.header}>
						<div className={styles.heading}>Internal : Cogoport</div>
						{canAddPoc ? (
							<Button
								size="sm"
								onClick={() => {
									setAddPoc({ poc_type: 'internal' });
								}}
								themeType="accent"
							>
								+ ADD POC
							</Button>
						) : null}
					</div>

					<div>
						{Object.keys(internalData).map((key, index) => (
							<div className={styles.service_container} key={keys[index]}>
								<div className={styles.service_name}>{startCase(key)}</div>
								<div>
									<Stakeholders
										data={internalData[key]}
										setAddPoc={setAddPoc}
										rolesPermission={rolesPermission}
									/>

								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default Internal;
