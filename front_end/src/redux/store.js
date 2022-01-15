import { createStore, combineReducers } from 'redux'
import GeneralReducer from './reducer/generalreducer'

import { persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { migrations } from './migration'

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	migrate: createMigrate(migrations, { debug: false }),
}

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({ general: GeneralReducer })
)
let store = createStore(persistedReducer, {})

store.subscribe(() => {
	console.log(store.getState())
})

export default store
