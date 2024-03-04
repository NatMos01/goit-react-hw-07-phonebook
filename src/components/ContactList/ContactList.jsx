import { useDispatch, useSelector } from 'react-redux';

import css from './ContactList.module.css';
import { getFilter, selectVisibleContacts } from '../../redux/selectors';
import { deleteContact } from 'services/api';

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectVisibleContacts);
  const filter = useSelector(getFilter);

  const filterContacts = () => {
    const normalizeFilter = filter.trim().toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const filterForContacts = filterContacts();

  return (
    <>
      <ul className={css.contactList}>
        {filterForContacts.map(item => {
          return (
            <li key={item.id} className={css.contactListItem}>
              <p className={css.contactName}>
                {item.name}:{' '}
                <span className={css.contactNumber}>{item.phone}</span>
              </p>
              <button
                type="button"
                name="delete"
                className={css.contactDeleteBtn}
                onClick={() => dispatch(deleteContact(item.id))}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};