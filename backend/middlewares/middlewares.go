package middlewares

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

func RedirectDashBoard() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Redirect(http.StatusTemporaryRedirect, os.Getenv("FRONT_URL")+"/dashboard")
	}
}

//func NoCheck(next http.HandlerFunc) http.HandlerFunc {
//	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//		next.ServeHTTP(w, r)
//		return
//	})
//}
//
//func IdIsCorrect(next http.HandlerFunc) http.HandlerFunc {
//	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//		vars := mux.Vars(r)
//		idStr := vars["id"]
//		id, err := strconv.ParseInt(idStr, 10, 64)
//		if err != nil || id < 0 {
//			return
//		}
//		next.ServeHTTP(w, r)
//		return
//	})
//}
//
//func SetMiddlewareJSON(next http.HandlerFunc) http.HandlerFunc {
//	return func(w http.ResponseWriter, r *http.Request) {
//		w.Header().Set("Content-Type", "application/json")
//		next(w, r)
//	}
//}
//
//func SetMiddlewareAuthentication(next http.HandlerFunc) http.HandlerFunc {
//	return func(w http.ResponseWriter, r *http.Request) {
//		err := auth.TokenValid(r)
//		if err != nil {
//			responses.ERROR(w, http.StatusUnauthorized, errors.New("unauthorized"))
//			return
//		}
//		next(w, r)
//	}
//}
