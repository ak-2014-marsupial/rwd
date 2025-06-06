import React, {useEffect, useRef} from 'react';
import {useNavigate, useLocation, Outlet} from 'react-router-dom';
import {appConstants} from "../../shared";

function AppLoader() {
    const navigate = useNavigate();
    const location = useLocation();
    const LAST_PATH_KEY = appConstants.localStorageKeyLastPath;
    const INDEX_PATH = appConstants.indexRouterDomPath;
    const firstRenderRef = useRef(true)
    useEffect(() => {
        const lastPath = localStorage.getItem(LAST_PATH_KEY);
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            if (lastPath && lastPath !== location.pathname) {
                if (location.pathname === '/' && lastPath === INDEX_PATH) {

                } else if (location.pathname !== lastPath) {
                    navigate(lastPath, {replace: true});
                    return;
                }
            }

            if (location.pathname === '/') {
                navigate(INDEX_PATH, {replace: true});
                return;
            }
        }

        localStorage.setItem(LAST_PATH_KEY, location.pathname);

    }, [location.pathname, navigate, INDEX_PATH, LAST_PATH_KEY]);

    return <Outlet/>;
}

export {AppLoader};