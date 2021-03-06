import { getJWTToken } from './jwt-utils';

// get all waypoints
export async function fetchAllWaypoints() {
    const token = getJWTToken();
    const response = await fetch('/api/map', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

// delete all waypoints
export function deleteAllWaypoints() {
    const token = getJWTToken();
    return fetch('/api/map', {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

// add a single waypoint
export function putWaypoint(latitude, longitude, placeId) {
    const token = getJWTToken();
    return fetch('/api/map', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ latitude, longitude, placeId }),
    }).then((response) => {
        if (response.status !== 200) {
            throw new Error("failed to fetch data");
        }
        return response.json();
    });
}

// add description to a waypoint
export function fetchDescription(description, id) {
    const token = getJWTToken();
    return fetch(`/api/map/${id}/description`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
    }).then((response) => {
        if (response.status !== 200) {
            throw new Error("failed to fetch data");
        }
        return response.json();
    });
}

// delete a single waypoint
export function deleteWaypoint(id) {
    const token = getJWTToken();
    return fetch(`/api/map/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

// get a single waypoint
export async function fetchWaypoint(id) {
    const token = getJWTToken();
    const response = await fetch(`/api/map/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error('failed to fetch data');
    }
    return await response.json();
}