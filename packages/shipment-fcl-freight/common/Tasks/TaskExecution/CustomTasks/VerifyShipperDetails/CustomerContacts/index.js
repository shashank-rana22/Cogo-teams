import { Button, Table } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import UserOnboard from '../UserOnboard';

import getColumns from './getColums';
import styles from './styles.module.css';

// import useGetLeadOrganizationUsers from '../../../../../../hooks/useGetLeadOrganizationUsers';

const SECOND_STEP = 2;

const DATA = [
	{
		name                : 'test',
		email               : 'test@mail.com',
		mobile_country_code : '+91',
		mobile_number       : '1234567899',
		index               : 1,
	},
	{
		name                : 'test',
		email               : 'test@mail.com',
		mobile_country_code : '+91',
		mobile_number       : '1234567899',
		index               : 2,
	},
	{
		name                : 'test',
		email               : 'test@mail.com',
		mobile_country_code : '+91',
		mobile_number       : '1234567899',
		index               : 3,
	},
	{
		name                : 'test',
		email               : 'test@mail.com',
		mobile_country_code : '+91',
		mobile_number       : '1234567899',
		index               : 4,
	},
];

function CustomerContacts({ setStep = () => {} }) {
	const [isEditMode, setIsEditMode] = useState(null);
	const [checkList, setCheckList] = useState([]);
	const [isLeadUpdated, setIsLeadUpdated] = useState(false);

	console.log({ checkList });

	const { control } = useForm();
	// const PARAMS = {
	// 	filters: {
	// 		id: 'b0fa87a1-a149-4085-a7d8-5e600b4e36a8',
	// 	},
	// 	// lead_organization_id: 'b0fa87a1-a149-4085-a7d8-5e600b4e36a8',
	// };
	const columns = getColumns({ setIsEditMode, isEditMode, control, setCheckList, isLeadUpdated });

	// const { loading = false, uploadedDocs = [] } = useGetLeadOrganizationUsers({ params: PARAMS });
	return (
		<>
			<UserOnboard setIsLeadUpdated={setIsLeadUpdated} />

			<div className={styles.main_container}>
				<h4>Customer contacts</h4>

				<Table
					data={DATA}
					columns={columns}
				/>

				<div className={styles.button_container}>
					<Button disabled={isEmpty(checkList) || isLeadUpdated} onClick={() => { setStep(SECOND_STEP); }}>
						Verify
					</Button>
				</div>
			</div>
		</>
	);
}

export default CustomerContacts;
