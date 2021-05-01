// Angular libraries
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Other libraries
import { Observable, } from 'rxjs';
import { take, map } from 'rxjs/operators';

// Manifest Manager classes and components
import { IAppState } from '../store/interfaces/app-state.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {

    constructor(
        private _router: Router,
        private _store: Store<IAppState>
    ) {}

    canLoad(_route: Route, _segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean{

        return this._store.select('authState').pipe(
            take(1),
            map(authState => {
                if (authState.user) {
                    return true;
                } else {
                    this._router.navigateByUrl('/auth');
                }
            })
        )
    }
}
