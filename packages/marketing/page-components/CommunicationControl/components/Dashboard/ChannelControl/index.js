import { Button, Tooltip, Table, Placeholder } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getPayloadChannelControl from '../../../helpers/getPayloadChannelControl';
import useGetChannelControls from '../../../hooks/useGetChannelControls';
import useUpdateChannelControls from '../../../hooks/useUpdateChannelControls';

import columns from './Columns';
import styles from './styles.module.css';

const PAGE_ONE = 1;

function ChannelControl() {
	const [pagination, setPagination] = useState(PAGE_ONE);

	const { list = [], loading = '', getChannelControls = () => {} } = useGetChannelControls(
		{ pagination, setPagination },
	);

	const { control, watch } = useForm();
	const formValues = watch();

	const cols = columns({ control });

	const {
		updateChannelControl = () => {},
		updateChannelLoading = 'true',
	} = useUpdateChannelControls({ getChannelControls });

	const handleSave = async () => {
		const res = await getPayloadChannelControl(formValues);
		if (isEmpty(res)) {
			return;
		}
		updateChannelControl({ list: res });
	};

	const loadingColumn = [
		{
			Header   : 'LOADING...',
			accessor : (item) => (
				<Placeholder key={item?.id} height="50px" />
			),
		},
	];
	if (loading) {
		return (
			<div className={styles.table_container}>
				<Table
					columns={loadingColumn}
					data={[{}, {}, {}]}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>
					<h4 style={{ marginLeft: 16, marginBottom: 0 }}>
						Avoid spamming of users by setting the maximum number of messages
						a user can recieve per day per week and per month through various channels
					</h4>
					<Tooltip
						placement="top"
						content="These limits will only apply to Promotion related communication"
					>
						<IcMInfo style={{ marginLeft: 5 }} />
					</Tooltip>
				</div>
				<Button
					onClick={() => handleSave(list)}
					disabled={updateChannelLoading}
				>
					SAVE
				</Button>
			</div>
			<div className={styles.table_container}>
				<Table
					columns={cols}
					data={list}
				/>
			</div>
		</div>
	);
}
export default ChannelControl;
