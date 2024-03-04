import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Zoom, toast } from 'react-toastify';

const instanse = axios.create({
  baseURL: 'https://65d4c1303f1ab8c63435ed3e.mockapi.io',
});

const notify = text =>
  (toastId = toast.info(text, {
    autoClose: false,
    transition: Zoom,
  }));
const update = text =>
  toast.update(toastId, {
    render: text,
    type: 'success',
    autoClose: 2000,
    transition: Zoom,
  });

let toastId = null;

export const fetchAll = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await instanse.get('/contacts');
      toast.info(`You have ${data.length} contacts`, { transition: Zoom });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      notify('... Please wait a new contact is added');
      const { data } = await instanse.post('/contacts', newContact);
      update(`Added a new contact: ${data.name}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/delContact',
  async (contactId, thunkAPI) => {
    try {
      notify('Please wait, the contact is being deleted.');
      const { data } = await instanse.delete(`/contacts/${contactId}`);
      update(`Contact ${data.name} has been removed from your phonebook.`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);