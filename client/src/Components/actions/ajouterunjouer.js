import { AJOUT, DELETE } from '../../constants/actionTypes';
import * as api from '../../api/index';
import { useHistory } from 'react-router-dom';
import { RContext } from '../../../src/RContext'


export const ajout = (formData, router) => async (dispatch) => {

  try {
    const { data } = await api.Ajout(formData);

    dispatch({ type: AJOUT, data });
    if (data.success == false) {
      window.alert('player with that UniqueNumber  already exist')
    } else if (data.success == true) {
      window.alert('success')
    }



  } catch (error) {
    console.log(error);
  }
};

export const deleteJouer = (_id) => async (dispatch) => {

  try {
    console.log(_id)
    await api.Delete(_id);



  } catch (error) {
    console.log(error);
  }
};


export const deleteChampionship = (_id) => async (dispatch) => {

  try {
    console.log(_id)
    await api.DeleteChampionship(_id);

  } catch (error) {
    console.log(error);
  }
};

export const deleteLeague = (_id) => async (dispatch) => {

  try {
    console.log(_id)
    await api.DeleteLeague(_id);

  } catch (error) {
    console.log(error);
  }
};

export const deleteDesignation = (_id) => async (dispatch) => {

  try {
    console.log(_id)
    await api.DeleteDesignation(_id);

  } catch (error) {
    console.log(error);
  }
};

export const deleteTeam = (_id) => async (dispatch) => {

  try {
    console.log(_id)
    await api.Deleteteam(_id);



  } catch (error) {
    console.log(error);
  }
};


