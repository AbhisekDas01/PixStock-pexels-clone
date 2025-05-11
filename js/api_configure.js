"use strict";

/**
 * Import
 */
import { urlEncode } from "./utils/urlEncode.js"; 

// API key for authorization
const apiKey = '<api-key>';

// Setting up headers with the API key
const headers = new Headers(); 

headers.append("Authorization" , apiKey);

// Request options including headers
const requestOptions = {headers};

/**
 * Fetch data from Pexels website
 * @param {string} url API endpoint URL
 * @param {Function} callBack Callback function to handle the response data
 */
const fetchData = async function (url , callBack) {
    const response = await fetch(url , requestOptions);

    if(response.ok){
        const data = await response.json();
        callBack(data);
    }
}

// Initialize request URL
let requestUrl = "";

// Root URLs for different API endpoints
const root = {
    default: "https://api.pexels.com/v1/",
    videos: "https://api.pexels.com/videos/",
    collections: "https://api.pexels.com/v1/collections/"
}

// Object containing API client functions
export const client = {
    photos: {
        /**
         * Search photos
         * @param {object} parameters URL parameters object
         * @param {Function} callback Callback function to handle the response data
         */
        search(parameters , callback){
            requestUrl = `${root.default}search?${urlEncode(parameters)}`;
            fetchData(requestUrl , callback);
        },

        /**
         * Get curated photos
         * @param {object} parameters URL parameters object
         * @param {Function} callBack Callback function to handle the response data
         */
        curated(parameters , callBack){
            fetchData(`${root.default}curated?${urlEncode(parameters)}` , callBack);
        },

        /**
         * Get details of a single photo
         * @param {string} id Photo ID
         * @param {Function} callback Callback function to handle the response data
         */
        detail(id , callback){
            fetchData(`${root.default}photos/${id}` , callback);
        }
    },

    videos: {
        /**
         * Search videos
         * @param {object} parameters URL parameters object
         * @param {Function} callback Callback function to handle the response data
         */
        search(parameters , callback){
            requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
            fetchData(requestUrl , callback);
        },

        /**
         * Get popular videos
         * @param {object} parameters URL parameters object
         * @param {Function} callBack Callback function to handle the response data
         */
        popular(parameters , callBack){
            fetchData(`${root.videos}popular?${urlEncode(parameters)}` , callBack);
        },

        /**
         * Get details of a single video
         * @param {string} id Video ID
         * @param {Function} callback Callback function to handle the response data
         */
        detail(id , callback){
            fetchData(`${root.videos}videos/${id}` , callback);
        }
    },

    collections: {
        /**
         * Get featured photos
         * @param {object} parameters URL parameters object
         * @param {Function} callBack Callback function to handle the response data
         */
        featured(parameters , callBack){
            requestUrl = `${root.default}collections/featured?${urlEncode(parameters)}`;
            fetchData(requestUrl , callBack);
        },

        /**
         * Get media of a collection
         * @param {string} id Collection ID
         * @param {object} parameters URL parameters object
         * @param {Function} callback Callback function to handle the response data
         */        detail(id , parameters ,  callback){
            requestUrl = `${root.collections}${id}/media?${urlEncode(parameters)}`;
            fetchData(requestUrl , callback);
        }
    }
}

