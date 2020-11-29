package controllers

import "strings"

func filter(arr []string, cond func(string) bool) []string {
	result := []string{}
	for i := range arr {
		if cond(arr[i]) {
			result = append(result, arr[i])
		}
	}
	return result
}

func queriesToFields(queries []string) string {
	if len(queries) == 0 {
		return ""
	}
	return strings.Join(
		filter(queries, func(val string) bool { return val != "" }),
		",",
	)
}
