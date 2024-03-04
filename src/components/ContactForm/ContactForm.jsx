import css from './ContactForm.module.css';

import { useDispatch, useSelector } from 'react-redux';

import { getContacts } from '../../redux/selectors';

import { nanoid } from '@reduxjs/toolkit';
import { addContact } from 'services/api';
import { Zoom, toast } from 'react-toastify';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const onSubmitForm = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const { name, number } = form.elements;

    const isInContacts = contacts.some(
      contact => name.value.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      toast.info(`${name.value} is already in contacts`, {
        autoClose: 2000,
        transition: Zoom,
      });
      return;
    }

    dispatch(addContact({ name: name.value, phone: number.value }));

    form.reset();
  };
  return (
    <form action="" onSubmit={onSubmitForm} className={css.formContact}>
      <label className={css.formContactLable} htmlFor={nanoid()}>
        Name
        <input
          type="text"
          name="name"
          className={css.inputFormContact}
          required
        />
      </label>
      <label className={css.formContactLable} htmlFor={nanoid()}>
        Number
        <input
          type="tel"
          name="number"
          className={css.inputFormContact}
          required
        />
      </label>

      <button className={css.addContactBtn} type="submit">
        add contact
      </button>
    </form>
  );
};