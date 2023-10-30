import { Button, Tooltip, Table } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import getPayloadChannelControl from '../../../helpers/getPayloadChannelControl';
import useGetChannelControls from '../../../hooks/useGetChannelControls';
import useUpdateChannelControls from '../../../hooks/useUpdateChannelControls';

import getColumns from './Columns';
import styles from './styles.module.css';

function ChannelControl() {
	const {
		list = [], loading = '', getChannelControls = () => {},
	} = useGetChannelControls();

	const { control, handleSubmit } = useForm();

	const {
		updateChannelControl = () => {},
		updateChannelLoading = 'true',
	} = useUpdateChannelControls({ getChannelControls });

	const handleSave = (values) => {
		const res = getPayloadChannelControl(values);

		if (!isEmpty(res)) 	updateChannelControl({ list: res });
	};

	const cols = useMemo(() => getColumns({ control }), [control]);

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
					onClick={handleSubmit(handleSave)}
					disabled={updateChannelLoading}
					className={styles.btn}
				>
					SAVE
				</Button>
			</div>
			<div className={styles.table_container}>
				<Table
					columns={cols}
					data={list}
					loading={loading}
				/>
			</div>
		</div>
	);
}
export default ChannelControl;
