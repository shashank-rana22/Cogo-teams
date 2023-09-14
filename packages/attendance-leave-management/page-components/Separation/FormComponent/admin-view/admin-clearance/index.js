import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMTick, IcCFtick } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';

import DatePicker from './date-picker';
import OpenModal from './modal-div';
import NotesHrbp from './notes-hr';
import Servicelist from './services-list';
import styles from './styles.module.css';
import TermsConditions from './terms-conditions';

const ZEROTH_INDEX = 0;
function AdminClearance({ data = {}, refetch = () => {} }) {
	const [show, setShow] = useState(false);
	const admin_clearance = data?.admin_clearance || {};
	const { sub_process_detail_id } = admin_clearance?.admin_clearance || {};
	const { sub_process_data } = admin_clearance?.admin_clearance || {};
	const { is_complete } = admin_clearance?.admin_clearance || false;

	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
		watch,
		setValue,
	} = useForm();
	const termschecked = watch('termsacceptance');

	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch, setShow });

	const onSubmit = (values) => {
		const notes = [{
			label                  : 'notes for hrbp',
			Value                  : values.notes,
			Is_shared_with_manager : true,

		}];
		const payload = {
			sub_process_data: {
				notes,
				accesscardstatus : values?.accesscardstatus,
				termsacceptance  : values?.termsacceptance,
				specify          : values?.specify,
				parkingcharges   : values?.parkingcharges,
				othercharges     : values?.othercharges,
				name             : values?.name,
				last_working_day : values?.last_working_day,
				idcardstatus     : values?.idcardstatus,
				companyassets    : values?.companyassets,

			},
			sub_process_detail_id,
			process_name: 'admin_clearance',
		};
		updateApplication({
			payload,
		});
	//	refetch();
	};

	useEffect(() => {
		if (is_complete) {
			setValue('last_working_day', new Date(sub_process_data?.last_working_day));
			setValue('accesscardstatus', sub_process_data?.accesscardstatus);
			setValue('companyassets', sub_process_data?.companyassets);
			setValue('idcardstatus', sub_process_data?.idcardstatus);
			setValue('name', sub_process_data?.name);
			setValue('othercharges', sub_process_data?.othercharges);
			setValue('parkingcharges', sub_process_data?.parkingcharges);
			setValue('specify', sub_process_data?.specify);
			setValue('notes', sub_process_data?.notes[ZEROTH_INDEX].Value);
			setValue('termsacceptance', sub_process_data?.termsacceptance);
		}
	}, [setValue, data, sub_process_data, is_complete]);

	return (
		<div className={styles.container}>
			<div className={styles.containermain}>
				<div className={styles.title}>Admin Clareance</div>
				<div className={styles.subtitle}>Collection of company assets</div>

				{is_complete ? (
					<div className={styles.tickdiv}>
						<IcCFtick
							className={styles.tickicon}
						/>
						<span>You have successfully completed your tasks. No further changes are allowed.</span>
					</div>
				) : null}

				<DatePicker control={control} errors={errors} is_complete={is_complete} />
				<Servicelist control={control} errors={errors} is_complete={is_complete} />
				<NotesHrbp control={control} errors={errors} is_complete={is_complete} />
			</div>
			{!is_complete ? (
				<>
					<TermsConditions
						control={control}
						errors={errors}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						termschecked={termschecked}
					/>
					<div className={styles.buttondiv}>
						<Button
							className={styles.adminbutton}
							onClick={() => setShow(!show)}
						>
							Provide Clearance
							<IcMTick
								width={16}
								height={16}
							/>
						</Button>
					</div>
				</>
			) : null}

			<OpenModal
				show={show}
				onClose={() => setShow(false)}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
			/>
		</div>
	);
}

export default AdminClearance;
