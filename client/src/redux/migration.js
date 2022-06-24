const migrations = {
	0: (state) => {
		return state
	},
	1: (state) => {
		state = {
			...state,
			general: {
				...state.general,
				location: { base: {}, current: {} },
			},
		}
		return state
	},
}

export { migrations }
