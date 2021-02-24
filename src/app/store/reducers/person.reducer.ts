// Manifest Manager classes and components
import { IPerson } from '../../models/interfaces/person.interface';
import { IPersonState } from '../interfaces/person-state.interface';
import { PersonFactory } from '../../models/factories/person.factory';
import * as PersonActions from '../actions/person.actions';
import { ManifestManagerErrorFactory } from '../../models/factories/manifest-manager-error.factory';

const initialState: IPersonState = {
    manifestId: -1,
    persons: PersonFactory.CreatePersonList(),
    editedPerson: PersonFactory.CreateGenericPerson(),
    personError: ManifestManagerErrorFactory.CreateNoError(),
    loadingPersonList: false,
    loadingPerson: false
}

export function personReducer(
    state: IPersonState = initialState,
    action: PersonActions.PersonActions) {
    switch (action.type) {
        case PersonActions.ADD_PERSON_START:
            return {
                ...state,
                personError: ManifestManagerErrorFactory.CreateNoError(),
                loadingPerson: true
            };
        case PersonActions.DELETE_PERSON_START:
            return {
                ...state,
                personError: ManifestManagerErrorFactory.CreateNoError(),
                loadingPersonList: true
            };
        case PersonActions.PERSON_SUCCESS:
            return {
                ...state,
                editedPerson: PersonFactory.CreateGenericPerson(),
                personError: ManifestManagerErrorFactory.CreateNoError(),
                loadingPersonList: false,
                loadingPerson: false
            };
        case PersonActions.PERSON_ERROR:
            return {
                ...state,
                personError: ManifestManagerErrorFactory
                    .CreateManifestManagerError(
                        action.payload.functionType,
                        action.payload.errorMessage
                    ),
                loadingPersonList: false,
                loadingPerson: false
            };
        case PersonActions.ADD_PERSON_SUCCESS:
            return {
                ...state,
                personError: ManifestManagerErrorFactory
                    .CreateManifestManagerError(
                        action.payload.functionType,
                        action.payload.errorMessage,
                        action.payload.addStatus
                    ),
                loadingPersonList: false,
                loadingPerson: false
            };
        case PersonActions.ADD_PERSON_ERROR:
            return {
                ...state,
                personError: ManifestManagerErrorFactory
                    .CreateManifestManagerError(
                        action.payload.functionType,
                        action.payload.errorMessage,
                        action.payload.addStatus
                    ),
                loadingPersonList: false,
                loadingPerson: false
            };
        case PersonActions.START_EDIT:
            const personForUpdateIndex = getPersonIndex(state.persons, action.payload);
            const personForUpdate = { ...state.persons[personForUpdateIndex] };
            return {
                ...state,
                editedPerson: personForUpdate
            };
        case PersonActions.STOP_EDIT:
            return {
                ...state,
                editedPerson: PersonFactory.CreateGenericPerson()
            };
        case PersonActions.GET_MANIFEST_DETAILS:
            return {
                ...state,
                manifestId: action.payload,
                personError: ManifestManagerErrorFactory.CreateNoError(),
                loadingPersonList: true
            }
        case PersonActions.SET_MANIFEST_DETAILS:
            return {
                ...state,
                persons: [...action.payload],
                personError: ManifestManagerErrorFactory.CreateNoError(),
                loadingPersonList: false
            }
        default:
            return state;
    }

    function getPersonIndex(personList: IPerson[], person: IPerson): number {
        for (var i = 0; i < personList.length; i++) {
            if (personList[i].PersonID === person.PersonID) {
                return i;
            }
        }
        return -1;
    }
}
