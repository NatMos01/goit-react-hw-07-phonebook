import { useDispatch } from 'react-redux';

import { setFilter } from '../../redux/filterSlice';

import css from './Filter.module.css';

import { nanoid } from 'nanoid';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <label htmlFor={nanoid()} className={css.filterLabel}>
      Find contacts by name
      <input
        className={css.filterInput}
        type="text"
        placeholder="find contact"
        onChange={e => {
          dispatch(setFilter(e.target.value));
        }}
      />
    </label>
  );
};