const UserAuth = (function () {
    const getToken = function () {
        return sessionStorage.getItem('token');
    };
    const setToken = function (tok) {
        sessionStorage.setItem('token', tok);
    };
    const clear = function () {
        sessionStorage.clear();
    };
    return {
        getToken: getToken,
        setToken: setToken,
        clear: clear
    }
})();

export default UserAuth;