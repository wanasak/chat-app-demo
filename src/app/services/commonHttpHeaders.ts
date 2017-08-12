import { Headers } from '@angular/http';

export function CommonHttpHeaders(userId: number) {
    const headers = new Headers();
    headers.append('USERID', userId.toString());
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return {headers};
}
