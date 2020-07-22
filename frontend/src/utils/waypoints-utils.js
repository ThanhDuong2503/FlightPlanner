import { getJWTToken } from './jwt-utils';

export async function fetchAllWaypoints() {
    const token = getJWTToken();
    const response = await fetch('/api/waypoints', {
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

export function putWaypoint(description) {
    const token = getJWTToken();
    return fetch('/api/waypoints', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description: description }),
    }).then((response) => {
        if (response.status !== 200) {
            throw new Error('invalid response');
        }
        return response.json();
    });
}

export function deleteWaypoint(id) {
    const token = getJWTToken();
    return fetch(`/api/waypoints/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function fetchWaypoint(id) {
    const token = getJWTToken();
    const response = await fetch(`/api/waypoints/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error('error fetching data');
    }
    return await response.json();
}