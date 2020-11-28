const UserAuth = (function () {
    const getToken = function () {
        return sessionStorage.getItem('token');
    };
    const setToken = function (tok) {
        sessionStorage.setItem('token', tok);
    };
    return {
        getToken: getToken,
        setToken: setToken
    }
})();

export default UserAuth;