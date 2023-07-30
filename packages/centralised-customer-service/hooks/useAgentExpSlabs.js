import { useForm, useFieldArray } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import DEFAULT_SLABS from '../configurations/defaultExperienceSlabs';
import { validateSlabs } from '../utils/validateSlabs';

import useCreateAgentExperienceSlabs from './useCreateAgentExperienceSlabs';

const OFFSET = 1;
const MIN_LENGTH = 0;
const MAX_SLAB_INDEX = 3;

const getSlabs = ({ data = {}, id = '', experience = '' }) => {
	if (id || !isEmpty(data.agent_experience_slab_details)) {
		return data.agent_experience_slab_details?.map((item, index) => {
			const { slab_unit, slab_lower_limit, slab_upper_limit } = item;

			return {
				slab_unit,
				slab_lower_limit: index === MAX_SLAB_INDEX ? `${slab_lower_limit}+` : slab_lower_limit || '0',
				slab_upper_limit,
			};
		});
	}
	if (experience === 'custom') return [{ slab_unit: 'month', slab_lower_limit: '0' }];
	return DEFAULT_SLABS;
};

const useAgentExpSlabs = ({
	data = {}, fetchList = () => {},
	showForm = false, setShowForm = () => {}, id,
}) => {
	const agentExpSlabs = data?.agent_experience_slabs || [];

	const { loading: createSlabsLoading, createAgentExperienceSlabs } = useCreateAgentExperienceSlabs({
		fetchList,
		agentExpSlabs,
	});

	const { control, formState: { errors }, handleSubmit, watch, setValue } = useForm({
		defaultValues: {
			experience: (id) ? 'custom' : 'default',
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'agent_experience_slabs',
	});

	const fieldsLength = fields.length || MIN_LENGTH;

	const agentExperienceSlabs = watch('agent_experience_slabs');

	const defaultSlabUnit = agentExperienceSlabs?.[GLOBAL_CONSTANTS.zeroth_index]?.slab_unit;

	const experience = watch('experience');

	const handleAdd = async () => {
		const { slab_upper_limit } = agentExperienceSlabs[agentExperienceSlabs.length - OFFSET];

		let slabUpperLimit = Number(slab_upper_limit);

		if (fields.length === MAX_SLAB_INDEX) {
			slabUpperLimit = `${slabUpperLimit}+`;
		}

		if (validateSlabs({ experienceSlabs: agentExperienceSlabs })) {
			append({ slab_unit: defaultSlabUnit, slab_lower_limit: slabUpperLimit });
		}
	};

	const onSubmit = async (values) => {
		if (!showForm) {
			if (validateSlabs({ experienceSlabs: agentExperienceSlabs })) {
				createAgentExperienceSlabs({
					values,
					setShowForm,
				});
			}
		} else setShowForm(false);
	};

	useEffect(() => {
		setValue('agent_experience_slabs', getSlabs({ data, id, experience }));
		setValue('cogo_entity_id', data.cogo_entity_id);
		setValue('role_id', data.role_id);
	}, [data, experience, id, setValue]);

	useEffect(() => {
		if (id) fetchList();
	}, [fetchList, id]);

	useEffect(() => {
		[...Array(fieldsLength).keys()].forEach((index) => {
			setValue(`agent_experience_slabs.${index}.slab_unit`, defaultSlabUnit);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultSlabUnit, setValue]);

	return {
		handleSubmit,
		errors,
		onSubmit,
		handleAdd,
		remove,
		createSlabsLoading,
		control,
		fields,
		watch,
		experience,
		setValue,
		agentExperienceSlabs,
		defaultSlabUnit,
	};
};

export default useAgentExpSlabs;
