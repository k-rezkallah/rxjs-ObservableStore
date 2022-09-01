import {
  BehaviorSubject,
  distinctUntilKeyChanged,
  pluck,
  scan,
  Subject,
} from 'rxjs';
export class ObservableStore {
  _store;
  _stateUpdates;
  constructor(initialState) {
    this._store = new BehaviorSubject(initialState);
    this._stateUpdates = new Subject();
    //accumulate state
    this._stateUpdates
      .pipe(
        scan((acc: any, curr: any) => {
          return { ...acc, ...curr };
        }, initialState)
      )
      .subscribe(this._store); //emit the updated data to the store stream
  }

  updateState(stateUpdate) {
    this._stateUpdates.next(stateUpdate);
  }

  selectState(stateKey: string) {
    return this._store.pipe(distinctUntilKeyChanged(stateKey), pluck(stateKey));
  }
  stateChanges() {
    return this._store.asObservale();
  }
}
