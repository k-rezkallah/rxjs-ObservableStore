import './style.css';
import { ObservableStore } from './store';

const store = new ObservableStore({
  user: 'Brian',
  isAuth: false,
});

store.selectState('user').subscribe(console.log);

store.updateState({
  user: 'mike',
});

store.updateState({
  isAuth: true,
});
