import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import css from './App.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getIsLoading } from '../redux/selectors';
import { useEffect } from 'react';
import { fetchAll } from 'services/api';
import { Oval } from 'react-loader-spinner';

export const App = () => {
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <div className={css.main}>
      <h1 style={{ textAlign: 'center' }}>Phonebook</h1>
      <ContactForm />
      <div className="contactsContainer">
        <h2>Contacts</h2>
        {contacts.length > 0 ? (
          <>
            <Filter />
            <ContactList />
          </>
        ) : (
          <p className={css.emptyInfo}>
            Your phonebook is empty. Add first contact!
          </p>
        )}
        {isLoading && (
          <Oval
            height="50"
            width="50"
            color="violet"
            secondaryColor="blue"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        )}
      </div>
    </div>
  );
};