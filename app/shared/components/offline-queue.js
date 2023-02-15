import React, {useEffect} from 'react';
import axios from 'axios';

import {useRequestsDispatch, useRequestsState} from '../config/offline';
import {API_URL} from '../config/api';

function OfflineQueue() {
  const {Requests, persisted} = useRequestsState();
  const dispatch = useRequestsDispatch();

  useEffect(() => {
    if (Requests && persisted) {
      Requests.forEach((req) => {
        if (req.request) {
          axios
            .post(`${API_URL + req.request}`, req.data, req.config)
            .then((response) =>
              response.data.Success
                ? dispatch({
                    type: 'remove-request',
                    state: req,
                  })
                : console.log('Error', response.data),
            )
            .catch((error) => console.error(error));
        }
      });
    }
  }, [persisted]);
  return <></>;
}

export default OfflineQueue;
