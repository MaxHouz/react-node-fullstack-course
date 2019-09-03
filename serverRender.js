import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/App';

import axios from 'axios';
import config from "./config";

const getApiUrl = contestId => {
    return contestId
        ? `${config.serverUrl}/api/contests/${contestId}`
        : `${config.serverUrl}/api/contests`;
};

const getInitialData = (contestId, apiData) => {
    if (contestId) {
        return {
            currentContestId: apiData._id,
            contests: {
                [apiData._id]: apiData
            }
        }
    }
    return {
        contests: apiData.contests
    };
};

const serverRender = (contestId) => {
    return axios.get(getApiUrl(contestId))
        .then(resp => {
            const initialData = getInitialData(contestId, resp.data);

            return {
                initialMarkup: ReactDOMServer.renderToString(<App initialData={initialData} />),
                initialData: initialData
            };
        });
};

export default serverRender;