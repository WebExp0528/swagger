"use strict";

app.service('APIHandler', function ($rootScope, $http, $q, $base64, Utils, env) {
	
    var baseUrl = $rootScope.app.APIPrefix;
    var nodeUrl = $rootScope.app.NodeApi;
    var isDebug = $rootScope.app.Debug;
    
    if (!(env.apiUrl.indexOf('SERVER_AND_PORT') >= 0)) {
        if (isDebug) {
            console.debug("apiUrl: " + env.apiUrl);
        }
    	baseUrl = env.apiUrl;
    }

    function APIHandler() {
        this.name = "API Handler";
    }

    APIHandler.prototype.Get = function get(url) {
        url = baseUrl + url;

        if (isDebug) console.info("Get: " + url);
        var promise = $http.get(url);
        var deferred = $q.defer();
        promise.then(function (res) {
            if (isDebug) console.log(res.data);
            deferred.resolve(res.data);
        }, function (err) {
            if (isDebug) console.error(err);
            $rootScope.app.Mask = false;
            deferred.reject(err);
        })

        return deferred.promise;
    };

    APIHandler.prototype.Login = function get(url, params) {
        url = baseUrl + url;
        if (isDebug) console.info("POST: " + url);
        if (isDebug) console.info("with body: ", params);

        var promise = $http({
            method: 'POST',
            url: url,
            data: JSON.stringify(params)
          }), deferred = $q.defer();

          promise.then(function (res) {
            if (isDebug) console.log(res);
            deferred.resolve(res);
          }, function (err) {
            if (isDebug) console.error(err);
            deferred.reject(err);
          });

          return deferred.promise;
    }

    APIHandler.prototype.Post = function get(url, params) {
        url = baseUrl + url;
        if (isDebug) console.info("POST: " + url);
        if (isDebug) console.info("with body: ", params);

        var promise = $http.post(url, params), deferred = $q.defer();
        promise.then(function (res) {
            if (isDebug) console.log(res);
            deferred.resolve(res);
        }, function (err) {
            if (isDebug) console.error(err);
            deferred.reject(err);
        });
        return deferred.promise;
    };


    APIHandler.prototype.PostWithFile = function get(url, params) {
        url = baseUrl + url;
        if (isDebug) console.info("POST: " + url);
        if (isDebug) console.info("with body: ", params);

        var promise = $http({
            method: 'POST',
            url: url,
            data: params,
            headers: {
                'Content-Type': undefined
            }
        });
        var deferred = $q.defer();
        promise.then(function (res) {
            if (isDebug) console.log(res);
            deferred.resolve(res);
        }, function (err) {
            if (isDebug) console.error(err);
            deferred.reject(err);
        });
        return deferred.promise;
    };

    APIHandler.prototype.Put = function get(url, params) {
        url = baseUrl + url;
        if (isDebug) console.info("PUT: " + url);
        if (isDebug) console.info("with body: ", params);
        var promise = $http.put(url, params), deferred = $q.defer();
        promise.then(function (res) {
            if (isDebug) console.log(res);
            deferred.resolve(res);
        }, function (error) {
            if (isDebug) console.error("Request failed" + error);
            deferred.reject(error);
        });
        return deferred.promise;
    };

    APIHandler.prototype.Delete = function get(url) {
        url = baseUrl + url;
        console.log(url);
        if (isDebug) console.info("DELETE: " + url);
        var promise = $http.delete(url), deferred = $q.defer();
        promise.then(function (res) {
            if (isDebug) console.log(res);
            deferred.resolve(res);
        }, function (error) {
            if (isDebug) console.error("Request failed" + error);
            deferred.reject(error);
        });
        return deferred.promise;
    };

    APIHandler.prototype.Excel = function get(url, params) {
        var tmpurl = nodeUrl + url;
        if (isDebug) console.info("POST: " + url);
        if (isDebug) console.info("with body: ", params);
        var promise = $http(
            {
                method: 'POST',
                url: tmpurl,
                data: params,
                withCredentials: false
            }
        ), deferred = $q.defer();
        promise.then(function (res) {
            if (isDebug) console.log(res);
            deferred.resolve(res);
        }, function (err) {
            if (isDebug) console.error(err);
            deferred.reject(err);
        });
        return deferred.promise;
    };

    APIHandler.prototype.UploadFile = function (url, formdata) {
        url = baseUrl + url;
        if (isDebug) console.info("UPLOAD: " + url);
        if (isDebug) console.info("with body: ", formdata);

        var deferred = $q.defer();
        $http.post(url, formdata, {
            withCredentials: true,
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        })
            .then(function (res) {
                if (isDebug) console.log(res);
                deferred.resolve(res);
            }, function (err) {
                if (isDebug) console.error(err);
                deferred.reject(err);
            });
        return deferred.promise;
    };

    APIHandler.prototype.UploadFileAndData = function (url, formdata, senddata) {
        url = baseUrl + url;
        if (isDebug) console.info("UPLOAD: " + url);
        if (isDebug) console.info("with body: ", formdata);

        var deferred = $q.defer();
        $http.post(url, formdata, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            transformRequest: angular.identity
        })
            .then(function (res) {
                if (isDebug) console.log(res);
                deferred.resolve(res);
            }, function (err) {
                if (isDebug) console.error(err);
                deferred.reject(err);
            });
        return deferred.promise;
    };

    APIHandler.prototype.NullPromise = function () {
        var deferred = $q.defer();
        deferred.reject({});
        return deferred.promise;
    };

    return new APIHandler();
});
